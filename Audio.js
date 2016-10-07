/**
 * Created by elinlager on 2016-09-13.
 */

/********************
 GLOBAL CONSTANTS
 ********************/
var FFT_SIZE = 256;

/********************
 SETUP 3D SCENE
 ********************/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 25;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("container").appendChild(renderer.domElement);

/********************
    CREATE AUDIO ELEMENT
 ********************/
var audio = new Audio();
audio.controls = true;
audio.autoplay = true;

/********************
 CREATE AUDIOCONTEXT
 AND ANALYSER NODE
 ********************/
var context = new (window.AudioContext || window.webkitAudioContext)();
var analyser = context.createAnalyser();
analyser.fftSize = FFT_SIZE;

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

    plane.rotation.x=-1;
    plane.rotation.x=(-3.14/4);
    plane.position.y=3;
    plane.position.x=2;

    scene.add(plane);



/********************
    ORBIT CONTROLS
 ********************/
var controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.9;
controls.enableZoom = true;


/* Josse lagt till */
controls.enableRotate = true;

//max och mindistance för zoomning
controls.minDistance = 20;
controls.maxDistance = 30;


/********************
        PLAY
 ********************/
function play() {
    //add the audio element
    document.querySelector('h2').appendChild(audio);

    window.addEventListener('load', function(e) {
        // Our <audio> element will be the audio source.
        var source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
    }, false);

    /*get number of frequency data (should be fft size / 2)
    and create array with that size */
    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);

    /********************
         RENDER
     ********************/
    function render() {
        requestAnimationFrame( render );

        /**************************************
         * put analysed data in dataArray array
         **************************************/
        analyser.getByteFrequencyData(dataArray);

        //add analysed data to first row of planegeometry
        // planegeometry is an array with all the vertices in the plane, row by row
        for(var k=0; k <128; k++) {
            plane.geometry.vertices[k].z =  dataArray[k]/50;
        }


        //"moving" the vertex positions of each row back one step
        for(var j = 30; j >1; j--) {
            for(var i = 0; i < 128; i++){
                plane.geometry.vertices[(j*128)-i-1].z = plane.geometry.vertices[((j-1)*128)-i-1].z;
            }

            //behövs denna?
            plane.geometry.verticesNeedUpdate = true;

            renderer.render( scene, camera );
        }

    }
    render();
}

play();

function chooseSong(text, number) {
    song = text;
    audio.src = song;

    document.getElementById("Song1").style.color = "white";
    document.getElementById("Song2").style.color = "white";
    document.getElementById("Song3").style.color = "white";
    document.getElementById("Song4").style.color = "white";
    document.getElementById("Song5").style.color = "white";
    document.getElementById("Song6").style.color = "white";
    document.getElementById(number).style.color = "yellow";


    play();
}


/* when pressing controlbuttons */
function graphControls(posz,rotz,rotx,roty,camy) {
    plane.enableRotate=true;
    camera.position.z=25;
    camera.position.x=0;
    camera.position.y=camy;
    camera.rotation.x=-6;
    camera.rotation.y=0;
    camera.rotation.z=0;

    plane.position.z = posz;
    plane.rotation.z=rotz;
    plane.rotation.x=rotx;
    plane.position.x=2;
    plane.rotation.y=roty;
}



function show_timeText() {

    //display and hide text
    document.getElementById('timeText').style.display = "block";
    document.getElementById('freqText').style.display = "none";

    //appearance of active button
    document.getElementById('time').style.fontWeight="bold";
    document.getElementById('time').style.color="yellow";
    document.getElementById('freq').style.fontWeight="normal";
    document.getElementById('freq').style.color="white";
}

function show_freqText() {

    //display and hide text
    document.getElementById('freqText').style.display = "block";
    document.getElementById('timeText').style.display = "none";

    //appearance of active button
    document.getElementById('freq').style.fontWeight="bold";
    document.getElementById('freq').style.color="yellow";
    document.getElementById('time').style.fontWeight="normal";
    document.getElementById('time').style.color="white";
}

