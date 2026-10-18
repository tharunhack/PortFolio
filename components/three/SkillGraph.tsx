"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = new THREE.Color("#D8A945");
const TEAL = new THREE.Color("#3FD8C4");

/** Evenly distributed points on a sphere — no clumping, no random reseeding. */
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return pts;
}

const NODE_GEOMETRY = new THREE.IcosahedronGeometry(1, 0);

function Cluster({
  center,
  nodeCount,
  active,
  anyActive,
}: {
  center: THREE.Vector3;
  nodeCount: number;
  active: boolean;
  anyActive: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => fibonacciSphere(nodeCount, 0.62), [nodeCount]);

  // One material per cluster, shared by every node in it, so a single lerp
  // lights the whole group at once.
  const nodeMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: GOLD.clone(), transparent: true, opacity: 0.6 }),
    []
  );

  const edges = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (const n of nodes) pts.push(new THREE.Vector3(), n);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: GOLD.clone(),
      transparent: true,
      opacity: 0.3,
    });
    return new THREE.LineSegments(geo, mat);
  }, [nodes]);

  useEffect(
    () => () => {
      nodeMat.dispose();
      edges.geometry.dispose();
      (edges.material as THREE.Material).dispose();
    },
    [nodeMat, edges]
  );

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const g = group.current;
    if (!g) return;

    g.rotation.y += d * (active ? 0.5 : 0.16);
    const want = active ? 1.28 : anyActive ? 0.84 : 1;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, want, 6, d));

    // Hovering one group dims the rest — the list and the graph say the same thing.
    // The dim floor stays high enough that the structure is still readable.
    const lit = active ? 1 : anyActive ? 0.42 : 0.72;
    const target = active ? TEAL : GOLD;

    nodeMat.opacity = THREE.MathUtils.damp(nodeMat.opacity, lit, 6, d);
    nodeMat.color.lerp(target, 1 - Math.exp(-6 * d));

    const edgeMat = edges.material as THREE.LineBasicMaterial;
    edgeMat.opacity = THREE.MathUtils.damp(edgeMat.opacity, lit * 0.42, 6, d);
    edgeMat.color.lerp(target, 1 - Math.exp(-6 * d));
  });

  return (
    <group ref={group} position={center}>
      <primitive object={edges} />
      {nodes.map((n, i) => (
        <mesh key={i} position={n} scale={0.1} geometry={NODE_GEOMETRY} material={nodeMat} />
      ))}
    </group>
  );
}

export default function SkillGraph({
  counts,
  activeIndex,
  pointerRef,
}: {
  counts: number[];
  activeIndex: number | null;
  pointerRef: { current: { x: number; y: number } };
}) {
  const rig = useRef<THREE.Group>(null);
  const centers = useMemo(() => fibonacciSphere(counts.length, 1.95), [counts.length]);

  // Spokes from a single hub, not a loop through the clusters — the clusters have
  // no ring order, and drawing one invents a relationship that isn't there.
  const spine = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (const c of centers) pts.push(new THREE.Vector3(), c);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: "#2E3A56", transparent: true, opacity: 0.9 });
    return new THREE.LineSegments(geo, mat);
  }, [centers]);

  useEffect(
    () => () => {
      spine.geometry.dispose();
      (spine.material as THREE.Material).dispose();
    },
    [spine]
  );

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const g = rig.current;
    if (!g) return;
    g.rotation.y += d * 0.1;
    const p = pointerRef.current;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, p.y * 0.26, 3, d);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, p.x * 0.12, 3, d);
  });

  return (
    <group ref={rig}>
      <primitive object={spine} />
      {/* The hub the spokes actually meet at — one stack, six clusters. */}
      <mesh scale={0.14} geometry={NODE_GEOMETRY}>
        <meshBasicMaterial color="#D8A945" transparent opacity={0.85} />
      </mesh>
      {centers.map((c, i) => (
        <Cluster
          key={i}
          center={c}
          nodeCount={counts[i]}
          active={activeIndex === i}
          anyActive={activeIndex !== null}
        />
      ))}
    </group>
  );
}
