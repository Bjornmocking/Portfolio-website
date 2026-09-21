import React, { useEffect, useRef } from 'react';

/**
 * Scroll-scrubbed 3D intro: honderden deeltjes die van alle kanten komen
 * aanvliegen en samen een bol-vormig netwerk opbouwen (bolletjes + lijnen die
 * de bolletjes zelf verbinden). Blijft vastgepind ("sticky") terwijl je
 * scrolt; scrollpositie stuurt aan hoe ver de deeltjes al zijn aangekomen.
 * Pas als de vorm compleet is, scrolt de rest van de pagina normaal verder.
 *
 * Bekend patroon van bijv. Apple's productpagina's (AirPods, Vision Pro).
 */
export const Scroll3DIntro: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);

  // Scroll-voortgang bijhouden (0 = boven de sectie, 1 = volledig doorgescrold)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollableRange = wrapper.offsetHeight - window.innerHeight;
      const scrolledIntoWrapper = -rect.top;
      const progress =
        scrollableRange > 0 ? Math.min(1, Math.max(0, scrolledIntoWrapper / scrollableRange)) : 0;
      progressRef.current = progress;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js scene opzetten. three.js wordt dynamisch geladen (code-splitting)
  // zodat de rest van de site niet hoeft te wachten op deze zware library.
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import('three');
      if (cancelled) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        // Geen WebGL-ondersteuning: laat de sectie gewoon leeg/transparant, geen crash.
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 5;

      const setSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      setSize();

      // Deeltjes die van alle kanten aankomen en samen de vorm van een
      // icosaëder-bol opbouwen (bolletjes + lijnen die de bolletjes zelf
      // verbinden), in plaats van een kant-en-klare vaste vorm.
      const icoGeometry = new THREE.IcosahedronGeometry(1.4, 2);
      const wireGeometryForEdges = new THREE.WireframeGeometry(icoGeometry);
      const srcPos = icoGeometry.attributes.position;

      const keyOf = (x: number, y: number, z: number) => `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
      const indexByKey = new Map<string, number>();
      const targets: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i < srcPos.count; i += 1) {
        const x = srcPos.getX(i);
        const y = srcPos.getY(i);
        const z = srcPos.getZ(i);
        const key = keyOf(x, y, z);
        if (!indexByKey.has(key)) {
          indexByKey.set(key, targets.length);
          targets.push(new THREE.Vector3(x, y, z));
        }
      }
      const pointCount = targets.length;

      const wp = wireGeometryForEdges.attributes.position;
      const edgePairs: [number, number][] = [];
      for (let s = 0; s < wp.count; s += 2) {
        const k1 = keyOf(wp.getX(s), wp.getY(s), wp.getZ(s));
        const k2 = keyOf(wp.getX(s + 1), wp.getY(s + 1), wp.getZ(s + 1));
        const i1 = indexByKey.get(k1);
        const i2 = indexByKey.get(k2);
        if (i1 !== undefined && i2 !== undefined) edgePairs.push([i1, i2]);
      }

      const starts: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i < pointCount; i += 1) {
        starts.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          )
        );
      }
      const current = starts.map((v) => v.clone());

      const dotPositions = new Float32Array(pointCount * 3);
      const dotGeometry = new THREE.BufferGeometry();
      dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
      const dotMaterial = new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 0.05,
        transparent: true,
        opacity: 0,
      });
      const dots = new THREE.Points(dotGeometry, dotMaterial);
      scene.add(dots);

      const edgeLinePositions = new Float32Array(edgePairs.length * 6);
      const edgeLineGeometry = new THREE.BufferGeometry();
      edgeLineGeometry.setAttribute('position', new THREE.BufferAttribute(edgeLinePositions, 3));
      const edgeLineMaterial = new THREE.LineBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0,
      });
      const edgeLines = new THREE.LineSegments(edgeLineGeometry, edgeLineMaterial);
      scene.add(edgeLines);

      const particleGroup = new THREE.Group();
      particleGroup.add(dots);
      particleGroup.add(edgeLines);
      scene.add(particleGroup);

      // Subtiele sterrenveld-achtergrond voor extra diepte.
      const starCount = 200;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i += 1) {
        starPositions[i * 3] = (Math.random() - 0.5) * 12;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      const starMaterial = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 0.015,
        transparent: true,
        opacity: 0,
      });
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const pointLight = new THREE.PointLight(0x60a5fa, 1.4);
      pointLight.position.set(2, 2, 3);
      scene.add(pointLight);

      let rafId: number;
      const animate = () => {
        const progress = prefersReducedMotion ? 1 : progressRef.current;

        for (let i = 0; i < pointCount; i += 1) {
          current[i].lerpVectors(starts[i], targets[i], progress);
          dotPositions[i * 3] = current[i].x;
          dotPositions[i * 3 + 1] = current[i].y;
          dotPositions[i * 3 + 2] = current[i].z;
        }
        dotGeometry.attributes.position.needsUpdate = true;

        for (let j = 0; j < edgePairs.length; j += 1) {
          const pa = current[edgePairs[j][0]];
          const pb = current[edgePairs[j][1]];
          const o = j * 6;
          edgeLinePositions[o] = pa.x;
          edgeLinePositions[o + 1] = pa.y;
          edgeLinePositions[o + 2] = pa.z;
          edgeLinePositions[o + 3] = pb.x;
          edgeLinePositions[o + 4] = pb.y;
          edgeLinePositions[o + 5] = pb.z;
        }
        edgeLineGeometry.attributes.position.needsUpdate = true;

        particleGroup.rotation.y = progress * Math.PI * 1.2;
        dotMaterial.opacity = Math.min(1, progress / 0.25) * 0.9;
        edgeLineMaterial.opacity = Math.max(0, (progress - 0.35) / 0.65) * 0.55;

        // Vervagen in van het sterrenveld tijdens de eerste helft van de scroll-range.
        starMaterial.opacity = Math.min(1, progress / 0.5) * 0.5;

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      const handleResize = () => setSize();
      window.addEventListener('resize', handleResize);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', handleResize);
        icoGeometry.dispose();
        wireGeometryForEdges.dispose();
        dotGeometry.dispose();
        edgeLineGeometry.dispose();
        starGeometry.dispose();
        dotMaterial.dispose();
        edgeLineMaterial.dispose();
        starMaterial.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={wrapperRef} id="scroll-3d-intro" className="relative bg-neutral-950" style={{ height: '220vh' }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="relative z-10 px-4 text-center pointer-events-none">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-blue-400 sm:text-sm">
            Minor Portfolio
          </p>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Futureproof met AI!
          </h1>
        </div>
      </div>
    </div>
  );
};
