import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

const gui = new GUI()

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}
const timer = new THREE.Timer()

// scene
const scene = new THREE.Scene()

//3d object / mesh

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// mesh
const cube = new THREE.Mesh(geometry, material);

// add the object to the scene
scene.add(cube);

// add the gui
gui.add(cube.position, "x").min(-3).max(3).step(0.01).name("Position X");

// camera
const camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    100
)
camera.position.z = 3;
camera.lookAt(0, 0, 0)

// renderer
const canvas = document.querySelector("#webgl")
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(size.width, size.height)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", () => {
    size.height = window.innerHeight;
    size.width = window.innerWidth;

    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)

})

// turning the renderer on 
function animate() {
    timer.update()
    controls.update()
    const delta = timer.getDelta()
    cube.rotation.y = cube.rotation.y + delta
    cube.rotation.x = cube.rotation.x + delta
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}

animate()