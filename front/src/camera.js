import * as THREE from 'three';

export function createCamera(gameWindow){
    const DEG2RAD = Math.PI / 180;

    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;

    const MIN_CAMERA_RADIOUS = 2;
    const MAX_CAMERA_RADIOUS = 10;
    const MIN_CAMERA_ELEVATION = 30;
    const MAX_CAMERA_ELEVATION = 90;
    
    const ROATAION_SENSITIVITY = 0.5;
    const ZOOM_SENSITIVITY = 0.02;
    const PAN_SENSITIVITY = -0.01;
    
    const Y_AXIS = new THREE.Vector3(0, 1, 0);
    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);
    
    let cameraOrigin = new THREE.Vector3();
    let cameraRadius = 4;
    let cameraAzimuth = 0;
    let cameraElevation = 0;
    
    let isLeftMouseDown = false;
    let isRightMouseDown = false;
    let isMiddleMouseDown = false;
    
    let prevMouseX = 0;
    let prevMouseY = 0;

    updateCameraPostion();  


    function onMouseDown(event){
        console.log('mousedown');
        
        if(event.button === LEFT_MOUSE_BUTTON){
            isLeftMouseDown = true;
        }

        if(event.button === MIDDLE_MOUSE_BUTTON){
            isMiddleMouseDown = true;
        }

        if(event.button === RIGHT_MOUSE_BUTTON){
            isRightMouseDown = true;
        }
    }

    function onMouseUp(event){
        console.log('mouseup');
        
        if(event.button === LEFT_MOUSE_BUTTON){
            isLeftMouseDown = false;
        }

        if(event.button === MIDDLE_MOUSE_BUTTON){
            isMiddleMouseDown = false;
        }

        if(event.button === RIGHT_MOUSE_BUTTON){
            isRightMouseDown = false;
        }
    }

    function onMouseMove(event){
        console.log('mouseMove');

        const deltaX = (event.clientX - prevMouseX);
        const deltaY = (event.clientY - prevMouseY);

        /* 카메라 회전 */
        if(isLeftMouseDown){
            cameraAzimuth += -(deltaX * ROATAION_SENSITIVITY);
            cameraElevation += (deltaY * ROATAION_SENSITIVITY);
            cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation));
            updateCameraPostion();
        }

        /* 카메라 위치 변경 */
        if(isMiddleMouseDown){
            const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
            cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));
            updateCameraPostion();
        }

        /* 카메라 줌 하기 */
        if(isRightMouseDown){
            cameraRadius += (deltaY * ZOOM_SENSITIVITY);
            cameraRadius = Math.min(180, Math.max(MIN_CAMERA_RADIOUS, cameraRadius));
            updateCameraPostion();
        }

        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    }

    /* 카메라 이동 */
    function updateCameraPostion(){
        /* 코사인 이용하여 반경 계산 */
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        /* 카메라 방향도 적용 필요 */
        camera.position.add(cameraOrigin);
        camera.lookAt(cameraOrigin);
        camera.updateMatrix();
    }

    return {
        camera,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }
}