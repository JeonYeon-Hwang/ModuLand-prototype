import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets = {
    'grass': (x, y) => {
        /* 바닥을 생성 */
        const material = new THREE.MeshLambertMaterial({color: 0x00aa00});
        const mesh = new THREE.Mesh(geometry, material);
        /* 위 아래가 없음 */
        mesh.position.set(x, 0, y);
        return mesh
    },
    'block-1': (x, y) => {
        /* 건물을 생성 */
        const height = Number(tile.block.slice(-1));
        const material = new THREE.MeshLambertMaterial({color: 0x777777});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, height / 2, y);
        return mesh
    },
    'block-2': (x, y) => {

    },
    'block-3': (x, y) => {

    },
}

export function createAssetInstance(assetId, x, y){
    if (assetId in assets){
        return assets[assetId](x, y);
    }else{
        console.warn(`해당 ID 에셋은 없습니다: ${assetId}`);
        return undefined;
    }
}