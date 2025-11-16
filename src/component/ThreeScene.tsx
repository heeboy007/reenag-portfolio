'use client';

import * as THREE from 'three';

import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { rangeRandom } from '@/util/random';

function ThreeScene() {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const [ rotationSpeedx ] = useState(rangeRandom(0.005, 0.015));
    const [ rotationSpeedz ] = useState(rangeRandom(0.005, 0.015));

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();

        // 카메라를 z축 위에서 내려다보는 느낌
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.set(0, 80, 0); // z축 위로
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
        scene.add(light);

        // 자동 회전시킬 모델 참조용
        let model: THREE.Object3D | null = null;

        const loader = new GLTFLoader();
        loader.load(
        '/reenAG.glb',
        (gltf) => {
            model = gltf.scene;
            // 모델 크기/위치 약간 조정하고 싶으면 여기서
            model.position.set(0, 0, 0);
            scene.add(model);
        },
        undefined,
        (error) => {
            console.error('GLTF load error', error);
        }
        );

        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        let frameId: number;
        const animate = () => {
        frameId = requestAnimationFrame(animate);

        // 여기서 계속 회전
        if (model) {
            // 대칭이면 Y축 기준 회전이 제일 무난
            model.rotation.x += rotationSpeedx;
            model.rotation.x %= 2 * Math.PI;
            model.rotation.z += rotationSpeedz; // 속도는 취향껏 조절
            model.rotation.z %= 2 * Math.PI;
            // 다른 축도: model.rotation.x += 0.005; 등
        }

        renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            if (container.firstChild) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="bg-point"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }}
        />
    );
}

export default ThreeScene;