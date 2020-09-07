import {Component, OnInit} from '@angular/core';
import jsQR from 'jsqr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.sass']
})
export class ScanPageComponent implements OnInit {
  title = 'matraum-app';

  public action: 'barrow' | 'take-back';

  constructor(private router: Router) {

    this.action = this.router.url.split('/')[2] as 'barrow' | 'take-back';

  }

  ngOnInit(): void {

    // used for livestream the camera to the video element
    const video = document.querySelector('#videoElement') as HTMLMediaElement;

    // request permition
    if (navigator.mediaDevices.getUserMedia) {

      navigator.mediaDevices.getUserMedia({
        audio: false,
        // webcam settings
        video: {
          facingMode: 'environment',
          width: {ideal: 1280},
          height: {ideal: 720}
        }
      })

        .then((stream) => {
          video.srcObject = stream;
          this.checkForQRCode();

        })

        .catch((err0r) => {

          console.error(err0r);
          alert(err0r);

        });

    }

  }

  /**
   * Check for a QR Code in the current video snapshot.
   * Repeats this function unit a valid QR Code is found in the image.
   *
   */
  public checkForQRCode(): void {

    setTimeout(() => {

      const t0 = performance.now();

      const canvas = document.getElementById('canvas_temp') as HTMLCanvasElement;
      const video = document.querySelector('#videoElement') as HTMLVideoElement;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      const context = canvas.getContext('2d');
      const image = context.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(image.data, canvas.width, canvas.height);

      const t1 = performance.now();
      console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');

      if (code) {

        const htmlElement = document.getElementById('QR_Code') as HTMLParagraphElement;
        htmlElement.innerText = code.data;

      }

      this.checkForQRCode();

    }, 200);

  }
}
