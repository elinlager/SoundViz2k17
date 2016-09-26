/**
 * Created by elinlager on 2016-09-13.
 */

//size of canvas
var WIDTH = 640;
var HEIGHT = 100;
var FFT_SIZE = 256;


// setup 3d scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/********************
    ADD AUDIO FILE
 ********************/
var song = 'Herbert Munkhammar - Malmö State of Mind.mp3';
var audio = new Audio();
audio.controls = true;
audio.autoplay = true;
audio.src = song;

var context = new (window.AudioContext || window.webkitAudioContext)();
var analyser = context.createAnalyser();

/********************
     ADD PLANE
 ********************/


var planegeo= new THREE.PlaneGeometry(30, 30, 127, 29);

planegeo.verticesNeedUpdate = true;


var planemat = new THREE.MeshBasicMaterial({
    color: 0xFFFF00,
    wireframe: true
});

var plane = new THREE.Mesh(planegeo, planemat);
//plane.rotation.z = -1;
plane.rotation.x = -1;
plane.rotation.z = -1;
scene.add(plane);


//plane.geometry.vertices[500].z += 5; //test

/********************
    ORBIT CONTROLS
 ********************/
var controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.9;
controls.enableZoom = true;



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



    /********************
         RENDER
     ********************/
    function render() {
        requestAnimationFrame( render );

        analyser.getByteFrequencyData(dataArray);


        //add analysed data to first row of planegeometry
        for(var k=0; k <128; k++) {
            plane.geometry.vertices[k].z =  dataArray[k]/50;

        }

        for(var j = 30; j >1; j--) {
            for(var i = 0; i < 128; i++){
                plane.geometry.vertices[(j*128)-i-1].z = plane.geometry.vertices[((j-1)*128)-i-1].z;
            }

            plane.geometry.verticesNeedUpdate = true;

            renderer.render( scene, camera );
        }
    }
    render();



}

play();

function chooseSong(text) {
    song = text;
    audio.src = song;
    play();

}
