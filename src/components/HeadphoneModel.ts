import * as THREE from 'three';

export interface HeadphonePartConfig {
  name: string;
  group: THREE.Group;
  assembledPos: THREE.Vector3;
  assembledRot: THREE.Euler;
  explodedPos: THREE.Vector3;
  explodedRot: THREE.Euler;
  chapterId: string;
  label: string;
}

export interface HeadphoneAssembly {
  root: THREE.Group;
  parts: HeadphonePartConfig[];
  leaderLines: THREE.LineSegments;
  update: (progress: number, time: number, hoveredPart: string | null) => void;
  dispose: () => void;
}

export function createHeadphone(): HeadphoneAssembly {
  const root = new THREE.Group();
  root.name = 'headphone_root';

  // Materials
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x22242a,
    metalness: 0.88,
    roughness: 0.28,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xd6d8de,
    metalness: 0.95,
    roughness: 0.18,
  });

  const leatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x121316,
    roughness: 0.85,
    metalness: 0.12,
  });

  const rubyGlowMaterial = new THREE.MeshStandardMaterial({
    color: 0xe11d48,
    emissive: 0x9f1239,
    emissiveIntensity: 0.65,
    roughness: 0.3,
    metalness: 0.4,
  });

  const meshGrillMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1c22,
    metalness: 0.6,
    roughness: 0.5,
    wireframe: true,
  });

  const goldCircuitMaterial = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.9,
    roughness: 0.25,
    emissive: 0x78350f,
    emissiveIntensity: 0.3,
  });

  // Track all disposables
  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [
    metalMaterial,
    chromeMaterial,
    leatherMaterial,
    rubyGlowMaterial,
    meshGrillMaterial,
    goldCircuitMaterial,
  ];

  // Helper to create a single ear cup assembly
  function createEarCup(isLeft: boolean): THREE.Group {
    const cupGroup = new THREE.Group();
    cupGroup.name = isLeft ? 'left_ear_cup' : 'right_ear_cup';
    const sign = isLeft ? -1 : 1;

    // 1. Outer Cup Shell (chamfered cylinder)
    const shellGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.65, 48);
    shellGeo.rotateZ(Math.PI / 2);
    const shellMesh = new THREE.Mesh(shellGeo, metalMaterial);
    cupGroup.add(shellMesh);
    disposables.push(shellGeo);

    // Outer decorative chamfer bevel ring
    const bevelGeo = new THREE.TorusGeometry(1.23, 0.05, 16, 48);
    bevelGeo.rotateY(Math.PI / 2);
    const bevelMesh = new THREE.Mesh(bevelGeo, chromeMaterial);
    cupGroup.add(bevelMesh);
    disposables.push(bevelGeo);

    // Outer Backplate Disk with Ruby Accent Ring
    const backplateGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.08, 36);
    backplateGeo.rotateZ(Math.PI / 2);
    const backplateMesh = new THREE.Mesh(backplateGeo, metalMaterial);
    backplateMesh.position.set(sign * 0.32, 0, 0);
    cupGroup.add(backplateMesh);
    disposables.push(backplateGeo);

    const rubyRingGeo = new THREE.TorusGeometry(0.86, 0.035, 16, 36);
    rubyRingGeo.rotateY(Math.PI / 2);
    const rubyRing = new THREE.Mesh(rubyRingGeo, rubyGlowMaterial);
    rubyRing.position.set(sign * 0.33, 0, 0);
    cupGroup.add(rubyRing);
    disposables.push(rubyRingGeo);

    // 2. Ear Cushion (Protein leather contoured torus facing inward)
    const cushionGeo = new THREE.TorusGeometry(1.05, 0.32, 24, 48);
    cushionGeo.rotateY(Math.PI / 2);
    const cushionMesh = new THREE.Mesh(cushionGeo, leatherMaterial);
    cushionMesh.position.set(-sign * 0.22, 0, 0);
    cupGroup.add(cushionMesh);
    disposables.push(cushionGeo);

    // 3. Acoustic Mesh Grill & Planar Baffle
    const grillGeo = new THREE.CircleGeometry(0.88, 32);
    grillGeo.rotateY(sign > 0 ? -Math.PI / 2 : Math.PI / 2);
    const grillMesh = new THREE.Mesh(grillGeo, meshGrillMaterial);
    grillMesh.position.set(-sign * 0.15, 0, 0);
    cupGroup.add(grillMesh);
    disposables.push(grillGeo);

    // 4. Aluminum Gimbal / Yoke Fork holding the cup
    const yokeGroup = new THREE.Group();
    const yokeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sign * 0.05, -1.35, 0),
      new THREE.Vector3(sign * 0.45, -0.7, 0),
      new THREE.Vector3(sign * 0.45, 0.7, 0),
      new THREE.Vector3(sign * 0.05, 1.35, 0),
    ]);
    const yokeGeo = new THREE.TubeGeometry(yokeCurve, 32, 0.065, 12, false);
    const yokeMesh = new THREE.Mesh(yokeGeo, chromeMaterial);
    yokeGroup.add(yokeMesh);
    disposables.push(yokeGeo);

    // Pivot Pins
    const pinGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 16);
    pinGeo.rotateX(Math.PI / 2);
    const pinTop = new THREE.Mesh(pinGeo, metalMaterial);
    pinTop.position.set(sign * 0.05, 1.35, 0);
    const pinBottom = new THREE.Mesh(pinGeo, metalMaterial);
    pinBottom.position.set(sign * 0.05, -1.35, 0);
    yokeGroup.add(pinTop, pinBottom);
    disposables.push(pinGeo);

    // Stem Mount to Headband
    const stemGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.65, 16);
    const stemMesh = new THREE.Mesh(stemGeo, chromeMaterial);
    stemMesh.position.set(sign * 0.45, 1.3, 0);
    stemMesh.rotation.z = -sign * 0.2;
    yokeGroup.add(stemMesh);
    disposables.push(stemGeo);

    cupGroup.add(yokeGroup);

    return cupGroup;
  }

  // Helper to create Headband assembly
  function createHeadband(): THREE.Group {
    const headbandGroup = new THREE.Group();
    headbandGroup.name = 'headband_assembly';

    // 1. Spring Steel Outer Arch
    const archCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.95, 0.6, 0),
      new THREE.Vector3(-1.6, 1.8, 0),
      new THREE.Vector3(0, 2.45, 0),
      new THREE.Vector3(1.6, 1.8, 0),
      new THREE.Vector3(1.95, 0.6, 0),
    ]);
    const archGeo = new THREE.TubeGeometry(archCurve, 64, 0.12, 16, false);
    const archMesh = new THREE.Mesh(archGeo, metalMaterial);
    headbandGroup.add(archMesh);
    disposables.push(archGeo);

    // 2. Leather Cushion Pad Underneath
    const cushionCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.45, 1.6, 0),
      new THREE.Vector3(-0.8, 2.2, 0),
      new THREE.Vector3(0, 2.33, 0),
      new THREE.Vector3(0.8, 2.2, 0),
      new THREE.Vector3(1.45, 1.6, 0),
    ]);
    const cushionPadGeo = new THREE.TubeGeometry(cushionCurve, 40, 0.16, 16, false);
    const cushionPadMesh = new THREE.Mesh(cushionPadGeo, leatherMaterial);
    headbandGroup.add(cushionPadMesh);
    disposables.push(cushionPadGeo);

    // 3. Sliding adjustment blocks with engraved tick marks
    const sliderGeo = new THREE.BoxGeometry(0.24, 0.55, 0.22);
    const leftSlider = new THREE.Mesh(sliderGeo, chromeMaterial);
    leftSlider.position.set(-1.85, 0.85, 0);
    leftSlider.rotation.z = -0.45;

    const rightSlider = new THREE.Mesh(sliderGeo, chromeMaterial);
    rightSlider.position.set(1.85, 0.85, 0);
    rightSlider.rotation.z = 0.45;

    headbandGroup.add(leftSlider, rightSlider);
    disposables.push(sliderGeo);

    // Laser Ruby Top Identity Dot
    const crownDotGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const crownDot = new THREE.Mesh(crownDotGeo, rubyGlowMaterial);
    crownDot.position.set(0, 2.6, 0);
    headbandGroup.add(crownDot);
    disposables.push(crownDotGeo);

    return headbandGroup;
  }

  // Helper to create Central Core / Acoustic DSP Processor
  function createCentralCore(): THREE.Group {
    const coreGroup = new THREE.Group();
    coreGroup.name = 'central_core_dsp';

    // Octagonal DSP Engine casing
    const coreChassisGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.35, 8);
    coreChassisGeo.rotateX(Math.PI / 2);
    const coreChassis = new THREE.Mesh(coreChassisGeo, metalMaterial);
    coreGroup.add(coreChassis);
    disposables.push(coreChassisGeo);

    // Gold Circuit Wafer
    const circuitGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.04, 32);
    circuitGeo.rotateX(Math.PI / 2);
    const circuitMesh = new THREE.Mesh(circuitGeo, goldCircuitMaterial);
    circuitMesh.position.set(0, 0, 0.18);
    coreGroup.add(circuitMesh);
    disposables.push(circuitGeo);

    // Center Ruby Optical Sensor
    const eyeGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.08, 24);
    eyeGeo.rotateX(Math.PI / 2);
    const eyeMesh = new THREE.Mesh(eyeGeo, rubyGlowMaterial);
    eyeMesh.position.set(0, 0, 0.21);
    coreGroup.add(eyeMesh);
    disposables.push(eyeGeo);

    // Floating Stator Array Ring
    const statorGeo = new THREE.TorusGeometry(0.78, 0.04, 16, 32);
    const statorMesh = new THREE.Mesh(statorGeo, chromeMaterial);
    statorMesh.position.set(0, 0, 0.1);
    coreGroup.add(statorMesh);
    disposables.push(statorGeo);

    return coreGroup;
  }

  // Helper to create Internal Precision Audio Components
  function createInternalComponents(): THREE.Group {
    const internalsGroup = new THREE.Group();
    internalsGroup.name = 'internal_components';

    // Neodymium Ring Magnet
    const magnetGeo = new THREE.TorusGeometry(0.68, 0.12, 16, 36);
    magnetGeo.rotateY(Math.PI / 2);
    const magnetMesh = new THREE.Mesh(magnetGeo, metalMaterial);
    internalsGroup.add(magnetMesh);
    disposables.push(magnetGeo);

    // Copper Voice Coil
    const coilGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.25, 32, 1, true);
    coilGeo.rotateZ(Math.PI / 2);
    const coilMesh = new THREE.Mesh(coilGeo, goldCircuitMaterial);
    internalsGroup.add(coilMesh);
    disposables.push(coilGeo);

    // Planar Diaphragm Foil
    const foilGeo = new THREE.RingGeometry(0.15, 0.6, 32);
    foilGeo.rotateY(Math.PI / 2);
    const foilMesh = new THREE.Mesh(foilGeo, chromeMaterial);
    foilMesh.position.set(0.08, 0, 0);
    internalsGroup.add(foilMesh);
    disposables.push(foilGeo);

    // Micro LED indicator
    const ledGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const ledMesh = new THREE.Mesh(ledGeo, rubyGlowMaterial);
    ledMesh.position.set(0.12, 0.35, 0);
    internalsGroup.add(ledMesh);
    disposables.push(ledGeo);

    return internalsGroup;
  }

  // Helper to create Lower Audio Cable & Balanced Pentaconn Connector
  function createLowerConnector(): THREE.Group {
    const lowerGroup = new THREE.Group();
    lowerGroup.name = 'lower_connector';

    // Pentaconn 4.4mm balanced plug barrel
    const barrelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.85, 24);
    const barrelMesh = new THREE.Mesh(barrelGeo, metalMaterial);
    lowerGroup.add(barrelMesh);
    disposables.push(barrelGeo);

    // Knurled grip rings
    const gripGeo = new THREE.TorusGeometry(0.19, 0.02, 16, 24);
    gripGeo.rotateX(Math.PI / 2);
    const grip1 = new THREE.Mesh(gripGeo, rubyGlowMaterial);
    grip1.position.set(0, 0.18, 0);
    const grip2 = new THREE.Mesh(gripGeo, chromeMaterial);
    grip2.position.set(0, -0.05, 0);
    lowerGroup.add(grip1, grip2);
    disposables.push(gripGeo);

    // Gold Pin tip
    const pinGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.45, 16);
    const pinMesh = new THREE.Mesh(pinGeo, goldCircuitMaterial);
    pinMesh.position.set(0, 0.55, 0);
    lowerGroup.add(pinMesh);
    disposables.push(pinGeo);

    // Flexible cable boot
    const bootGeo = new THREE.ConeGeometry(0.16, 0.4, 16);
    bootGeo.rotateZ(Math.PI);
    const bootMesh = new THREE.Mesh(bootGeo, leatherMaterial);
    bootMesh.position.set(0, -0.55, 0);
    lowerGroup.add(bootMesh);
    disposables.push(bootGeo);

    return lowerGroup;
  }

  // Instantiate all parts
  const leftCup = createEarCup(true);
  const rightCup = createEarCup(false);
  const headband = createHeadband();
  const centralCore = createCentralCore();
  const internals = createInternalComponents();
  const lowerConnector = createLowerConnector();

  root.add(leftCup, rightCup, headband, centralCore, internals, lowerConnector);

  // Configure assembled and exploded transformation targets
  // CRITICAL REQUIREMENT: The headphone must ALWAYS begin as a fully assembled object.
  // When progress = 0: All parts are seamlessly united into one complete closed headphone.
  const parts: HeadphonePartConfig[] = [
    {
      name: 'left_ear_cup',
      group: leftCup,
      // Assembled: Left cup snug against ear
      assembledPos: new THREE.Vector3(-1.75, 0, 0),
      assembledRot: new THREE.Euler(0, 0, 0),
      // Exploded: Moves outward to the left and tilts to reveal inner driver
      explodedPos: new THREE.Vector3(-3.85, -0.15, 0.3),
      explodedRot: new THREE.Euler(0.08, 0.45, 0.12),
      chapterId: 'openingCredits',
      label: 'LEFT EAR CUP // ACT I: IDENTITY',
    },
    {
      name: 'right_ear_cup',
      group: rightCup,
      // Assembled: Right cup snug against ear
      assembledPos: new THREE.Vector3(1.75, 0, 0),
      assembledRot: new THREE.Euler(0, 0, 0),
      // Exploded: Moves outward to the right and tilts
      explodedPos: new THREE.Vector3(3.85, -0.15, 0.3),
      explodedRot: new THREE.Euler(0.08, -0.45, -0.12),
      chapterId: 'directorsStatement',
      label: "RIGHT EAR CUP // DIRECTOR'S CUT",
    },
    {
      name: 'headband',
      group: headband,
      // Assembled: Arch sitting right on top of the cups
      assembledPos: new THREE.Vector3(0, 0, 0),
      assembledRot: new THREE.Euler(0, 0, 0),
      // Exploded: Moves upward and angles back
      explodedPos: new THREE.Vector3(0, 3.25, -0.35),
      explodedRot: new THREE.Euler(-0.25, 0, 0),
      chapterId: 'education',
      label: 'HEADBAND ARCH // EDUCATION FILMOGRAPHY',
    },
    {
      name: 'central_core',
      group: centralCore,
      // Assembled: Tucked right into the acoustic center
      assembledPos: new THREE.Vector3(0, 0, 0),
      assembledRot: new THREE.Euler(0, 0, 0),
      // Exploded: Moves forward into prominent feature spot
      explodedPos: new THREE.Vector3(0, 0.1, 2.4),
      explodedRot: new THREE.Euler(0.05, 0, 0),
      chapterId: 'featureProject',
      label: 'CORE DSP ENGINE // FEATURE PROJECT',
    },
    {
      name: 'internals',
      group: internals,
      // Assembled: Inside the driver cavity
      assembledPos: new THREE.Vector3(-0.6, 0, 0),
      assembledRot: new THREE.Euler(0, 0, 0),
      // Exploded: Angles outward to display precision mechanics
      explodedPos: new THREE.Vector3(-1.8, -1.9, 1.3),
      explodedRot: new THREE.Euler(0.3, 0.25, -0.1),
      chapterId: 'technical',
      label: 'ACOUSTIC DRIVER MATRIX // TECHNICAL & AI',
    },
    {
      name: 'lower_connector',
      group: lowerConnector,
      // Assembled: Docked cleanly at the lower left base
      assembledPos: new THREE.Vector3(-1.3, -1.2, 0),
      assembledRot: new THREE.Euler(0, 0, -0.35),
      // Exploded: Disconnects and moves down
      explodedPos: new THREE.Vector3(0, -2.7, 0.5),
      explodedRot: new THREE.Euler(0.2, 0, 0),
      chapterId: 'certifications',
      label: 'BALANCED TERMINAL // CERTIFICATIONS',
    },
  ];

  // Set initial assembled positions
  parts.forEach((p) => {
    p.group.position.copy(p.assembledPos);
    p.group.rotation.copy(p.assembledRot);
  });

  // Holographic Engineering Leader Lines (connecting exploded parts back to center)
  const lineCount = parts.length;
  const linePositions = new Float32Array(lineCount * 2 * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

  const lineMat = new THREE.LineBasicMaterial({
    color: 0xe11d48,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
  });
  disposables.push(lineGeo, lineMat);

  const leaderLines = new THREE.LineSegments(lineGeo, lineMat);
  root.add(leaderLines);

  // Update function per frame
  const update = (progress: number, time: number, hoveredPart: string | null) => {
    // Smooth cubic easing
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const positionsAttr = lineGeo.attributes.position as THREE.BufferAttribute;

    parts.forEach((p, idx) => {
      // Interpolate position
      p.group.position.lerpVectors(p.assembledPos, p.explodedPos, eased);

      // Interpolate rotation
      p.group.rotation.x = THREE.MathUtils.lerp(p.assembledRot.x, p.explodedRot.x, eased);
      p.group.rotation.y = THREE.MathUtils.lerp(p.assembledRot.y, p.explodedRot.y, eased);
      p.group.rotation.z = THREE.MathUtils.lerp(p.assembledRot.z, p.explodedRot.z, eased);

      // Floating kinetic breathing when exploded
      if (eased > 0.05) {
        const floatOffset = Math.sin(time * 1.5 + idx * 1.2) * 0.05 * eased;
        p.group.position.y += floatOffset;
      }

      // Subtle scale pop if hovered
      const isHovered = hoveredPart === p.name;
      const targetScale = isHovered && eased > 0.4 ? 1.05 : 1.0;
      p.group.scale.setScalar(THREE.MathUtils.lerp(p.group.scale.x, targetScale, 0.15));

      // Update leader line points
      const baseIdx = idx * 6;
      // Line starts at origin / center
      positionsAttr.setXYZ(baseIdx, 0, 0, 0);
      // Line ends at current part position
      positionsAttr.setXYZ(
        baseIdx + 3,
        p.group.position.x,
        p.group.position.y,
        p.group.position.z
      );
    });

    positionsAttr.needsUpdate = true;
    lineMat.opacity = eased * 0.45;
  };

  const dispose = () => {
    disposables.forEach((item) => item.dispose());
  };

  return {
    root,
    parts,
    leaderLines,
    update,
    dispose,
  };
}
