'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DsaScene({ opacity = 0.22 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Color Palette from the Brand Logo:
    const brandColors = [
      new THREE.Color('#0ea5e9'), // Cyan (D)
      new THREE.Color('#10b981'), // Mint Emerald (S)
      new THREE.Color('#f97316'), // Sunset Orange (A)
    ];

    // 3. Create Graph Nodes with subtle, gentle opacity
    const nodeCount = 38;
    const nodes = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const sphereGeo = new THREE.SphereGeometry(0.32, 16, 16);

    for (let i = 0; i < nodeCount; i++) {
      const color = brandColors[i % brandColors.length];
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.55,
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 6.5 + Math.random() * 5.5;

      mesh.position.x = r * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = (r * Math.sin(phi) * Math.sin(theta)) * 0.6;
      mesh.position.z = r * Math.cos(phi);

      mesh.userData = {
        origY: mesh.position.y,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      };

      nodeGroup.add(mesh);
      nodes.push(mesh);
    }

    // 4. Connecting Graph Edges with low opacity
    const maxDistance = 5.2;
    const linePositions = [];
    const lineColors = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < maxDistance) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );

          const c1 = brandColors[i % brandColors.length];
          const c2 = brandColors[j % brandColors.length];
          lineColors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.16, // lowered opacity as requested
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    nodeGroup.add(lines);

    // 5. Ambient Wireframe Crystals
    const crystalGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const crystalMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.set(-8, 3, -3);
    scene.add(crystal);

    const octaGeo = new THREE.OctahedronGeometry(1.3, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const octa = new THREE.Mesh(octaGeo, octaMat);
    octa.position.set(8, -2, -2);
    scene.add(octa);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 6. Infinite, Smooth Continuous Animation (No mouse dependency)
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Constant, gentle, infinite ambient orbit
      nodeGroup.rotation.y = elapsedTime * 0.04;
      nodeGroup.rotation.x = Math.sin(elapsedTime * 0.03) * 0.08;

      crystal.rotation.x = elapsedTime * 0.08;
      crystal.rotation.y = elapsedTime * 0.1;

      octa.rotation.x = -elapsedTime * 0.07;
      octa.rotation.z = elapsedTime * 0.09;

      // Subtle gentle vertical float
      nodes.forEach((node) => {
        node.position.y = node.userData.origY + Math.sin(elapsedTime * node.userData.speed + node.userData.phase) * 0.22;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        opacity, // low subtle opacity as requested
      }}
    />
  );
}
