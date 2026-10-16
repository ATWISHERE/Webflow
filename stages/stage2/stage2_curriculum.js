// ============================================================================
// ATW WEB FLOW - STAGE 2: JUNIOR DEV (CLASSES 8th to 10th / AGES 13-15)
// Full-Stack Architecture, REST APIs, HTTP Methods, Status Codes & Networking
// ============================================================================

window.STAGE_2_DATA = {
    id: 2,
    name: "Junior Dev",
    title: "Stage 2: Junior Dev • Full-Stack & Networking",
    ageGroup: "Classes 8th to 10th (Ages 13–15)",
    badge: "FULL-STACK ARCHITECTURE",
    description: "Learn how modern full-stack web applications work: Browser rendering engines, Frontend vs. Backend separation, REST APIs with JSON, HTTP Verbs, Status Codes, and Database security.",
    
    mascot: {
        name: "Cyber Courier Mk-II",
        evolutionTitle: "Upgraded with Titanium Armor & Datalink Visor",
        description: "Equipped with neon datalink visor displaying live HTTP status codes (200 OK, 404), twin ion rocket skates, and dual-band packet scanner.",
        stats: {
            speed: "450 Mbps",
            armor: "Titanium Alloy",
            protocol: "HTTP/1.1 & HTTP/2 REST",
            scanner: "Active JSON Inspector"
        }
    },

    stations: [
        {
            id: "client_engine",
            icon: "💻",
            num: "1",
            title: "Frontend Client Engine & DOM Tree",
            subtitle: "Browser V8 Engine, DOM, CSSOM & Render Pipeline",
            analogy: "The frontend is the steering wheel and dashboard of a sports car. It is everything the driver sees, touches, and clicks!",
            techExplanation: "Your web browser is a multi-threaded rendering engine (e.g. Blink in Chrome, Gecko in Firefox). When HTML arrives, the browser parses tags into a Document Object Model (DOM) tree. Simultaneously, CSS is parsed into a CSS Object Model (CSSOM). Combined, they form the Render Tree, which calculates layout geometry (reflow) and paints pixels to your GPU screen at 60 FPS.",
            codeSnippet: `// Browser DOM Node Construction:\nconst btn = document.createElement('button');\nbtn.className = 'btn-go';\nbtn.textContent = '🚀 Launch';\nbtn.addEventListener('click', () => {\n  console.log('Event dispatched in V8 engine!');\n});\ndocument.body.appendChild(btn);`,
            keySpecs: ["DOM Tree Hierarchy", "CSSOM Parsing", "Render Tree Calculation", "GPU Rasterization (Reflow/Paint)"]
        },
        {
            id: "dns_records",
            icon: "🔮",
            num: "2",
            title: "DNS Records & Internet Addressing",
            subtitle: "A, AAAA, CNAME Records & Standard Ports (80/443)",
            analogy: "Think of an 'A Record' like saving your best friend's nickname to their real phone number in your smartphone contacts.",
            techExplanation: "Domain names like 'cat-games.fun' exist for human convenience. Computers only route packets using IP addresses. DNS servers store zone files containing record types: 'A' records map domain names to 32-bit IPv4 addresses (e.g. 104.21.58.192), 'AAAA' records map to 128-bit IPv6 addresses, and 'CNAME' records create aliases (e.g. www.site.com ➔ site.com). Requests automatically target Port 443 for HTTPS or Port 80 for unencrypted HTTP.",
            codeSnippet: `; DNS Zone File Example for cat-games.fun\ncat-games.fun.      300  IN  A      104.21.58.192\ncat-games.fun.      300  IN  AAAA   2606:4700:3031::6815:3ac0\nwww.cat-games.fun.  300  IN  CNAME  cat-games.fun.\napi.cat-games.fun.  300  IN  A      104.21.58.195`,
            keySpecs: ["A Record (IPv4)", "AAAA Record (IPv6)", "CNAME (Aliases)", "Port 443 (HTTPS Default)"]
        },
        {
            id: "http_methods",
            icon: "🌐",
            num: "3",
            title: "HTTP Verbs & REST Request Pipeline",
            subtitle: "GET, POST, PUT, DELETE & Header Envelopes",
            analogy: "HTTP methods are like postal instructions stamped on an envelope: GET = 'Please send me the newsletter', POST = 'Here is my filled registration form'.",
            techExplanation: "HyperText Transfer Protocol (HTTP) is the stateless application-layer communication protocol of the web. Every request specifies a Method: GET (retrieve data safely without modifying server state), POST (submit new data to be created in the database), PUT (replace an existing resource), or DELETE (remove a resource). Requests carry headers (User-Agent, Content-Type, Authorization) and an optional JSON body.",
            codeSnippet: `GET /v1/players?limit=10 HTTP/1.1\nHost: api.cat-games.fun\nUser-Agent: Mozilla/5.0 (Windows NT 10)\nAccept: application/json\nAuthorization: Bearer eyJhbGciOi...\n\n// Response payload returns in JSON format!`,
            keySpecs: ["GET (Safe & Cacheable)", "POST (Resource Creation)", "PUT (Update)", "DELETE (Removal)"]
        },
        {
            id: "backend_routing",
            icon: "☁️",
            num: "4",
            title: "Backend Server & Node.js Routing",
            subtitle: "Application Logic, Request Validation & Middleware",
            analogy: "The backend is the master kitchen and secure bank vault. Customers never walk into the kitchen—they communicate through strict order windows!",
            techExplanation: "The backend runs on remote Linux servers running runtimes like Node.js, Python, or Go. It listens on network ports for incoming HTTP requests, passes them through middleware (logging, authentication, rate limiting), executes business logic, and queries the database. Crucially, the frontend NEVER communicates directly with the database to prevent catastrophic SQL injection or unauthorized data tampering.",
            codeSnippet: `// Node.js Express Backend Route:\napp.get('/api/cats/score', authenticateUser, async (req, res) => {\n  const userId = req.user.id;\n  const score = await db.query('SELECT points FROM users WHERE id = $1', [userId]);\n  res.status(200).json({ points: score.rows[0].points });\n});`,
            keySpecs: ["Route Handlers", "Authentication Middleware", "SQL Injection Prevention", "Server-Side Validation"]
        },
        {
            id: "api_json",
            icon: "🤖",
            num: "5",
            title: "REST APIs & Asynchronous JSON Data",
            subtitle: "JSON Payloads, Fetch API, Promises & Async/Await",
            analogy: "A REST API is like a restaurant drive-through speaker: you ask for item #4 with extra cheese, and the kitchen hands you a neat meal box formatted in JSON!",
            techExplanation: "REST (Representational State Transfer) APIs allow frontend applications to request dynamic data without refreshing the page. In modern JavaScript, the Fetch API returns a Promise that resolves asynchronously. Using async/await, JavaScript continues running UI animations without freezing the browser while waiting for network responses.",
            codeSnippet: `// Asynchronous Fetch with async/await:\nasync function loadGameStats() {\n  const res = await fetch('https://api.cat-games.fun/v1/stats');\n  const data = await res.json();\n  console.log("Live Players:", data.active_players);\n  document.getElementById('player-count').textContent = data.active_players;\n}`,
            keySpecs: ["JSON Key-Value Syntax", "Promises & async/await", "Non-blocking UI Thread", "Dynamic DOM Updates"]
        },
        {
            id: "database_security",
            icon: "💎",
            num: "6",
            title: "Database Persistence: SQL vs. NoSQL",
            subtitle: "Data Storage, Schemas, and the Security Gate",
            analogy: "SQL is an organized Excel spreadsheet with strict columns. NoSQL is a binder of flexible folders where each sheet can have different stickers!",
            techExplanation: "Databases persist data across server reboots. Relational databases (PostgreSQL, MySQL) store structured tables with strict foreign key constraints and ACID guarantees. NoSQL databases (MongoDB, Redis) store flexible JSON documents or in-memory key-value caches. The backend handles parameterized queries to safeguard customer passwords and scores.",
            codeSnippet: `-- Relational SQL Schema:\nCREATE TABLE players (\n  id SERIAL PRIMARY KEY,\n  username VARCHAR(50) UNIQUE NOT NULL,\n  catnip_points INT DEFAULT 0,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`,
            keySpecs: ["Relational (PostgreSQL)", "Document Store (MongoDB)", "In-Memory Cache (Redis)", "Parameterized Queries"]
        },
        {
            id: "status_codes",
            icon: "🚦",
            num: "7",
            title: "HTTP Status Codes Demystified",
            subtitle: "200 OK, 301 Redirect, 404 Not Found & 500 Crash",
            analogy: "Status codes are international traffic signals for computers: Green (200) means All Clear, Yellow (301) means Detour, Red (404/500) means Stop & Error!",
            techExplanation: "Every HTTP response begins with a 3-digit status code: 2xx means Success (200 OK, 201 Created); 3xx means Redirection (301 Moved Permanently, 304 Not Modified); 4xx means Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found); 5xx means Server Error (500 Internal Error, 502 Bad Gateway). Browsers and developer consoles rely on these codes to handle retries and error reporting.",
            codeSnippet: `// HTTP Response Status Codes:\n200 OK           // Resource found and returned successfully\n201 Created      // New resource created (e.g. POST /user)\n401 Unauthorized // Authentication token missing or invalid\n404 Not Found    // Requested URL does not exist on server\n500 Server Error // Uncaught exception in backend code`,
            keySpecs: ["2xx: Success", "3xx: Redirection", "4xx: Client Mistakes", "5xx: Server Failures"]
        },
        {
            id: "browser_storage",
            icon: "📦",
            num: "8",
            title: "Browser Storage & State Persistence",
            subtitle: "LocalStorage, SessionStorage & HTTP Cookies",
            analogy: "LocalStorage is like your personal backpack that stays with you forever. SessionStorage is a temporary desk notebook that gets shredded when you leave the room!",
            techExplanation: "Modern web applications store client-side state across sessions. LocalStorage provides ~5MB of key-value storage that persists across browser restarts (used for dark/light theme choices). SessionStorage is wiped the moment the browser tab closes. Cookies are small key-value strings (max 4KB) automatically attached to every outgoing HTTP request header, essential for session login tokens.",
            codeSnippet: `// Client-Side Web Storage API:\nlocalStorage.setItem('theme', 'cyber-dark');\nconst theme = localStorage.getItem('theme'); // 'cyber-dark'\n\n// Cookies with security flags:\n// Set-Cookie: session_id=xyz123; Secure; HttpOnly; SameSite=Strict`,
            keySpecs: ["LocalStorage (5-10MB Persistent)", "SessionStorage (Tab Lifetime)", "Cookies (Transmitted in HTTP Headers)", "Security Flags (HttpOnly, Secure)"]
        }
    ]
};
