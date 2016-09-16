/**
 * Created by elinlager on 2016-09-13.
 */

//size of canvas
var WIDTH = 640;
var HEIGHT = 100;
var FFT_SIZE = 256;



// set up canvas context for visualizer
var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");


/** Add the audio file **/
var song = 'Herbert Munkhammar - Malmö State of Mind.mp3';
var audio = new Audio();
audio.controls = true;
audio.autoplay = true;
audio.src = song;

var context = new (window.AudioContext || window.webkitAudioContext)();
var analyser = context.createAnalyser();

function play() {
        audio.source = song;

        document.querySelector('h2').appendChild(audio);

    window.addEventListener('load', function(e) {
        // Our <audio> element will be the audio source.
        var source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
    }, false);

    analyser.fftSize = FFT_SIZE;
    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {
        drawVisual = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH / bufferLength) * 0.8;
        var barHeight;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]/2;

            var hue = i/this.analyser.frequencyBinCount * 360;
            canvasCtx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            //canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)'; <-- Röda nyanser
            canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);


            x += barWidth + 1;
        }
    };

    draw();
}

play();

function chooseSong(text) {
    song = text;
    audio.src = song;
    play();

}