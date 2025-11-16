'use client';

import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

function loadModel(callback: (model: THREE.Object3D) => void) {
    let model: THREE.Object3D | null = null;

    loader.load(
        '/reenAG.glb',
        (gltf) => {
            model = gltf.scene;
            model.position.set(0, 0, 0);
            callback(model);
        },
        undefined,
        (error) => {
            console.error('GLTF load error', error);
        }
    );
}

export { loadModel };