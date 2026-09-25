import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import './style.css'
import * as THREE from 'three'

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

// camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    // window.innerHeight / window.innerWidth,
    0.1,
    100
)
camera.position.z = 3;

// renderer
const canvas = document.querySelector("#webgl")
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(window.innerWidth, window.innerHeight)


// turning the renderer on 
function animate() {
    console.log("timer before update", timer)
    timer.update()
    const delta = timer.getDelta()
    console.log(delta)
    cube.rotation.y = cube.rotation.y + delta
    cube.rotation.x = cube.rotation.x + delta
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}

animate()