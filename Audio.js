/**
 * Created by elinlager on 2016-09-13.
 */


var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';


var audioCtx = new AudioContext();
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

/** Add the audio file**/
var audio = new Audio();
audio.src = 'Herbert Munkhammar - Malmö State of Mind.mp3';
audio.controls = true;
audio.autoplay = true;
document.body.appendChild(audio);

var context = new webkitAudioContext();
var analyser = context.createAnalyser();


window.addEventListener('load', function(e) {
    // Our <audio> element will be the audio source.
    var source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
}, false);




