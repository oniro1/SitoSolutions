import * as THREE from 'three'

export function initHero(): void {
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

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.35)
  scene.add(ambientLight)

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
      color: 0xffd8b1,
      metalness: 0.05,
      roughness: 0.14,
      transmission: 0.7,
      thickness: 1.2,
      transparent: true,
      opacity: 0.92,
      clearcoat: 0.8,
      clearcoatRoughness: 0.14,
      emissive: 0xffc8a4,
      emissiveIntensity: 0.28
    })
  )
  accentBubble.position.set(1.8, 0.7, -0.8)
  scene.add(accentBubble)

  const geometry = new THREE.TorusKnotGeometry(1.1, 0.32, 160, 24)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.18,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    reflectivity: 1.0,
    transmission: 0.22,
    thickness: 0.8,
    envMapIntensity: 1.4,
    ior: 1.6,
    sheen: 0.15,
    sheenColor: new THREE.Color(0xe8f0ff)
  })

  const sculpture = new THREE.Mesh(geometry, material)
  sculpture.castShadow = true
  sculpture.receiveShadow = true
  sculpture.rotation.set(0.25, 0.75, 0)
  scene.add(sculpture)

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.75, 0.03, 40, 120),
    new THREE.MeshStandardMaterial({
      color: 0xf0f4ff,
      metalness: 0.3,
      roughness: 0.15,
      transparent: true,
      opacity: 0.55
    })
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
    const seconds = time * 0.001
    sculpture.rotation.y = seconds * 0.18
    sculpture.rotation.x = 0.25 + Math.sin(seconds * 0.4) * 0.08
    sculpture.position.y = Math.sin(seconds * 0.6) * 0.06
    ring.rotation.z = seconds * 0.18
    accentBubble.position.x = 1.8 + Math.sin(seconds * 1.2) * 0.28
    accentBubble.position.y = 0.7 + Math.sin(seconds * 1.5) * 0.12
    accentBubble.scale.setScalar(0.96 + Math.sin(seconds * 1.8) * 0.04)
    mainLight.position.x = 3.5 + Math.sin(seconds * 0.7) * 0.35
    mainLight.position.y = 4.2 + Math.cos(seconds * 0.55) * 0.2
    accentLight.position.x = -3.2 + Math.cos(seconds * 0.9) * 0.45

    resize()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  window.addEventListener('resize', resize)
  requestAnimationFrame(animate)
}
