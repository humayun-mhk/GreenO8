'use client';

import { useEffect, useRef } from 'react';

export default function EnergyScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer;
    let frame;
    let disposed = false;

    async function boot() {
      const THREE = await import('three');
      if (disposed || !mountRef.current) return;

      const mount = mountRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0.2, 5.6);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x73e05e, transparent: true, opacity: 0.22, side: THREE.DoubleSide });
      const ringGeo = new THREE.TorusGeometry(1.45, 0.012, 10, 128);
      const ring = new THREE.Mesh(ringGeo, ringMaterial);
      ring.rotation.x = Math.PI * 0.54;
      group.add(ring);

      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.008, 8, 128), new THREE.MeshBasicMaterial({ color: 0x7fd9b7, transparent: true, opacity: 0.14 }));
      ring2.rotation.x = Math.PI * 0.42;
      ring2.rotation.z = Math.PI * 0.22;
      group.add(ring2);

      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xd5ff88 });
      const nodeGeo = new THREE.SphereGeometry(0.055, 18, 18);
      const nodes = [];
      for (let i = 0; i < 10; i += 1) {
        const a = (Math.PI * 2 * i) / 10;
        const radius = i % 2 ? 1.95 : 1.45;
        const node = new THREE.Mesh(nodeGeo, nodeMaterial.clone());
        node.position.set(Math.cos(a) * radius, Math.sin(a * 1.15) * 0.55, Math.sin(a) * radius * 0.3);
        node.material.opacity = 0.7;
        node.material.transparent = true;
        group.add(node);
        nodes.push(node);
      }

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.66, 2),
        new THREE.MeshBasicMaterial({ color: 0x7fe14a, wireframe: true, transparent: true, opacity: 0.5 })
      );
      group.add(core);

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xa7f366, transparent: true, opacity: 0.08 })
      );
      group.add(glow);

      function resize() {
        if (!mountRef.current || !renderer) return;
        const { clientWidth, clientHeight } = mountRef.current;
        renderer.setSize(clientWidth, clientHeight, false);
        camera.aspect = clientWidth / Math.max(clientHeight, 1);
        camera.updateProjectionMatrix();
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let t = 0;
      function tick() {
        t += reduceMotion ? 0 : 0.005;
        group.rotation.y = t * 0.7;
        ring.rotation.z = t * 0.35;
        ring2.rotation.y = t * -0.45;
        core.rotation.x = t * 0.8;
        core.rotation.y = t * 1.1;
        nodes.forEach((node, index) => {
          node.scale.setScalar(1 + Math.sin(t * 5 + index) * 0.12);
        });
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      }

      const ro = new ResizeObserver(resize);
      ro.observe(mount);
      resize();
      tick();

      return () => ro.disconnect();
    }

    let disconnectResize;
    boot().then((cleanup) => { disconnectResize = cleanup; }).catch(() => {
      // CSS fallback remains visible if WebGL/Three.js is unavailable.
    });

    return () => {
      disposed = true;
      if (disconnectResize) disconnectResize();
      if (frame) cancelAnimationFrame(frame);
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  }, []);

  return (
    <div className="energy-scene" aria-hidden="true">
      <div className="energy-scene__fallback">
        <span className="energy-orbit energy-orbit--one" />
        <span className="energy-orbit energy-orbit--two" />
        <span className="energy-core" />
      </div>
      <div className="energy-scene__three" ref={mountRef} />
      <div className="energy-scene__labels">
        <span className="scene-label scene-label--a">Verified asset</span>
        <span className="scene-label scene-label--b">Live data</span>
        <span className="scene-label scene-label--c">Ledger record</span>
      </div>
    </div>
  );
}
