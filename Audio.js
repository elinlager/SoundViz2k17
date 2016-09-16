/**
 * Created by elinlager on 2016-09-13.
 */


var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';

//size of canvas
var WIDTH = 640;
var HEIGHT = 100;

var FFT_SIZE = 2048;


// set up canvas context for visualizer
var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();

/** Add the audio file **/
var audio = new Audio();
audio.src = 'Herbert Munkhammar - Malmö State of Mind.mp3';
audio.controls = true;
audio.autoplay = true;
document.querySelector('h2').appendChild(audio);

var context = new webkitAudioContext();
var analyser = context.createAnalyser();

window.addEventListener('load', function(e) {
    // Our <audio> element will be the audio source.
    var source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

}, false);

analyser.fftSize = FFT_SIZE;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

analyser.getByteTimeDomainData(dataArray);

canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
};

draw();
