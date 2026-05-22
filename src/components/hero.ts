import * as THREE from 'three'

export function initHero(): void {
  if (window.matchMedia('(max-width: 860px)').matches) return

  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement | null
  if (!canvas) return
  const canvasEl = canvas

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
  camera.position.set(0, 1.4, 5)

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  scene.add(new THREE.AmbientLight(0xffffff, 0.35))

  const mainLight = new THREE.SpotLight(0xffc88d, 1.5, 24, Math.PI * 0.20, 0.2, 1)
  mainLight.position.set(3.5, 4.2, 3)
  mainLight.castShadow = true
  mainLight.shadow.mapSize.set(1024, 1024)
  scene.add(mainLight)

  const accentLight = new THREE.PointLight(0xffd8a8, 0.55, 16)
  accentLight.position.set(-3.2, 1.8, 2.8)
  scene.add(accentLight)

  const accentBubble = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 32, 32),
    new THREE.MeshPhysicalMaterial({
      color: 0xffd8b1, metalness: 0.05, roughness: 0.14,
      transmission: 0.7, thickness: 1.2, transparent: true, opacity: 0.92,
      clearcoat: 0.8, clearcoatRoughness: 0.14,
      emissive: 0xffc8a4, emissiveIntensity: 0.28
    })
  )
  accentBubble.position.set(1.8, 0.7, -0.8)
  scene.add(accentBubble)

  const sculpture = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.1, 0.32, 160, 24),
    new THREE.MeshPhysicalMaterial({
      color: 0xB8712A, metalness: 0.45, roughness: 0.18,
      clearcoat: 0.8, clearcoatRoughness: 0.12, reflectivity: 0.8,
      transmission: 0.08, thickness: 0.6, envMapIntensity: 1.2,
      ior: 1.4, sheen: 0.2, sheenColor: new THREE.Color(0xCD8E42)
    })
  )
  sculpture.castShadow = true
  sculpture.receiveShadow = true
  sculpture.rotation.set(0.25, 0.75, 0)
  scene.add(sculpture)

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.75, 0.03, 40, 120),
    new THREE.MeshStandardMaterial({ color: 0xf0f4ff, metalness: 0.3, roughness: 0.15, transparent: true, opacity: 0.55 })
  )
  ring.rotation.x = Math.PI / 2
  ring.position.y = 0.15
  scene.add(ring)

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShadowMaterial({ opacity: 0.18 })
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -1.25
  floor.receiveShadow = true
  scene.add(floor)

  function resize(): void {
    const width = canvasEl.clientWidth
    const height = canvasEl.clientHeight
    if (canvasEl.width !== width || canvasEl.height !== height) {
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
  }

  function animate(time: number): void {
    const s = time * 0.001
    sculpture.rotation.y = s * 0.18
    sculpture.rotation.x = 0.25 + Math.sin(s * 0.4) * 0.08
    sculpture.position.y = Math.sin(s * 0.6) * 0.06
    ring.rotation.z = s * 0.18
    accentBubble.position.x = 1.8 + Math.sin(s * 1.2) * 0.28
    accentBubble.position.y = 0.7 + Math.sin(s * 1.5) * 0.12
    accentBubble.scale.setScalar(0.96 + Math.sin(s * 1.8) * 0.04)
    mainLight.position.x = 3.5 + Math.sin(s * 0.7) * 0.35
    mainLight.position.y = 4.2 + Math.cos(s * 0.55) * 0.2
    accentLight.position.x = -3.2 + Math.cos(s * 0.9) * 0.45
    resize()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  window.addEventListener('resize', resize)
  requestAnimationFrame(animate)
}

// ── CS Logo 3D rotating render ──────────────────────────────────────────────
export function initLogoCanvas(): void {
  console.log('[logo] initLogoCanvas called')
  if (window.matchMedia('(max-width: 860px)').matches) {
    console.log('[logo] skipped: mobile')
    return
  }
  const canvas = document.getElementById('logo-canvas') as HTMLCanvasElement | null
  console.log('[logo] canvas element:', canvas)
  if (!canvas) return
  setTimeout(() => _setupLogoCanvas(canvas), 200)
}

function _setupLogoCanvas(canvas: HTMLCanvasElement): void {
  const w = canvas.offsetWidth  || 300
  const h = canvas.offsetHeight || 300
  console.log('[logo-canvas] size:', w, h)

  const scene = new THREE.Scene()
  const getWH = () => ({ w: canvas.offsetWidth || 300, h: canvas.offsetHeight || 300 })

  const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100)
  camera.position.set(0, 0, 6.2)

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.3

  scene.add(new THREE.AmbientLight(0xffffff, 0.22))
  const key = new THREE.DirectionalLight(0xfff6e8, 3.2)
  key.position.set(3, 5, 4)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xc8d4ff, 0.9)
  fill.position.set(-4, 0.5, 2)
  scene.add(fill)
  const rim = new THREE.DirectionalLight(0xffcc80, 1.6)
  rim.position.set(0.5, -4, -3)
  scene.add(rim)
  const top = new THREE.DirectionalLight(0xffffff, 1.0)
  top.position.set(0, 8, 2)
  scene.add(top)

  const steelMat = new THREE.MeshStandardMaterial({ color: 0x38393e, metalness: 0.96, roughness: 0.20 })
  const goldMat  = new THREE.MeshStandardMaterial({ color: 0xC4842A, metalness: 0.90, roughness: 0.10 })

  // C bracket
  const cShape = new THREE.Shape()
  cShape.moveTo( 0.58,  0.88)
  cShape.lineTo(-0.42,  0.88)
  cShape.lineTo(-0.88,  0.45)
  cShape.lineTo(-0.88, -0.45)
  cShape.lineTo(-0.42, -0.88)
  cShape.lineTo( 0.58, -0.88)
  cShape.closePath()
  const cHole = new THREE.Path()
  cHole.moveTo( 0.58,  0.50)
  cHole.lineTo(-0.20,  0.50)
  cHole.lineTo(-0.52,  0.22)
  cHole.lineTo(-0.52, -0.22)
  cHole.lineTo(-0.20, -0.50)
  cHole.lineTo( 0.58, -0.50)
  cHole.closePath()
  cShape.holes.push(cHole)
  const cGeom = new THREE.ExtrudeGeometry(cShape, {
    depth: 0.24, bevelEnabled: true, bevelThickness: 0.055, bevelSize: 0.045, bevelSegments: 5
  })
  cGeom.translate(0.15, 0, -0.12)
  const cMesh = new THREE.Mesh(cGeom, steelMat)

  // Arrow
  const arrowShape = new THREE.Shape()
  arrowShape.moveTo( 0.13, -0.70)
  arrowShape.lineTo( 0.13,  0.18)
  arrowShape.lineTo( 0.42,  0.18)
  arrowShape.lineTo( 0.00,  0.78)
  arrowShape.lineTo(-0.42,  0.18)
  arrowShape.lineTo(-0.13,  0.18)
  arrowShape.lineTo(-0.13, -0.70)
  arrowShape.closePath()
  const arrowGeom = new THREE.ExtrudeGeometry(arrowShape, {
    depth: 0.30, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 5
  })
  arrowGeom.translate(0, -0.04, -0.15)
  const arrowMesh = new THREE.Mesh(arrowGeom, goldMat)
  arrowMesh.rotation.z = -Math.PI / 4
  arrowMesh.position.set(0.30, -0.08, 0.20)

  // S tail
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3( 0.60, -0.62, 0.15),
    new THREE.Vector3( 0.50, -0.86, 0.15),
    new THREE.Vector3( 0.30, -1.04, 0.15),
    new THREE.Vector3( 0.06, -1.14, 0.15),
    new THREE.Vector3(-0.18, -1.10, 0.15),
    new THREE.Vector3(-0.32, -1.24, 0.15),
    new THREE.Vector3(-0.18, -1.42, 0.15),
    new THREE.Vector3( 0.08, -1.50, 0.15),
  ])
  const tailMesh = new THREE.Mesh(
    new THREE.TubeGeometry(tailCurve, 40, 0.092, 10, false),
    goldMat
  )

  const logoGroup = new THREE.Group()
  logoGroup.add(cMesh, arrowMesh, tailMesh)
  logoGroup.position.set(0, 0.40, 0)
  scene.add(logoGroup)

  const el = canvas

  function resize(): void {
    const { w, h } = getWH()
    if (el.width !== w || el.height !== h) {
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
  }

  function animate(t: number): void {
    const s = t * 0.001
    logoGroup.rotation.y = s * 0.55
    logoGroup.rotation.x = Math.sin(s * 0.38) * 0.07
    resize()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  window.addEventListener('resize', resize)
  requestAnimationFrame(animate)
}
