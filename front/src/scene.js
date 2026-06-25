import * as THREE from 'three';
import { createCamera } from './camera.js';

export function createScene(){

    const gameWindow = document.getElementById('render-target');
    const scene = new THREE. Scene();
    scene.background = new THREE.Color(0x777777);

    /* 카메라 불러오기 */
    const camera = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    /* 오브젝트 */
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000});
    const mesh = new THREE.Mesh(geometry, material);
    
    scene.add(mesh);

    function draw(){
        renderer.render(scene, camera.camera);
    }

    function start(){
        renderer.setAnimationLoop(draw);  
    }

    function stop(){
        renderer.setAnimationLoop(null);
    }

    function onMouseDown(event){
        console.log('mousedown');
        camera.onMouseDown(event);
    }

    function onMouseUp(event){
        camera.onMouseUp(event);
    }

    function onMouseMove(event){
        camera.onMouseMove(event);
    }


    return {
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }
}