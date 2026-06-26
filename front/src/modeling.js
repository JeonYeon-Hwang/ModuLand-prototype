import { createScene } from './scene.js';
import { createGeo } from './geo.js';

export function createModeling(){
    /* 생성 기준 객체 */
    const scene = createScene();
    const land = createGeo(8);

    scene.initialize(land);

    window.scene = scene;
    document.addEventListener('mousedown', window.scene.onMouseDown, false);
    document.addEventListener('mouseup', window.scene.onMouseUp, false);
    document.addEventListener('mousemove', window.scene.onMouseMove, false);
    window.scene.start(); 

    const game = {
        update(){
            land.update();
            // scene.update(land);
        }
    }

    scene.start();
}