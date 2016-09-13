/**
 * Created by elinlager on 2016-09-13.
 */
<audio id="myAudio" src="path-to-audio.mp3"></audio>

var flashlight = new THREE.PointLight(0xffffff, 1, 100);
flashlight.target = camera;
flashlight.position.copy(camera.position);
scene.add(flashlight);

scene.add(new THREE.AmbientLight(0x404040));


var sphere = new THREE.SphereGeometry(10.5, 32, 32);
var material = new THREE.MeshPhongMaterial({shininess: 20, color: 0x3a6698});
var earthMesh = new THREE.Mesh(sphere, material);
scene.add(earthMesh);