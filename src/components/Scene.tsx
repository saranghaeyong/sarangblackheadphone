import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createHeadphone, HeadphoneAssembly } from './HeadphoneModel.ts';
import { ChapterId } from '../data/portfolioData.ts';

interface SceneProps {
  isExploded: boolean;
  onToggleExplode: () => void;
  activeChapter: ChapterId;
  onSelectChapter: (chapterId: ChapterId) => void;
  onHoverPart: (partLabel: string | null) => void;
}

export const Scene: React.FC<SceneProps> = ({
  isExploded,
  onToggleExplode,
  activeChapter,
  onSelectChapter,
  onHoverPart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headphoneAssemblyRef = useRef<HeadphoneAssembly | null>(null);

  // Interaction refs
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });
  const objectRotationRef = useRef({ x: 0.15, y: -0.35 });
  const targetCameraDistanceRef = useRef(7.2);
  const currentCameraDistanceRef = useRef(7.2);

  // Animation progress refs
  const progressRef = useRef(0); // 0 = assembled, 1 = exploded
  const targetProgressRef = useRef(0);
  const hoveredPartNameRef = useRef<string | null>(null);
  const dragDistanceMovedRef = useRef(0);

  // Sync prop changes
  useEffect(() => {
    targetProgressRef.current = isExploded ? 1.0 : 0.0;
  }, [isExploded]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.038);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, currentCameraDistanceRef.current);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x070709, 1);
    container.appendChild(renderer.domElement);

    // 4. Lighting Choreography (Three-point cinematic studio)
    // Ambient soft fill
    const ambientLight = new THREE.AmbientLight(0x282c37, 0.7);
    scene.add(ambientLight);

    // Soft Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    // Cool Steel Fill Light
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 0.9);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    // Crisp Titanium Rim Light (from behind to pop silhouettes)
    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 2.4);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // Subtle Red Practical Accent Light (cinematic mood)
    const redAccentLight = new THREE.PointLight(0xf43f5e, 1.8, 12);
    redAccentLight.position.set(-3, -2, 2.5);
    scene.add(redAccentLight);

    // Soft Floor Shadow Disc
    const floorGeo = new THREE.CircleGeometry(6, 48);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x050507,
      transparent: true,
      opacity: 0.8,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -3.2, 0);
    scene.add(floorMesh);

    // Atmospheric Micro-Dust Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.04,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Create Headphone 3D Assembly
    const headphoneAssembly = createHeadphone();
    headphoneAssemblyRef.current = headphoneAssembly;
    scene.add(headphoneAssembly.root);

    // Raycaster for part inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // 6. Interaction Event Handlers
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      dragDistanceMovedRef.current = 0;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePositionRef.current = { x: clientX, y: clientY };
      rotationVelocityRef.current = { x: 0, y: 0 };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingRef.current) {
        const deltaX = clientX - previousMousePositionRef.current.x;
        const deltaY = clientY - previousMousePositionRef.current.y;

        dragDistanceMovedRef.current += Math.abs(deltaX) + Math.abs(deltaY);

        // Update velocities
        rotationVelocityRef.current = {
          x: deltaY * 0.005,
          y: deltaX * 0.005,
        };

        // Apply immediately
        objectRotationRef.current.x += rotationVelocityRef.current.x;
        objectRotationRef.current.y += rotationVelocityRef.current.y;

        // Clamp pitch so it doesn't invert completely
        objectRotationRef.current.x = Math.max(-1.1, Math.min(1.1, objectRotationRef.current.x));

        previousMousePositionRef.current = { x: clientX, y: clientY };
      } else if (!('touches' in e)) {
        // Hover Raycasting
        const rect = container.getBoundingClientRect();
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(headphoneAssembly.root.children, true);

        if (intersects.length > 0) {
          let foundPart: string | null = null;
          let foundLabel: string | null = null;

          // Trace parent group to find matching config
          let currentObj: THREE.Object3D | null = intersects[0].object;
          while (currentObj && currentObj !== headphoneAssembly.root) {
            const matched = headphoneAssembly.parts.find(
              (p) => p.group === currentObj || p.name === currentObj?.name
            );
            if (matched) {
              foundPart = matched.name;
              foundLabel = matched.label;
              break;
            }
            currentObj = currentObj.parent;
          }

          if (foundPart) {
            hoveredPartNameRef.current = foundPart;
            container.style.cursor = 'pointer';
            onHoverPart(foundLabel);
          } else {
            hoveredPartNameRef.current = null;
            container.style.cursor = 'grab';
            onHoverPart(null);
          }
        } else {
          hoveredPartNameRef.current = null;
          container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
          onHoverPart(null);
        }
      }
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      const wasShortClick = dragDistanceMovedRef.current < 6;
      isDraggingRef.current = false;
      container.style.cursor = 'grab';

      // If it was a clean click without significant drag, trigger action
      if (wasShortClick) {
        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

        const rect = container.getBoundingClientRect();
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(headphoneAssembly.root.children, true);

        if (intersects.length > 0) {
          // If already exploded, clicking a specific part selects its chapter
          if (progressRef.current > 0.6) {
            let currentObj: THREE.Object3D | null = intersects[0].object;
            let matchedPart: typeof headphoneAssembly.parts[0] | undefined;
            while (currentObj && currentObj !== headphoneAssembly.root) {
              matchedPart = headphoneAssembly.parts.find(
                (p) => p.group === currentObj || p.name === currentObj?.name
              );
              if (matchedPart) break;
              currentObj = currentObj.parent;
            }

            if (matchedPart) {
              onSelectChapter(matchedPart.chapterId as ChapterId);
              return;
            }
          }

          // Otherwise toggle explode/reassemble
          onToggleExplode();
        } else if (progressRef.current < 0.2) {
          // If clicked near center when assembled, also explode
          onToggleExplode();
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.0035;
      targetCameraDistanceRef.current = Math.max(
        4.2,
        Math.min(11.0, targetCameraDistanceRef.current + zoomFactor)
      );
    };

    // Attach listeners
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Keyboard controls support
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        onToggleExplode();
      } else if (e.key === 'Escape') {
        if (targetProgressRef.current > 0) {
          onToggleExplode();
        }
      } else if (e.key === 'ArrowLeft') {
        objectRotationRef.current.y -= 0.15;
      } else if (e.key === 'ArrowRight') {
        objectRotationRef.current.y += 0.15;
      } else if (e.key === 'ArrowUp') {
        objectRotationRef.current.x = Math.max(-1.1, objectRotationRef.current.x - 0.1);
      } else if (e.key === 'ArrowDown') {
        objectRotationRef.current.x = Math.min(1.1, objectRotationRef.current.x + 0.1);
      } else if (e.key === '+' || e.key === '=') {
        targetCameraDistanceRef.current = Math.max(4.2, targetCameraDistanceRef.current - 0.5);
      } else if (e.key === '-' || e.key === '_') {
        targetCameraDistanceRef.current = Math.min(11.0, targetCameraDistanceRef.current + 0.5);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 7. Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth progress interpolation for disassembly
      const progressDelta = (targetProgressRef.current - progressRef.current) * 4.5 * delta;
      progressRef.current += progressDelta;

      // Inertial rotation damping
      if (!isDraggingRef.current) {
        objectRotationRef.current.x += rotationVelocityRef.current.x;
        objectRotationRef.current.y += rotationVelocityRef.current.y;

        // Subtle idle rotation when stationary
        const idleRotY = Math.sin(time * 0.4) * 0.0008;
        objectRotationRef.current.y += idleRotY;

        rotationVelocityRef.current.x *= 0.92;
        rotationVelocityRef.current.y *= 0.92;
      }

      // Smooth camera zoom lerping
      currentCameraDistanceRef.current = THREE.MathUtils.lerp(
        currentCameraDistanceRef.current,
        targetCameraDistanceRef.current,
        0.08
      );
      camera.position.z = currentCameraDistanceRef.current;

      // Apply rotation to root assembly with subtle idle float
      const idleFloatY = Math.sin(time * 0.8) * 0.08;
      headphoneAssembly.root.position.y = idleFloatY;
      headphoneAssembly.root.rotation.x = objectRotationRef.current.x;
      headphoneAssembly.root.rotation.y = objectRotationRef.current.y;

      // Update headphone disassembly state
      headphoneAssembly.update(progressRef.current, time, hoveredPartNameRef.current);

      // Subtle particle drift
      const pPositions = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 1; i < particleCount * 3; i += 3) {
        let y = pPositions.getY(i / 3);
        y -= 0.004;
        if (y < -6) y = 6;
        pPositions.setY(i / 3, y);
      }
      pPositions.needsUpdate = true;

      renderer.render(scene, camera);
    };

    render();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('keydown', handleKeyDown);

      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onPointerDown);

      headphoneAssembly.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onToggleExplode, onSelectChapter, onHoverPart]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none select-none z-0"
    />
  );
};
