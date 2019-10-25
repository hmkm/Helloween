let processor = {

    timerCallback: function () {
        if (this.video.paused || this.video.ended) {
            return;
        }
      this.computeFrame();
      let self = this;
      setTimeout(function () {
          self.timerCallback();
        }, 0);
    },
  
    doLoad: function () {

        this.video = document.getElementById("video");
        this.img = document.getElementById("img");
        this.movie = document.getElementById("movie");
        //this.button = document.getElementById("button");
        //this.button = document.getElementById("button");
        //this.button.addEventListener('click', function () {
            
        //}, false);

        this.c1 = document.getElementById("canvas");
        this.ctx1 = this.c1.getContext("2d");
        this.c2 = document.getElementById("canvas2");
        this.ctx2 = this.c2.getContext("2d");
        let self = this;
        this.video.addEventListener('play', function () {
            self.width = self.video.videoWidth;
            self.height = self.video.videoHeight;
            self.timerCallback();
        }, false);
    },
  
    computeFrame: function () {
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        this.ctx1.drawImage(this.img, 0, 0, this.width, this.height);
        this.ctx1.drawImage(this.movie, 0, 0, this.width, this.height);

        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        let l = frame.data.length / 4;

        //クロマキー
        for (let i = 0; i < l; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            if (g > 100 && r < 100 && b < 100)
                frame.data[i * 4 + 3] = 0;
        }
        this.ctx1.putImageData(frame, 0, 0);
        return;
    }
  };

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});