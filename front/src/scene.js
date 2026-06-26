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

    let meshes = [];
    
    /* mesh를 채워넣는? 로직 */
    function initialize(land){
        scene.clear();
        meshes = [];

        for(let x = 0; x < land.size; x++){
            const column = [];
            for(let y = 0; y < land.size; y++){
                /* 해당 좌표에 해당하는 mesh를 불러온다
                   여기는 땅 */
                scene.add(mesh);
                column.push(mesh);
            }
            meshes.push(column);
        }

        setupLights();
    }

    /* 빛 설정 */
    function setupLights(){
        const lights = [
            new THREE.AmbientLight(0xcffffff, 0.2),
            new THREE.DirectionalLight(0xcffffff, 0.3),
            new THREE.DirectionalLight(0xcffffff, 0.3),
            new THREE.DirectionalLight(0xcffffff, 0.3),
        ];

        /* 광원 위치 설정 */
        lights[1].position.set(0, 1, 0);
        lights[1].position.set(1, 1, 0);
        lights[1].position.set(0, 1, 1);

        scene.add(...lights);
    }

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
        initialize,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }
}