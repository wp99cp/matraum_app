import {Component} from '@angular/core';
import {Router} from '@angular/router';

declare var Module: any;

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.sass']
})
export class ScanPageComponent {
  title = 'matraum-app';

  public action: 'barrow' | 'take-back';

  constructor(private router: Router) {

    this.action = this.router.url.split('/')[2] as 'barrow' | 'take-back';
    console.log('Action: ' + this.action);


    Module.onRuntimeInitialized = async _ => {

      const video = document.getElementById('live') as HTMLVideoElement;
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      const desiredWidth = 1280;
      const desiredHeight = 720;

      // wrap all C functions using cwrap. Note that we have to provide crwap with the function signature.
      const api = {
        scan_image: Module.cwrap('scan_image', '', ['number', 'number', 'number']),
        create_buffer: Module.cwrap('create_buffer', 'number', ['number', 'number']),
        destroy_buffer: Module.cwrap('destroy_buffer', '', ['number']),
      };

      // settings for the getUserMedia call
      const constraints = {
        audio: false,
        video: {
          // the browser will try to honor this resolution, but it may end up being lower.
          facingMode: 'environment',
          width: desiredWidth,
          height: desiredHeight
        }
      };


      // open the webcam stream
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        // stream is a MediaStream object
        video.srcObject = stream;
        video.play();

        // tell the canvas which resolution we ended up getting from the webcam
        const track = stream.getVideoTracks()[0];
        const actualSettings = track.getSettings();
        console.log(actualSettings.width, actualSettings.height);
        canvas.width = actualSettings.width;
        canvas.height = actualSettings.height;

        // every k milliseconds, we draw the contents of the video to the canvas and run the detector.
        const timer = setInterval(detectSymbols, 10);

      }).catch((e) => {
        throw e;
      });



      function detectSymbols(): void {


        // grab a frame from the media source and draw it to the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        let t0 = performance.now();

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

        let t1 = performance.now();
        console.log((t1 - t0).toFixed(2) + " ms");

      }

      function drawPoly(ctxLocal, poly): void {
        // drawPoly expects a flat array of coordinates forming a polygon (e.g. [x1,y1,x2,y2,... etc])
        ctxLocal.beginPath();
        ctxLocal.moveTo(poly[0], poly[1]);
        for (let item = 2; item < poly.length - 1; item += 2) {
          ctxLocal.lineTo(poly[item], poly[item + 1]);
        }

        ctxLocal.lineWidth = 2;
        ctxLocal.strokeStyle = '#FF0000';
        ctxLocal.closePath();
        ctxLocal.stroke();
      }

      // render the string contained in the barcode as text on the canvas
      function renderData(ctxLocal, data, x, y): void {
        ctxLocal.font = '20px Arial';
        ctxLocal.fillStyle = 'red';
        ctxLocal.fillText(data, x, y);
      }

      // set the function that should be called whenever a barcode is detected
      Module.processResult = (symbol, data, polygon) => {

        const message = this.qrCodeFound(symbol, data);

        // draw the bounding polygon
        drawPoly(ctx, polygon);

        // render the data at the first coordinate of the polygon
        renderData(ctx, message, polygon[0], polygon[1] - 10);

      };

    };


  }

  qrCodeFound(symbol: string, data: string): string {

    console.log(symbol + ' found: ' + data);

    return 'Lagerblachen';

  }


}
