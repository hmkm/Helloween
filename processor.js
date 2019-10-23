let processor = {

    timerCallback: function() {
      this.computeFrame();
      let self = this;
      setTimeout(function () {
          self.timerCallback();
        }, 0);
    },
  
    doLoad: function () {

        this.video = document.getElementById("video");
        this.img = document.getElementById("img");
        //this.button = document.getElementById("button");
        //this.button.addEventListener('click', function () {
            
        //}, false);

        this.c1 = document.getElementById("canvas");
        this.ctx1 = this.c1.getContext("2d");
        let self = this;
        this.video.addEventListener('play', function () {
            self.width = self.video.videoWidth;
            self.height = self.video.videoHeight;
            self.timerCallback();
        }, false);
    },
  
    computeFrame: function () {
        //this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        this.ctx1.drawImage(this.img, 0, 0, window.innerWidth, window.innerHeight - 18);
        //this.ctx1.drawImage(this.button, this.width / 4, this.height/2-100, 50, 50);
        return;
    }
  };

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});