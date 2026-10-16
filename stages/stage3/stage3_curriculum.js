// ============================================================================
// ATW WEB FLOW - STAGE 3: SENIOR ARCHITECT (CLASSES 10th to 12th / AGES 16-18)
// Transport Layers (TCP/UDP), Cryptography (TLS 1.3), Caching & Scale
// ============================================================================

window.STAGE_3_DATA = {
    id: 3,
    name: "Senior Architect",
    title: "Stage 3: Senior Architect • Protocols, Cryptography & Scale",
    ageGroup: "Classes 10th to 12th (Ages 16–18)",
    badge: "PROTOCOLS & CRYPTOGRAPHY",
    description: "Deep dive into low-level transport mechanisms: TCP 3-Way Handshake, Diffie-Hellman Key Exchange (TLS 1.3), Hierarchical 5-Tier Caching, Reverse Proxies, and ACID Database transactions.",

    mascot: {
        name: "Mecha Titan Mk-III",
        evolutionTitle: "Heavy Reinforced Mecha with Cryptographic Shielding",
        description: "Equipped with TLS 1.3 cryptographic force field, dual parallel packet railguns, and high-frequency Total Internal Reflection fiber conduits.",
        stats: {
            speed: "10 Gbps Subsea Fiber",
            armor: "Cryptographic X.509 Aegis",
            protocol: "TCP SYN/ACK + TLS 1.3 ECDH",
            caching: "5-Tier Cache Hierarchy"
        }
    },

    stations: [
        {
            id: "tcp_handshake",
            icon: "🤝",
            num: "1",
            title: "TCP 3-Way Handshake & Reliability",
            subtitle: "SYN, SYN-ACK, ACK & Flow Control",
            analogy: "A formal walkie-talkie protocol: 'Can you hear me? Over' ➔ 'Yes, I hear you, can you hear me? Over' ➔ 'Loud and clear! Over'.",
            techExplanation: "Transmission Control Protocol (TCP) guarantees reliable, in-order byte stream delivery. Before any data flows, client and server exchange 3 packets: 1) SYN (synchronize initial sequence number), 2) SYN-ACK (server acknowledges client sequence and proposes its own), 3) ACK (client acknowledges server sequence). Socket enters ESTABLISHED state. TCP handles packet loss with sequence retransmissions, sliding window flow control, and congestion avoidance algorithms (CUBIC/BBR).",
            codeSnippet: `TCP 3-Way Handshake Packet Trace:\n1. Client ➔ [SYN seq=1000 win=65535] ➔ Server\n2. Server ➔ [SYN-ACK seq=5000 ack=1001 win=65535] ➔ Client\n3. Client ➔ [ACK ack=5001] ➔ Server\nStatus: Connection ESTABLISHED (Port 443 Socket Active)`,
            keySpecs: ["SYN, SYN-ACK, ACK Sequence", "Sliding Window Flow Control", "Congestion Avoidance (CUBIC/BBR)", "Ordered Byte-Stream Reassembly"]
        },
        {
            id: "tls_encryption",
            icon: "🔒",
            num: "2",
            title: "Cryptographic Security & TLS 1.3 Handshake",
            subtitle: "Elliptic Curve Diffie-Hellman (ECDH) & X.509 Certificates",
            analogy: "Two secret agents mixing paint colors in plain sight: even if an eavesdropper sees the colors, they can never un-mix them to discover the secret formula!",
            techExplanation: "TLS 1.3 encrypts all web traffic with zero plain-text exposure. During the 1-RTT handshake, the client sends supported cipher suites and an Elliptic Curve Diffie-Hellman (ECDH) key share. The server responds with its key share and digital certificate signed by a trusted Certificate Authority (CA). Both sides mathematically calculate the identical symmetric session key (AES-256-GCM) independently without ever transmitting the key over the wire.",
            codeSnippet: `TLS 1.3 Negotiation:\n  Cipher: TLS_AES_256_GCM_SHA384\n  Key Share: Curve25519 (ECDH)\n  Certificate: X.509 Validated (DigiCert CA)\n  Symmetric Session Key Derived: ACTIVE (0-RTT Resumption Enabled)`,
            keySpecs: ["ECDH Key Exchange (Curve25519)", "X.509 Certificate Chain of Trust", "Symmetric AES-GCM-256 Encryption", "1-RTT Handshake Latency"]
        },
        {
            id: "caching_pipeline",
            icon: "⚡",
            num: "3",
            title: "Hierarchical 5-Tier Web Caching",
            subtitle: "Service Workers, Browser Disk, OS Resolver, ISP & CDN",
            analogy: "Keeping a book on your desk instead of driving to the city library every time you want to read a paragraph!",
            techExplanation: "Web performance relies on caching data as close to the user as possible across 5 distinct tiers: 1) Service Worker Cache API, 2) Browser Disk/Memory Cache (governed by Cache-Control headers and ETags), 3) OS Resolver Cache (hosts file and local DNS), 4) Router/ISP Recursive Cache, and 5) Global CDN Edge Cache. A cache hit returns responses in <5 milliseconds.",
            codeSnippet: `// HTTP Caching Headers:\nCache-Control: public, max-age=31536000, immutable\nETag: W/"65f4a1-89bc"\nIf-None-Match: W/"65f4a1-89bc" ➔ Server returns 304 Not Modified!`,
            keySpecs: ["Cache-Control Directives", "ETag & Last-Modified Revalidation", "CDN Edge PoP Acceleration", "Sub-5ms Latency Hits"]
        },
        {
            id: "reverse_proxy",
            icon: "🛡️",
            num: "4",
            title: "Reverse Proxies & Load Balancing",
            subtitle: "Nginx, SSL Termination, Round Robin & Anycast",
            analogy: "A five-star hotel reception desk: guests never wander into employee corridors; the concierge routes every request to the right department!",
            techExplanation: "High-traffic websites place reverse proxies (Nginx, Envoy, Cloudflare) in front of application servers. The reverse proxy handles SSL/TLS termination, DDoS mitigation, rate limiting, and gzip/brotli compression. Load balancers distribute requests across multiple server clusters using algorithms like Round Robin, Least Connections, or IP Hash to prevent server exhaustion.",
            codeSnippet: `# Nginx Upstream Load Balancer Config:\nupstream backend_cluster {\n    least_conn;\n    server app1.internal:8080;\n    server app2.internal:8080;\n    server app3.internal:8080 backup;\n}`,
            keySpecs: ["SSL Termination", "DDoS Mitigation & Rate Limiting", "Least Connections / Round Robin", "Zero-Downtime Rolling Deploys"]
        },
        {
            id: "acid_database",
            icon: "🏛️",
            num: "5",
            title: "Enterprise Relational DBs & ACID Transactions",
            subtitle: "PostgreSQL, B-Tree Indexes & Concurrency Isolation",
            analogy: "A bank transfer between two accounts: money MUST leave Account A and arrive in Account B together. If electricity fails midway, the transfer is undone completely!",
            techExplanation: "Relational database engines (PostgreSQL, MySQL) enforce ACID guarantees: Atomicity (all operations commit or all rollback), Consistency (integrity constraints respected), Isolation (concurrent transactions execute without race conditions), and Durability (writes survive crashes). B-Tree indexes allow queries to search through millions of rows in O(log N) time.",
            codeSnippet: `-- ACID Transaction in PostgreSQL:\nBEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE user_id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE user_id = 2;\nCOMMIT; -- Both updates succeed atomically!`,
            keySpecs: ["ACID Compliance", "B-Tree Indexing O(log N)", "Write-Ahead Logging (WAL)", "Multi-Version Concurrency (MVCC)"]
        }
    ]
};
