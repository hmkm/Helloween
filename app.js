// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    cameraFrame = document.querySelector("#camera--frame")



// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
        drawFrame();
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth*2;
    cameraSensor.height = cameraView.videoHeight*2;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0, cameraView.videoWidth * 2, cameraView.videoHeight * 2)   
    cameraSensor.getContext("2d").drawImage(cameraFrame, 0, 0, cameraView.videoWidth * 2, cameraView.videoHeight * 2)   
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    //cancelTimer();
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

function drawFrame(){
    const image = new Image();
    image.src = cameraFrame.src;
    image.onload = () => {
      const ctx = cameraFrame.getContext("2d");
      //ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.clearRect(0, 0);
      ctx.drawImage(image, 0, 0);
    };
}

function cancelTimer() {
    timeoutID = setTimeout(cancelTakenView, 3000);
}

function cancelTakenView() {
    cameraOutput.classList.remove("taken")
    clearTimeout(timeoutID);
}