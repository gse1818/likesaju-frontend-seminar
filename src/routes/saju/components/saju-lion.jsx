import React, {useEffect, useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import lion from '../../../assets/lions/TalkFile_lion.glb';
import * as THREE from 'three';
import { Suspense } from 'react';

function Model({ step }) {
    const { scene, animations } = useGLTF(lion);
    const mixer = useRef(null);

    useEffect(() => {
        mixer.current = new THREE.AnimationMixer(scene);

        const initialAction = mixer.current.clipAction(
            animations.find((clip) => clip.name === 'Armature|ShakeHand'),
        );
        initialAction?.play();

        return () => mixer.current.stopAllAction();
    }, [scene, animations]);

    useEffect(() => {
        if (step === 0) {
            const shakeHandAction = mixer.current.clipAction(
                animations.find((clip) => clip.name === 'Armature|ShakeHand'),
            );
            shakeHandAction?.reset().play();
        } else if (step === 1) {
            const thinkAction = mixer.current.clipAction(
                animations.find((clip) => clip.name === 'Armature|Think'),
            );
            thinkAction?.reset().play();
        } else if (step === 2) {
            const completeAction = mixer.current.clipAction(
                animations.find((clip) => clip.name === 'Armature|Complete'),
            );
            completeAction?.reset().play();
        }
    }, [step]);

    useFrame((_, delta) => mixer.current?.update(delta));

    return <primitive object={scene} />;
}

export const SajuLion = () => {
    return (
        <div className="w-[615px]">
            <Canvas style={{ height: '600px' }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <directionalLight position={[0, 10, 5]} intensity={1.5} />
                <Suspense fallback={null}>
                    <Model />
                </Suspense>
            </Canvas>
        </div>
    );
};