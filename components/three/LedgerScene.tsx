"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { makeBlockTexture } from "@/lib/blockTexture";
import { CHAIN_DEPTH } from "@/lib/data";

const GOLD = "#D8A945";
const TEAL = "#3FD8C4";
const INK = "#0A0E17";
const SLOTS = CHAIN_DEPTH;

/** Shared wireframe cage, hugging each block's shell. */
const CAGE = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.008, 1.008, 1.008));

/**
 * Position of a block at fractional slot t (0 = head, nearest the viewer).
 * The chain recedes up and to the right, clear of the headline and the stats.
 */
function slotPosition(t: number, out = new THREE.Vector3()) {
  // Lateral travel has to outrun the depth step, or perspective stacks the whole
  // chain behind the head block and only one cube is ever visible.
  return out.set(
    1.65 + t * 0.8 + Math.sin(t * 0.7) * 0.18,
    -0.15 + t * 0.42 + Math.cos(t * 0.6) * 0.16,
    -1.0 - t * 1.0
  );
}

function slotScale(t: number) {
  return Math.max(0.2, 1 - t * 0.045);
}

type BlockRecord = {
  seed: number;
  /** Integer slot the block is settling toward. */
  target: number;
  /** Live fractional slot, damped toward `target` each frame. */
  slotRef: { current: number };
  /** 0 → 1 as a freshly mined block materializes. */
  birthRef: { current: number };
};

/**
 * `record` is mutated in place by the parent's frame loop when a block is
 * recycled, so this component never re-renders. Everything that can change —
 * including the face texture — has to be read and applied here, per frame.
 */
function Block({ record }: { record: BlockRecord }) {
  const group = useRef<THREE.Group>(null);
  const shellMat = useRef<THREE.MeshStandardMaterial>(null);
  const cageMat = useRef<THREE.LineBasicMaterial>(null);

  const pos = useMemo(() => new THREE.Vector3(), []);
  const texture = useRef<THREE.CanvasTexture>(makeBlockTexture(record.seed));
  const appliedSeed = useRef(-1);

  useEffect(() => {
    const tex = texture;
    return () => tex.current?.dispose();
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const { seed, slotRef, birthRef } = record;
    const t = slotRef.current;
    const birth = birthRef.current;

    // The block was recycled into a new height: redraw its face panel.
    if (seed !== appliedSeed.current) {
      appliedSeed.current = seed;
      const next = makeBlockTexture(seed);
      const previous = texture.current;
      texture.current = next;
      if (shellMat.current) {
        shellMat.current.map = next;
        shellMat.current.emissiveMap = next;
        shellMat.current.needsUpdate = true;
      }
      if (previous !== next) previous?.dispose();
    }

    g.position.copy(slotPosition(t, pos));

    // Ease-out-expo arrival, so a mined block lands with authority rather than drifting.
    const ease = 1 - Math.pow(2, -10 * Math.min(1, birth));
    g.scale.setScalar(Math.max(0.001, slotScale(t) * ease));
    g.rotation.y = -0.42 + t * 0.07 + (1 - ease) * 1.1;
    g.rotation.x = 0.16 + Math.sin(state.clock.elapsedTime * 0.3 + seed) * 0.03;

    // Depth is carried by scene fog, not by opacity — the shells stay opaque so
    // eight of them never have to sort against each other.
    const heat = Math.max(0, 1 - birth * 0.85); // newest block runs hot, then settles

    if (shellMat.current) shellMat.current.emissiveIntensity = 0.32 + heat * 0.85;
    if (cageMat.current) cageMat.current.opacity = 0.7 + heat * 0.3;
  });

  return (
    <group ref={group}>
      <RoundedBox args={[1, 1, 1]} radius={0.03} smoothness={2}>
        {/* The hex panel carries the colour and doubles as the emissive map, so
            the data lights itself. `color` stays white or the two multiply to black. */}
        <meshStandardMaterial
          ref={shellMat}
          map={texture.current}
          emissiveMap={texture.current}
          emissive="#ffffff"
          emissiveIntensity={0.32}
          color="#ffffff"
          metalness={0.1}
          roughness={0.62}
        />
      </RoundedBox>

      <lineSegments geometry={CAGE}>
        <lineBasicMaterial
          ref={cageMat}
          color={GOLD}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/** A confirmation pulse that travels head → tail each time a block is mined. */
function Pulse({ progressRef }: { progressRef: { current: number } }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const p = progressRef.current;
    if (!mesh.current || !mat.current) return;
    const live = p > 0 && p < 1;
    mesh.current.visible = live;
    if (!live) return;
    const t = p * (SLOTS - 1);
    mesh.current.position.copy(slotPosition(t, pos));
    mesh.current.scale.setScalar(slotScale(t) * (0.34 + (1 - p) * 0.24));
    mat.current.opacity = Math.sin(p * Math.PI);
  });

  return (
    <mesh ref={mesh} visible={false}>
      <sphereGeometry args={[1, 14, 14]} />
      <meshBasicMaterial ref={mat} color={TEAL} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

/** Hairline threaded through every slot, so the chain reads as one strand. */
function Links() {
  const line = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= SLOTS - 1; i += 0.25) pts.push(slotPosition(i));
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    return new THREE.Line(geo, mat);
  }, []);

  useEffect(
    () => () => {
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    },
    [line]
  );

  return <primitive object={line} />;
}

export type LedgerSceneProps = {
  /** Incremented by the parent on every mine tick. */
  headRef: { current: number };
  pointerRef: { current: { x: number; y: number } };
  /** 0 at the top of the hero, 1 once it has scrolled away. */
  scrollRef: { current: number };
};

/** Centre of the chain in its own local space, used to re-anchor it on mobile. */
const CHAIN_MID_X = 4.45;
const CHAIN_MID_Y = 1.3;
/** Where the chain should sit, in px from the top of the hero, on narrow screens. */
const MOBILE_BAND_CENTER_PX = 790;

export default function LedgerScene({ headRef, pointerRef, scrollRef }: LedgerSceneProps) {
  const rig = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  // On a phone the hero is a single column, so the chain cannot live off to the
  // right — it gets re-anchored into a band of its own below the buttons.
  const narrow = size.width < 768;
  const halfHeight = Math.tan((42 * Math.PI) / 360) * 8.4;
  const anchor = narrow
    ? {
        x: -CHAIN_MID_X + 0.95,
        y: (0.5 - MOBILE_BAND_CENTER_PX / size.height) * 2 * halfHeight - CHAIN_MID_Y,
        scale: 0.62,
      }
    : { x: 0, y: 0, scale: 1 };

  // One persistent record per visible slot, recycled as the chain advances.
  const blocks = useMemo<BlockRecord[]>(
    () =>
      Array.from({ length: SLOTS }, (_, i) => ({
        // Slot 0 is the newest block, so it carries the highest seed.
        seed: SLOTS - 1 - i,
        target: i,
        slotRef: { current: i },
        birthRef: { current: 1 },
      })),
    []
  );
  const pulseRef = useRef(0);
  const lastHead = useRef(headRef.current);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);

    // A block was mined: the tail falls off the end and is recycled as the new head.
    if (headRef.current !== lastHead.current) {
      lastHead.current = headRef.current;
      let tail = blocks[0];
      for (const b of blocks) if (b.target > tail.target) tail = b;
      for (const b of blocks) if (b !== tail) b.target += 1;
      tail.target = 0;
      tail.seed = SLOTS - 1 + headRef.current; // keeps block heights monotonic
      tail.slotRef.current = -1.4; // flies in from in front of the camera
      tail.birthRef.current = 0;
      pulseRef.current = 0.001;
    }

    for (const b of blocks) {
      b.slotRef.current = THREE.MathUtils.damp(b.slotRef.current, b.target, 5, d);
      if (b.birthRef.current < 1) b.birthRef.current = Math.min(1, b.birthRef.current + d * 1.35);
    }

    if (pulseRef.current > 0) {
      pulseRef.current += d * 0.85;
      if (pulseRef.current >= 1) pulseRef.current = 0;
    }

    if (!rig.current) return;
    const p = pointerRef.current;
    // Parallax, not orbit — the chain is an object on the page, not a toy to drag.
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, p.x * 0.3, 3, d);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, p.y * 0.2, 3, d);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, anchor.x, 3, d);
    rig.current.scale.setScalar(THREE.MathUtils.damp(rig.current.scale.x, anchor.scale, 3, d));
    rig.current.position.y = THREE.MathUtils.damp(
      rig.current.position.y,
      anchor.y + scrollRef.current * 1.6,
      3,
      d
    );

    // Scrolling out of the hero dollies the camera back, handing off to the timeline.
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 8.4 + scrollRef.current * 3.2, 3, d);
  });

  return (
    <>
      {/* Distance fade, so the tail dissolves into the page instead of piling up. */}
      <fog attach="fog" args={[INK, 10, 19]} />
      <group ref={rig}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} color="#fff6e0" />
        <directionalLight position={[-5, -2, 2]} intensity={0.7} color="#7fe8dc" />
        <pointLight position={[1.2, 0.5, 2.5]} intensity={30} color={GOLD} distance={12} decay={2} />
        <Links />
        <Pulse progressRef={pulseRef} />
        {blocks.map((b, i) => (
          <Block key={i} record={b} />
        ))}
      </group>
    </>
  );
}
