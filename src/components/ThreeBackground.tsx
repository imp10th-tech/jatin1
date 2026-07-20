import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FRAME_MS = 1000 / 30; // cap at 30fps

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(2.2, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const geo2 = new THREE.TorusGeometry(3.4, 0.04, 8, 120);
    const mat2 = new THREE.MeshBasicMaterial({ color: 0xff2d55, wireframe: true, transparent: true, opacity: 0.12 });
    const ring = new THREE.Mesh(geo2, mat2);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    let raf = 0;
    let last = 0;
    let running = true;
    const animate = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(animate);
      if (now - last < FRAME_MS) return;
      last = now;
      mesh.rotation.x += 0.0016;
      mesh.rotation.y += 0.0012;
      ring.rotation.z += 0.0008;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    let resizeTimer: number | undefined;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(animate);
      }
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (resizeTimer) clearTimeout(resizeTimer);
      mount.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      geo2.dispose();
      mat2.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}
