'use client';

import * as THREE from 'three';

import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { rangeRandom } from '@/util/random';
import { loadModel } from '@/util/model';

function ThreeScene() {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const rotationSpeedx = useRef(rangeRandom(0.005, 0.03));
    const rotationSpeedz = useRef(rangeRandom(0.005, 0.03));
    const isUserInteracting = useRef(false);

    const randomizeRotationSpeed = () => {
        rotationSpeedx.current = rangeRandom(-0.03, 0.03);
        rotationSpeedz.current = rangeRandom(-0.03, 0.03);
    };

    const externalAnimate = useRef((model: THREE.Object3D | null) => {
        //console.log('userInteracting', isUserInteracting);
        if (model && !isUserInteracting.current) {
            //console.log('externalAnimate', rotationSpeedx, rotationSpeedz);
            model.rotation.x += rotationSpeedx.current;
            model.rotation.x %= 2 * Math.PI;
            model.rotation.z += rotationSpeedz.current;
            model.rotation.z %= 2 * Math.PI;
        }
    });

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();

        // 카메라를 z축 위에서 내려다보는 느낌
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            130
        );
        camera.position.set(0, 80, 0); // z축 위로
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
        scene.add(light);
        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;

        // OrbitControls에서 제공하는 이벤트로 상태 전환
        controls.addEventListener('start', () => {
            console.log('start');
            isUserInteracting.current = true;
        });

        controls.addEventListener('end', () => {
            console.log('end');
            isUserInteracting.current = false;
            randomizeRotationSpeed();
        });

        let model: THREE.Object3D | null = null;
        loadModel((loadedModel) => {
            model = loadedModel;
            scene.add(model);
        });

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

            externalAnimate.current?.(model);

            controls.update();
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