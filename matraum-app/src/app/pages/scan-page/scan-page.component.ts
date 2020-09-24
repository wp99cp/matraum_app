import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {StockService} from '../../stock.service';
import {WebcamService} from '../../webcam.service';
import {MatDialogRef} from '@angular/material/dialog';

declare var Module: any;



@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.sass']
})
export class ScanPageComponent implements OnDestroy {

  public logs: string;
  title = 'matraum-app';
  public counter = 1;
  public name = '';
  public description = '';
  public showOverview = false;
  public maxCounter = 1;
  private id = 0;
  private timer;
  private updates;

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private db: AngularFirestore,
    private stockService: StockService,
    private webcamService: WebcamService,
    public dialogRef: MatDialogRef<ScanPageComponent>) {

    this.logs = 'Scanne einen QR Code';

    // Check for updates
    this.updates = setInterval(() => {
      this.ref.markForCheck();
    }, 200);

    // used to restart scanner
    setTimeout(() => {
      try {
        this.scanner();
      } catch (e) {
        Module.onRuntimeInitialized = async _ => this.scanner();
      }
    });


  }

  ngOnDestroy(): boolean {

    clearInterval(this.timer);
    clearInterval(this.updates);

    return true;

  }


  scanner(): void {

    const video = document.getElementById('live') as HTMLVideoElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const canvasTransp = document.getElementById('canvasTransp') as HTMLCanvasElement;
    const ctxTransp = canvasTransp.getContext('2d');

    const ctx = canvas.getContext('2d');


    // wrap all C functions using cwrap. Note that we have to provide crwap with the function signature.
    const api = {
      scan_image: Module.cwrap('scan_image', '', ['number', 'number', 'number']),
      create_buffer: Module.cwrap('create_buffer', 'number', ['number', 'number']),
      destroy_buffer: Module.cwrap('destroy_buffer', '', ['number']),
    };



    // open the webcam stream
    this.webcamService.getMediaStream().then((stream) => {
      // stream is a MediaStream object
      video.srcObject = stream;
      video.play();

      // tell the canvas which resolution we ended up getting from the webcam
      const track = stream.getVideoTracks()[0];
      const actualSettings = track.getSettings();
      canvas.width = actualSettings.width;
      canvas.height = actualSettings.height;

      canvasTransp.width = actualSettings.width;
      canvasTransp.height = actualSettings.height;

      // every k milliseconds, we draw the contents of the video to the canvas and run the detector.
      this.timer = setInterval(detectSymbols, 50);

    }).catch((e) => {
      alert(e);
      throw e;
    });


    function detectSymbols(): void {

      if (this.showOverview) {
        return;
      }

      ctxTransp.clearRect(0, 0, canvasTransp.width, canvasTransp.height);

      // grab a frame from the media source and draw it to the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // const t0 = performance.now();

      // get the image data from the canvas
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // convert the image data to grayscale
      const grayData = [];
      const d = image.data;
      for (let i = 0, j = 0; i < d.length; i += 4, j++) {
        // tslint:disable-next-line:no-bitwise
        grayData[j] = (d[i] * 66 + d[i + 1] * 129 + d[i + 2] * 25 + 4096) >> 8;
      }

      // put the data into the allocated buffer on the wasm heap.
      const p = api.create_buffer(image.width, image.height);
      Module.HEAP8.set(grayData, p);

      // call the scanner function
      api.scan_image(p, image.width, image.height);

      // clean up
      // (this is not really necessary in this example as we could reuse the buffer, but is used to
      // demonstrate how you can manage Wasm heap memory from the js environment)
      api.destroy_buffer(p);

      // const t1 = performance.now();
      // console.log((t1 - t0).toFixed(2) + ' ms');

    }

    function drawPoly(ctxLocal, poly): void {
      // drawPoly expects a flat array of coordinates forming a polygon (e.g. [x1,y1,x2,y2,... etc])
      ctxLocal.beginPath();
      ctxLocal.moveTo(poly[0], poly[1]);
      for (let item = 2; item < poly.length - 1; item += 2) {
        ctxLocal.lineTo(poly[item], poly[item + 1]);
      }

      ctxLocal.lineWidth = 5;
      ctxLocal.strokeStyle = '#FF0000';
      ctxLocal.closePath();
      ctxLocal.stroke();
    }

    // render the string contained in the barcode as text on the canvas
    function renderData(ctxLocal, data, x, y): void {
      ctxLocal.font = '25px Arial';
      ctxLocal.fillStyle = 'red';
      ctxLocal.fillText(data, x, y);
    }

    // set the function that should be called whenever a barcode is detected
    Module.processResult = (symbol, data, polygon) => {

      const message = this.qrCodeFound(symbol, data);

      // draw the bounding polygon
      drawPoly(ctxTransp, polygon);

      // render the data at the first coordinate of the polygon
      // renderData(ctxTransp, message, polygon[0], polygon[1] - 10);

    };

  }


  qrCodeFound(symbol: string, data: string): string {

    // already found
    if (this.showOverview) {
      return;
    }

    // stop search process...
    this.showOverview = true;
    this.counter = 1;

    console.log(symbol + ' found: ' + data);
    this.logs = data;

    this.name = '';
    this.description = '';

    this.stockService.getMaterialById(Number.parseInt(data, 10))
      .then(res => {

        this.name = res.material;
        this.description = res.description;
        this.id = Number.parseInt(data, 10);

      }).catch(() => {
        this.showOverview = false;
        return;
    });


    const name = this.router.url.split('/')[2];
    this.db.doc('open_borrowings/' + name).get().subscribe(async ref => {

        const mats = ref.data().materials;

        if (mats[data] !== undefined) {
          this.counter = mats[data].amount;
        } else {
          this.counter = 0;
        }

        this.maxCounter = (await this.stockService.getMaterialById(parseInt(data, 10))).stock;

      }
    );


    return 'Lagerblachen';

  }


  increment(): void {

    if (this.counter === this.maxCounter) {
      return;
    }

    this.counter++;

  }

  decrement(): void {

    this.counter--;

    if (this.counter < 0) {
      this.showOverview = false;
    }


  }

  add(): void {

    const name = this.router.url.split('/')[2];

    this.db.doc('open_borrowings/' + name).get().subscribe(ref => {

      const mats = ref.data().materials;
      mats[this.id] = {
        amount: this.counter
      };

      if (this.counter === 0) {
        delete mats[this.id];
      }

      this.db.doc('open_borrowings/' + name).update({
        materials: mats
      });

      this.showOverview = false;

    });


  }

  restartSearch(): void {

    this.showOverview = false;

  }

}
