// ============================================================================
// ATW WEB FLOW: Bright & Sunny 3D World Engine - Three.js
// Features: Sunny Sky, Fluffy Clouds, Giant PC Browser, Tiny Courier Robot,
// DNS Tower, Rainbow Bridge, Server Kitchen, and API Waiter Drone
// ============================================================================

// Safe roundRect polyfill for canvas context across all browser engines
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (typeof r === 'undefined') r = 5;
        if (typeof r === 'number') r = [r, r, r, r];
        const [tl, tr, br, bl] = r.length === 1 ? [r[0], r[0], r[0], r[0]] : r;
        this.beginPath();
        this.moveTo(x + tl, y);
        this.lineTo(x + w - tr, y);
        this.quadraticCurveTo(x + w, y, x + w, y + tr);
        this.lineTo(x + w, y + h - br);
        this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
        this.lineTo(x + bl, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - bl);
        this.lineTo(x, y + tl);
        this.quadraticCurveTo(x, y, x + tl, y);
        this.closePath();
        return this;
    };
}

class CyberWorld {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.clock = new THREE.Clock();

        this.timeT = 0.0; // 0.0 to 1.0 (Outbound: 0.0 to 0.5, Return: 0.5 to 1.0)
        this.stations = {};
        this.rotators = [];
        this.blinkingLeds = [];
        this.clouds = [];

        // Interactive 3D Robot
        this.robot = null;
        this.robotLeftLeg = null;
        this.robotRightLeg = null;
        this.robotLeftArm = null;
        this.robotRightArm = null;
        this.robotGiftBox = null;

        // Spline Paths (Outbound & Return)
        this.splineOutbound = null;
        this.splineReturn = null;

        // Raycasting
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.clickableObjects = [];

        // Camera flight
        this.isFlyingCamera = false;
        this.camStartPos = new THREE.Vector3();
        this.camTargetPos = new THREE.Vector3();
        this.camLookStart = new THREE.Vector3();
        this.camLookTarget = new THREE.Vector3();
        this.camFlightProgress = 1.0;
        this.camFlightDuration = 1.2;
        this.followRobot = false;

        this.init();
    }

    init() {
        // 1. Scene with soft sunny sky blue
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xbfe6ff);
        this.scene.fog = new THREE.FogExp2(0xbfe6ff, 0.005);

        // 2. Camera setup focused on the Big PC
        this.camera = new THREE.PerspectiveCamera(
            50,
            this.container.clientWidth / this.container.clientHeight,
            0.5,
            1000
        );
        this.camera.position.set(0, 18, 55);

        // 3. Renderer with soft shadows
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.1;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // 4. OrbitControls
        if (THREE.OrbitControls) {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.06;
            this.controls.maxDistance = 180;
            this.controls.minDistance = 6;
            this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
            this.controls.target.set(0, 8, 20);
        }

        // 5. Bright Sunny Lighting
        this.setupSunnyLighting();

        // 6. Environment: Fluffy Clouds & Floating Islands
        this.createSunnyEnvironment();

        // 7. Platforms & Models
        this.createGiantPCStation();
        this.createDnsTower();
        this.createRainbowBridge();
        this.createServerKitchen();
        this.createApiDrone();

        // 8. Splines & Courier Robot
        this.setupSplines();
        this.createCourierRobot();

        // Listeners
        window.addEventListener('resize', () => this.onResize());
        this.renderer.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));

        this.animate();
    }

    setupSunnyLighting() {
        // Ambient Light (Super bright & joyful, no dark shadows!)
        const ambient = new THREE.AmbientLight(0xffffff, 1.35);
        this.scene.add(ambient);

        // Hemisphere Light (Sky cyan + Grass mint bounce)
        const hemi = new THREE.HemisphereLight(0xbae6fd, 0xdcfce7, 0.7);
        this.scene.add(hemi);

        // Sun Directional Light
        const sun = new THREE.DirectionalLight(0xfff7e6, 1.4);
        sun.position.set(40, 70, 40);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 1024;
        sun.shadow.mapSize.height = 1024;
        sun.shadow.camera.near = 10;
        sun.shadow.camera.far = 180;
        sun.shadow.camera.left = -50;
        sun.shadow.camera.right = 50;
        sun.shadow.camera.top = 50;
        sun.shadow.camera.bottom = -50;
        this.scene.add(sun);
    }

    createSunnyEnvironment() {
        // Soft sunny ground plane
        const groundGeo = new THREE.CircleGeometry(120, 32);
        const groundMat = new THREE.MeshStandardMaterial({
            color: 0x86efac, // pastel spring grass
            roughness: 0.8
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -6;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Floating fluffy white clouds
        const cloudCoords = [
            [-45, 22, -25], [45, 25, -20], [-25, 28, 25],
            [35, 20, 30], [0, 35, -45], [-55, 18, 10]
        ];

        cloudCoords.forEach(pos => {
            const cloud = this.createCloudMesh();
            cloud.position.set(pos[0], pos[1], pos[2]);
            this.scene.add(cloud);
            this.clouds.push(cloud);
        });
    }

    createCloudMesh() {
        const group = new THREE.Group();
        const puffGeo = new THREE.SphereGeometry(3.5, 12, 12);
        const puffMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });

        const offsets = [
            [0, 0, 0], [2.8, -0.4, 0], [-2.8, -0.4, 0],
            [1.4, 1.2, 0.5], [-1.2, 1.2, -0.5]
        ];
        offsets.forEach(o => {
            const m = new THREE.Mesh(puffGeo, puffMat);
            m.position.set(o[0], o[1], o[2]);
            group.add(m);
        });
        return group;
    }

    // ------------------------------------------------------------------------
    // Platform 1: The Giant PC Browser & Desk
    // ------------------------------------------------------------------------
    createGiantPCStation() {
        const group = new THREE.Group();
        group.position.set(0, 0, 24);

        // Desk Platform
        const deskGeo = new THREE.CylinderGeometry(14, 14.5, 2, 32);
        const deskMat = new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.3 });
        const desk = new THREE.Mesh(deskGeo, deskMat);
        desk.position.y = -1;
        desk.receiveShadow = true;
        group.add(desk);

        // Monitor Base & Stand
        const standMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5, roughness: 0.2 });
        const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 4, 0.5, 24), standMat);
        baseMesh.position.set(0, 0.25, -4);
        group.add(baseMesh);

        const poleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 4, 16), standMat);
        poleMesh.position.set(0, 2.2, -4);
        group.add(poleMesh);

        // Monitor Frame
        const monitorMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2 });
        const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(16, 11, 0.8), monitorMat);
        frameMesh.position.set(0, 8.5, -4);
        frameMesh.castShadow = true;
        group.add(frameMesh);

        // Dynamic Screen Canvas Texture
        this.pcScreenCanvas = document.createElement('canvas');
        this.pcScreenCanvas.width = 640;
        this.pcScreenCanvas.height = 420;
        this.pcScreenCtx = this.pcScreenCanvas.getContext('2d');
        this.updateScreenReady("https://cat-games.fun");

        this.pcScreenTexture = new THREE.CanvasTexture(this.pcScreenCanvas);
        const screenGeo = new THREE.PlaneGeometry(15, 9.8);
        const screenMat = new THREE.MeshBasicMaterial({ map: this.pcScreenTexture });
        const screenMesh = new THREE.Mesh(screenGeo, screenMat);
        screenMesh.position.set(0, 8.5, -3.55);
        group.add(screenMesh);
        this.screenMesh = screenMesh;

        // Cute Pastel Keyboard & Mouse
        const kbMesh = new THREE.Mesh(
            new THREE.BoxGeometry(9, 0.4, 3.5),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
        );
        kbMesh.position.set(0, 0.2, 2.5);
        group.add(kbMesh);

        const mouseMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.4, 1.8),
            new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.2 })
        );
        mouseMesh.position.set(6, 0.2, 2.5);
        group.add(mouseMesh);

        // Station Label
        const label = this.createComicLabel("1. YOUR PC BROWSER 💻", 0x0284c7);
        label.position.set(0, 16, -4);
        group.add(label);

        group.userData = { id: 'client', name: 'Your PC Browser', subtitle: 'Where your web journey starts!' };
        this.clickableObjects.push(frameMesh, screenMesh, desk);
        frameMesh.userData = group.userData;
        desk.userData = group.userData;

        this.scene.add(group);
        this.stations.client = group;
    }

    updateScreenReady(url) {
        const ctx = this.pcScreenCtx;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 640, 420);

        // Header bar
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(0, 0, 640, 60);

        // Dots
        ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(30, 30, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(60, 30, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(90, 30, 10, 0, Math.PI * 2); ctx.fill();

        // URL bar
        ctx.fillStyle = '#f8fafc';
        ctx.roundRect(130, 12, 480, 36, 18);
        ctx.fill();

        ctx.font = 'bold 18px Fredoka, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText('🔒 ' + url, 150, 36);

        // Body message
        ctx.font = 'bold 32px Fredoka, sans-serif';
        ctx.fillStyle = '#0284c7';
        ctx.textAlign = 'center';
        ctx.fillText('Ready for Web Adventure! 🚀', 320, 160);

        ctx.font = '20px Outfit, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText('Type any URL above & click GO!', 320, 205);

        ctx.font = 'bold 22px Fredoka, sans-serif';
        ctx.fillStyle = '#f97316';
        ctx.fillText('Tiny Robot Byte will fetch your site! 🤖', 320, 260);

        // Mini preview card
        ctx.fillStyle = '#f1f5f9';
        ctx.roundRect(100, 300, 440, 80, 16);
        ctx.fill();
        ctx.fillStyle = '#64748b';
        ctx.font = '16px Fredoka, sans-serif';
        ctx.fillText('HTML (Skeleton) + CSS (Paint) + JS (Powers)', 320, 345);
        ctx.textAlign = 'left';

        if (this.pcScreenTexture) this.pcScreenTexture.needsUpdate = true;
    }

    updateScreenLoaded(siteName, url) {
        const ctx = this.pcScreenCtx;
        ctx.fillStyle = '#f0fdf4'; // fresh light green
        ctx.fillRect(0, 0, 640, 420);

        // Header bar
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(0, 0, 640, 60);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Fredoka, sans-serif';
        ctx.fillText('✅ ' + siteName + ' - LIVE & WORKING!', 40, 38);

        // Working Site Content
        ctx.fillStyle = '#ffffff';
        ctx.roundRect(40, 90, 560, 290, 20);
        ctx.fill();

        ctx.textAlign = 'center';
        ctx.font = 'bold 36px Fredoka, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText('🎉 WEBSITE ASSEMBLED! 🎉', 320, 160);

        ctx.font = '22px Outfit, sans-serif';
        ctx.fillStyle = '#16a34a';
        ctx.fillText('The Robot returned with HTML, CSS & API data!', 320, 215);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 24px Fredoka, sans-serif';
        ctx.fillText('✨ Click interactive toys on screen to play! ✨', 320, 280);
        ctx.textAlign = 'left';

        if (this.pcScreenTexture) this.pcScreenTexture.needsUpdate = true;
    }

    // ------------------------------------------------------------------------
    // Platform 2: The DNS Magic Tower / Phonebook
    // ------------------------------------------------------------------------
    createDnsTower() {
        const group = new THREE.Group();
        group.position.set(-32, 2, 0);

        // Island Base
        const islandGeo = new THREE.CylinderGeometry(8, 9, 3, 24);
        const islandMat = new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.6 });
        const island = new THREE.Mesh(islandGeo, islandMat);
        island.receiveShadow = true;
        group.add(island);

        // Giant Phonebook Pedestal
        const bookGeo = new THREE.BoxGeometry(6, 4, 7);
        const bookMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.2 });
        const book = new THREE.Mesh(bookGeo, bookMat);
        book.position.y = 3.5;
        book.castShadow = true;
        group.add(book);

        // Pages
        const pageMesh = new THREE.Mesh(
            new THREE.BoxGeometry(5.8, 3.6, 6.8),
            new THREE.MeshStandardMaterial({ color: 0xfef08a })
        );
        pageMesh.position.set(0.2, 3.5, 0);
        group.add(pageMesh);

        // Rotating Parabolic Gold Radar Dish
        const dishGroup = new THREE.Group();
        dishGroup.position.set(0, 8.5, 0);

        const dishMesh = new THREE.Mesh(
            new THREE.SphereGeometry(2.8, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.4),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.2, side: THREE.DoubleSide })
        );
        dishMesh.rotation.x = Math.PI;
        dishGroup.add(dishMesh);

        const horn = new THREE.Mesh(new THREE.ConeGeometry(0.4, 2, 8), new THREE.MeshBasicMaterial({ color: 0xec4899 }));
        horn.position.set(0, -1.4, 0);
        dishGroup.add(horn);

        group.add(dishGroup);
        this.rotators.push({ obj: dishGroup, speedY: 0.03 });

        // Label
        const label = this.createComicLabel("2. DNS PHONEBOOK OWL 🔮", 0x8b5cf6);
        label.position.set(0, 13, 0);
        group.add(label);

        group.userData = { id: 'dns', name: 'DNS Server', subtitle: 'Turns website name into secret IP numbers!' };
        this.clickableObjects.push(island, book);
        island.userData = group.userData;
        book.userData = group.userData;

        this.scene.add(group);
        this.stations.dns = group;
    }

    // ------------------------------------------------------------------------
    // Platform 3: Rainbow Bridge
    // ------------------------------------------------------------------------
    createRainbowBridge() {
        const group = new THREE.Group();

        // 3D Arched Rainbow Spline
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-24, 4, -4),
            new THREE.Vector3(-10, 12, -10),
            new THREE.Vector3(10, 12, -10),
            new THREE.Vector3(24, 6, -6)
        ]);

        const colors = [0xf43f5e, 0xf97316, 0xfacc15, 0x22c55e, 0x0284c7, 0x8b5cf6];
        colors.forEach((col, idx) => {
            const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.35, 8, false);
            const tubeMat = new THREE.MeshStandardMaterial({
                color: col,
                roughness: 0.2,
                emissive: col,
                emissiveIntensity: 0.15
            });
            const tube = new THREE.Mesh(tubeGeo, tubeMat);
            tube.position.y = idx * 0.4;
            group.add(tube);
        });

        // Label
        const label = this.createComicLabel("3. RAINBOW FIBER HIGHWAY 🌈", 0xf97316);
        label.position.set(0, 17, -10);
        group.add(label);

        this.scene.add(group);
        this.stations.bridge = group;
    }

    // ------------------------------------------------------------------------
    // Platform 4: Cloud Server Kitchen
    // ------------------------------------------------------------------------
    createServerKitchen() {
        const group = new THREE.Group();
        group.position.set(32, 2, -6);

        // Island Base
        const island = new THREE.Mesh(
            new THREE.CylinderGeometry(9, 10, 3, 24),
            new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.6 })
        );
        island.receiveShadow = true;
        group.add(island);

        // Server Skyscraper Monoliths (Bright Pastel Blue & Orange)
        const towerMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2 });
        const tower = new THREE.Mesh(new THREE.BoxGeometry(6, 14, 5), towerMat);
        tower.position.set(0, 8.5, 0);
        tower.castShadow = true;
        group.add(tower);

        // Blinking Candy LEDs
        const ledCount = 10;
        for (let i = 0; i < ledCount; i++) {
            const led = new THREE.Mesh(
                new THREE.BoxGeometry(0.4, 0.3, 0.1),
                new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x22c55e : 0xfacc15 })
            );
            led.position.set(-1.8 + (i % 3) * 1.8, 4 + Math.floor(i / 3) * 2.5, 2.56);
            group.add(led);
            this.blinkingLeds.push({ led, col: led.material.color.getHex() });
        }

        // Spinning Yellow Cooling Fan
        const fanGroup = new THREE.Group();
        fanGroup.position.set(0, 15.6, 0);
        const fanMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2 });
        for (let b = 0; b < 4; b++) {
            const blade = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 0.4), fanMat);
            blade.rotation.y = (b * Math.PI) / 2;
            fanGroup.add(blade);
        }
        group.add(fanGroup);
        this.rotators.push({ obj: fanGroup, speedY: 0.15 });

        // Conveyor belt with gift box
        const beltMesh = new THREE.Mesh(
            new THREE.BoxGeometry(5, 0.4, 3),
            new THREE.MeshStandardMaterial({ color: 0x334155 })
        );
        beltMesh.position.set(-4.5, 2.2, 2);
        group.add(beltMesh);

        // Label
        const label = this.createComicLabel("4. SERVER KITCHEN ☁️", 0x16a34a);
        label.position.set(0, 19, 0);
        group.add(label);

        group.userData = { id: 'server', name: 'Cloud Server', subtitle: 'Cooks your HTML, CSS, and JS files!' };
        this.clickableObjects.push(island, tower);
        island.userData = group.userData;
        tower.userData = group.userData;

        this.scene.add(group);
        this.stations.server = group;
    }

    // ------------------------------------------------------------------------
    // Platform 5: API Waiter Drone
    // ------------------------------------------------------------------------
    createApiDrone() {
        const group = new THREE.Group();
        group.position.set(36, 14, 4);

        // Drone Body (Bright Sunshine Yellow Sphere)
        const body = new THREE.Mesh(
            new THREE.SphereGeometry(1.6, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2 })
        );
        group.add(body);

        // Friendly Big Blue Eye
        const eye = new THREE.Mesh(
            new THREE.SphereGeometry(0.7, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0x0284c7 })
        );
        eye.position.set(0, 0.2, 1.2);
        group.add(eye);

        // 4 Rotors
        const angles = [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4];
        angles.forEach(ang => {
            const rotor = new THREE.Mesh(
                new THREE.BoxGeometry(2, 0.05, 0.3),
                new THREE.MeshBasicMaterial({ color: 0xffffff })
            );
            rotor.position.set(Math.cos(ang) * 2.2, 0.6, Math.sin(ang) * 2.2);
            group.add(rotor);
            this.rotators.push({ obj: rotor, speedY: 0.3 });
        });

        // Floating Pizza Slice / Live Data tray
        const trayMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(1.4, 1.4, 0.2, 16),
            new THREE.MeshStandardMaterial({ color: 0xf43f5e })
        );
        trayMesh.position.set(0, -1.8, 0);
        group.add(trayMesh);

        // Label
        const label = this.createComicLabel("5. API WAITER DRONE 🤖", 0xf59e0b);
        label.position.set(0, 4, 0);
        group.add(label);

        this.apiDrone = group;
        this.apiDroneBaseY = 14;

        group.userData = { id: 'api', name: 'API Drone', subtitle: 'The waiter that brings fresh live data!' };
        this.clickableObjects.push(body);
        body.userData = group.userData;

        this.scene.add(group);
        this.stations.api = group;
    }

    // ------------------------------------------------------------------------
    // Tiny Courier Robot (Byte-Bot) & Splines
    // ------------------------------------------------------------------------
    setupSplines() {
        // Outbound trip: PC -> DNS -> Rainbow Bridge -> Server
        this.splineOutbound = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 1.5, 26),      // In front of PC
            new THREE.Vector3(-14, 2.5, 14),   // Run to DNS
            new THREE.Vector3(-32, 4, 0),      // Arrive at DNS
            new THREE.Vector3(-18, 9, -6),     // Onto Rainbow Bridge
            new THREE.Vector3(0, 13, -10),     // Top of Rainbow Bridge
            new THREE.Vector3(18, 8, -8),      // Down the Bridge
            new THREE.Vector3(30, 4, -4)       // Arrive at Server & API
        ]);

        // Return trip: Server -> Rainbow Bridge -> PC
        this.splineReturn = new THREE.CatmullRomCurve3([
            new THREE.Vector3(30, 4, -4),      // Leave Server with gift box
            new THREE.Vector3(18, 9, -7),      // Back onto Bridge
            new THREE.Vector3(0, 13, -9),      // Top of Bridge
            new THREE.Vector3(-14, 8, 4),      // Across Clouds
            new THREE.Vector3(0, 2.5, 20),     // Hop in front of PC
            new THREE.Vector3(0, 8, 23)        // Jump INTO PC screen!
        ]);
    }

    createCourierRobot() {
        const group = new THREE.Group();

        // White Spherical Head
        const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.8, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
        );
        head.position.y = 1.9;
        group.add(head);

        // Cute Cyan Visor Eyes
        const visor = new THREE.Mesh(
            new THREE.BoxGeometry(0.9, 0.35, 0.3),
            new THREE.MeshBasicMaterial({ color: 0x0284c7 })
        );
        visor.position.set(0, 1.95, 0.7);
        group.add(visor);

        // Antenna with Yellow Ball
        const antPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5), new THREE.MeshBasicMaterial({ color: 0x64748b }));
        antPole.position.set(0, 2.8, 0);
        group.add(antPole);

        const antBall = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
        antBall.position.set(0, 3.1, 0);
        group.add(antBall);

        // Torso / Body (Vibrant Red)
        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.55, 0.65, 0.9, 16),
            new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.3 })
        );
        body.position.y = 1.0;
        group.add(body);

        // Backpack with Letter/Payload
        const bag = new THREE.Mesh(
            new THREE.BoxGeometry(0.7, 0.7, 0.4),
            new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2 })
        );
        bag.position.set(0, 1.1, -0.6);
        group.add(bag);

        // Arms
        const armMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.7), armMat);
        leftArm.position.set(-0.75, 1.0, 0);
        group.add(leftArm);
        this.robotLeftArm = leftArm;

        const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.7), armMat);
        rightArm.position.set(0.75, 1.0, 0);
        group.add(rightArm);
        this.robotRightArm = rightArm;

        // Legs
        const legMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
        const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.7), legMat);
        leftLeg.position.set(-0.35, 0.35, 0);
        group.add(leftLeg);
        this.robotLeftLeg = leftLeg;

        const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.7), legMat);
        rightLeg.position.set(0.35, 0.35, 0);
        group.add(rightLeg);
        this.robotRightLeg = rightLeg;

        // Golden Gift Box (carried on return trip!)
        const boxGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const boxMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xeab308, emissiveIntensity: 0.3 });
        const gift = new THREE.Mesh(boxGeo, boxMat);
        gift.position.set(0, 1.0, 0.8);
        gift.visible = false;
        group.add(gift);
        this.robotGiftBox = gift;

        // Position robot in front of PC
        group.position.copy(this.splineOutbound.getPointAt(0));
        this.scene.add(group);
        this.robot = group;
    }

    createComicLabel(text, colorHex) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // White bubble with colorful border
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#' + colorHex.toString(16).padStart(6, '0');
        ctx.lineWidth = 8;
        ctx.roundRect(10, 10, 492, 108, 32);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 34px Fredoka, Outfit, sans-serif';
        ctx.fillStyle = '#' + colorHex.toString(16).padStart(6, '0');
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 256, 64);

        const tex = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(12, 3, 1);
        return sprite;
    }

    // ------------------------------------------------------------------------
    // Time & Journey Animation Controller
    // ------------------------------------------------------------------------
    setTime(t) {
        this.timeT = Math.max(0, Math.min(1, t));

        if (!this.robot || !this.splineOutbound || !this.splineReturn) return;

        let pt, tangent;
        if (this.timeT <= 0.5) {
            // Outbound trip (0 to 0.5 maps to 0 to 1 on outbound spline)
            const u = this.timeT * 2;
            pt = this.splineOutbound.getPointAt(u);
            tangent = this.splineOutbound.getTangentAt(u).normalize();
            if (this.robotGiftBox) this.robotGiftBox.visible = false;
        } else {
            // Return trip (0.5 to 1.0 maps to 0 to 1 on return spline)
            const u = (this.timeT - 0.5) * 2;
            pt = this.splineReturn.getPointAt(u);
            tangent = this.splineReturn.getTangentAt(u).normalize();
            if (this.robotGiftBox) this.robotGiftBox.visible = true; // Carrying website files!
        }

        this.robot.position.copy(pt);
        this.robot.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);

        // Walking / Running leg animations (scaled so robot naturally jogs even on slow speeds!)
        const walkCycle = (this.timeT > 0 && this.timeT < 1) ? Math.sin(Date.now() * 0.015) : 0;
        if (this.robotLeftLeg) this.robotLeftLeg.rotation.x = walkCycle * 0.75;
        if (this.robotRightLeg) this.robotRightLeg.rotation.x = -walkCycle * 0.75;
        if (this.robotLeftArm) this.robotLeftArm.rotation.x = -walkCycle * 0.75;
        if (this.robotRightArm) this.robotRightArm.rotation.x = walkCycle * 0.75;

        // Camera follow robot with FREE-WILL ZOOM & ORBIT (so bot & API Drone can both be seen!)
        if (this.followRobot && !this.isFlyingCamera) {
            if (!this._followInitialized) {
                this._followInitialized = true;
                if (this.controls) {
                    this.controls.target.copy(pt);
                    // Initial elevated view distance showing both robot and the hovering API Drone (at height 14)
                    const curOffset = new THREE.Vector3().subVectors(this.camera.position, this.controls.target);
                    if (curOffset.length() < 20 || curOffset.length() > 80) {
                        this.camera.position.set(pt.x, pt.y + 14, pt.z + 28);
                    }
                }
            } else if (this.controls) {
                // Free-will zoom: maintain the user-chosen distance (mouse wheel scroll) and orbit angle!
                const userZoomOffset = new THREE.Vector3().subVectors(this.camera.position, this.controls.target);
                this.controls.target.lerp(pt, 0.25);
                this.camera.position.copy(this.controls.target).add(userZoomOffset);
            }
        } else {
            this._followInitialized = false;
        }
    }

    focusStation(stationId) {
        switch (stationId) {
            case 'client':
                this.flyCameraTo(new THREE.Vector3(0, 14, 46), new THREE.Vector3(0, 7, 24));
                break;
            case 'dns':
                this.flyCameraTo(new THREE.Vector3(-32, 14, 18), new THREE.Vector3(-32, 6, 0));
                break;
            case 'bridge':
                this.flyCameraTo(new THREE.Vector3(0, 18, 14), new THREE.Vector3(0, 10, -10));
                break;
            case 'server':
                this.flyCameraTo(new THREE.Vector3(32, 16, 16), new THREE.Vector3(32, 8, -6));
                break;
            case 'api':
                this.flyCameraTo(new THREE.Vector3(36, 18, 18), new THREE.Vector3(36, 14, 4));
                break;
            default:
                this.flyCameraTo(new THREE.Vector3(0, 24, 60), new THREE.Vector3(0, 8, 10));
                break;
        }
    }

    flyCameraTo(targetPos, lookAtPos, duration = 1.2) {
        this.isFlyingCamera = true;
        this.camFlightProgress = 0.0;
        this.camFlightDuration = duration;
        this.camStartPos.copy(this.camera.position);
        this.camTargetPos.copy(targetPos);
        if (this.controls) {
            this.camLookStart.copy(this.controls.target);
            this.camLookTarget.copy(lookAtPos);
        }
    }

    onPointerDown(e) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.clickableObjects, true);

        if (intersects.length > 0) {
            let hit = intersects[0].object;
            while (hit && !hit.userData.id && hit.parent) {
                hit = hit.parent;
            }
            if (hit && hit.userData.id && window.onStationClick) {
                window.onStationClick(hit.userData.id);
            }
        }
    }

    onResize() {
        if (!this.container || !this.renderer || !this.camera) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();

        // Camera flight
        if (this.isFlyingCamera) {
            this.camFlightProgress += delta / this.camFlightDuration;
            if (this.camFlightProgress >= 1.0) {
                this.camFlightProgress = 1.0;
                this.isFlyingCamera = false;
            }
            const t = this.camFlightProgress;
            const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            this.camera.position.lerpVectors(this.camStartPos, this.camTargetPos, ease);
            if (this.controls) this.controls.target.lerpVectors(this.camLookStart, this.camLookTarget, ease);
        }

        if (this.controls && !this.isFlyingCamera) {
            this.controls.update();
        }

        // Rotations
        this.rotators.forEach(r => {
            if (r.speedY) r.obj.rotation.y += r.speedY;
        });

        // Blinking LEDs
        if (Math.random() < 0.2) {
            const led = this.blinkingLeds[Math.floor(Math.random() * this.blinkingLeds.length)];
            if (led) {
                led.led.material.color.setHex(Math.random() > 0.5 ? 0xffffff : led.col);
            }
        }

        // Hover bobbing & swooping delivery flight for API Waiter Drone
        if (this.apiDrone) {
            if (this.timeT >= 0.40 && this.timeT <= 0.62) {
                // Drone actively swoops down to hand over live API data to Byte-Bot!
                const phase = (this.timeT - 0.40) / 0.22; // 0.0 to 1.0
                let dx, dy, dz;
                if (phase < 0.5) {
                    const u = phase * 2; // descend
                    dx = THREE.MathUtils.lerp(36, 30.5, u);
                    dy = THREE.MathUtils.lerp(14, 4.8, u);
                    dz = THREE.MathUtils.lerp(4, -3.2, u);
                } else {
                    const u = (phase - 0.5) * 2; // ascend back
                    dx = THREE.MathUtils.lerp(30.5, 36, u);
                    dy = THREE.MathUtils.lerp(4.8, 14, u);
                    dz = THREE.MathUtils.lerp(-3.2, 4, u);
                }
                this.apiDrone.position.set(dx, dy, dz);
                this.apiDrone.rotation.z = Math.sin(elapsedTime * 8) * 0.2; // lively tilt
            } else {
                this.apiDrone.position.set(36, this.apiDroneBaseY + Math.sin(elapsedTime * 4) * 0.6, 4);
                this.apiDrone.rotation.z = 0;
            }
        }

        // Gentle drifting clouds
        this.clouds.forEach((cloud, idx) => {
            cloud.position.x += Math.sin(elapsedTime * 0.3 + idx) * 0.02;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

window.CyberWorld = CyberWorld;
