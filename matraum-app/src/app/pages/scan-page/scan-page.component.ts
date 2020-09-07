import {Component, OnInit} from '@angular/core';
import jsQR from 'jsqr';

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.sass']
})
export class ScanPageComponent  implements OnInit {
  title = 'matraum-app';

  constructor() {


  }

  ngOnInit(): void {

    // used for livestream the camera to the video element
    const video = document.querySelector('#videoElement') as HTMLMediaElement;

    // request permition
    if (navigator.mediaDevices.getUserMedia) {

      navigator.mediaDevices.getUserMedia({

        // webcam settings
        video:
          {
            facingMode: 'environment',
            width: {min: 1024, ideal: 1280, max: 1920},
            height: {min: 576, ideal: 720, max: 1080}
          }

      })

        .then((stream) => {
          video.srcObject = stream;
        })

        .catch((err0r) => {
          console.error(err0r);
        });

    }

    // start checking
    setTimeout(() => {
      this.check();
    }, 2000);

  }

  /**
   * Check for a QR Code in the current video snapshot.
   * Repeats this function unit a valid QR Code is found in the image.
   *
   */
  public check(): void {

    setTimeout(() => {

      console.log('Check for QR Code...');

      const canvas = document.getElementById('canvas_temp') as HTMLCanvasElement;
      const video = document.querySelector('#videoElement') as HTMLVideoElement;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      const context = canvas.getContext('2d');
      const image = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(image.data, canvas.width, canvas.height);

      if (code) {

        console.log('Found QR code', code);

        const htmlElement = document.getElementById('QR_Code') as HTMLParagraphElement;
        htmlElement.innerText = code.data;

      }

      this.check();

    }, 150);

  }
}
