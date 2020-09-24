import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  private stream: MediaStream;

  constructor() {  }

  public async getMediaStream(): Promise<MediaStream> {

    if (!this.stream) {

      // settings for the getUserMedia call
      const constraints = {
        audio: false,
        video: {
          // the browser will try to honor this resolution, but it may end up being lower.
          facingMode: 'environment',
          width: {min: 100, ideal: 320, max: 500},
          height: {min: 100, ideal: 320, max: 500}
        }
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

    }

    return this.stream;

  }


}
