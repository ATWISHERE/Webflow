// ============================================================================
// ATW WEB FLOW - STAGE 4: COSMIC SOVEREIGN (COLLEGE / UNIVERSITY / ENGINEERS)
// Distributed Systems, HTTP/3 (QUIC), CAP Theorem, Kafka & Edge Computing
// ============================================================================

window.STAGE_4_DATA = {
    id: 4,
    name: "Cosmic Sovereign",
    title: "Stage 4: Cosmic Sovereign • Distributed Systems & Cloud Infrastructure",
    ageGroup: "College & University / Engineering Students & Professionals",
    badge: "DISTRIBUTED SYSTEMS & CLOUD",
    description: "Master modern hyperscale engineering: HTTP/3 over QUIC (UDP), CAP Theorem, Raft Consensus, Apache Kafka event streaming, Kubernetes orchestration, and global V8 Edge Isolates.",

    mascot: {
        name: "Cosmic Sovereign Mk-IV",
        evolutionTitle: "Orbital Tech Sentinel with Quantum Warp Rings",
        description: "Equipped with multi-dimensional orbital particle rings, BGP Anycast beam emitters, and distributed consensus crystal scepters.",
        stats: {
            speed: "100 Gbps Anycast Edge",
            consensus: "Raft / Paxos Quorum",
            protocol: "HTTP/3 over QUIC (UDP)",
            throughput: "10,000,000 Events/sec"
        }
    },

    stations: [
        {
            id: "http3_quic",
            icon: "⚡",
            num: "1",
            title: "HTTP/3 over QUIC: Eliminating Head-of-Line Blocking",
            subtitle: "UDP Transport, 0-RTT Handshake & Connection Migration",
            analogy: "Instead of a single-lane highway where one broken car stops all traffic behind it, HTTP/3 gives every packet its own dedicated quantum tunnel!",
            techExplanation: "HTTP/2 multiplexed multiple streams over a single TCP connection. However, if even a single packet is lost, TCP stalls ALL multiplexed streams until that packet is retransmitted (TCP Head-of-Line blocking). HTTP/3 solves this by replacing TCP with QUIC over UDP. Each stream is acknowledged independently. Furthermore, QUIC supports Connection ID migration, meaning your smartphone can switch from home Wi-Fi to 5G cellular without dropping an active download or voice call!",
            codeSnippet: `// HTTP/3 QUIC Protocol Architecture:\n[Application Layer: HTTP/3 (QPACK Header Compression)]\n[Transport Layer:   QUIC (Independent Streams + Built-in TLS 1.3)]\n[Network Layer:     UDP (Port 443)]\n[Physical Layer:    BGP Anycast Subsea Fiber]`,
            keySpecs: ["QUIC over UDP", "Zero Head-of-Line Blocking", "0-RTT Connection Resumption", "Cellular-to-WiFi Connection Migration"]
        },
        {
            id: "cap_theorem",
            icon: "🌌",
            num: "2",
            title: "The CAP Theorem & Distributed Consensus",
            subtitle: "Consistency, Availability, Partition Tolerance & Raft",
            analogy: "Three clocks in three different cities connected by telephone: if the phone lines get cut, do you stop answering time questions, or answer with a clock that might be slightly out of sync?",
            techExplanation: "Eric Brewer's CAP Theorem proves that a distributed data store can simultaneously guarantee at most two out of three properties: Consistency (every read receives the most recent write), Availability (every non-failing node returns a response), and Partition Tolerance (system continues functioning despite arbitrary network drops between nodes). In real-world networks where partitions (P) are inevitable, systems must choose CP (e.g. Raft consensus in etcd, CockroachDB) or AP (e.g. eventual consistency in DynamoDB/Cassandra).",
            codeSnippet: `// Raft Distributed Consensus Algorithm State Machine:\nLeader ➔ Heartbeat Quorum [AppendEntries RPC]\nFollower ➔ Election Timeout ➔ Candidate State\nMajority Vote Quorum: (N / 2) + 1 Nodes\nLog Committed Once Replicated to Quorum`,
            keySpecs: ["CAP Theorem Tradeoffs", "Raft Consensus Algorithm", "Eventual Consistency vs Linearizability", "Quorum Replicated State Machines"]
        },
        {
            id: "kafka_streaming",
            icon: "🌊",
            num: "3",
            title: "Event-Driven Architecture & Apache Kafka",
            subtitle: "High-Throughput Partitioned Distributed Commit Logs",
            analogy: "An unstoppable bullet train with 100 passenger cars dropping parcels onto moving conveyor belts: producers write without waiting, and consumers process at their own speed!",
            techExplanation: "Synchronous REST calls create tight architectural coupling; if one microservice stalls, cascading timeouts occur. Event-driven architectures use distributed commit logs like Apache Kafka. Producers publish immutable event records to partitioned topics. Consumer groups read from partitions with independent offsets, enabling horizontally scalable stream processing capable of millions of events per second with zero message loss.",
            codeSnippet: `// Kafka Producer Event Payload:\nProducerRecord<String, PaymentEvent> record = new ProducerRecord<>(\n  "payments-topic",\n  "usr_994", // Partition Key\n  new PaymentEvent("PAY-882", 49.99, "USD", System.currentTimeMillis())\n);\nproducer.send(record); // Asynchronous non-blocking dispatch`,
            keySpecs: ["Append-Only Commit Log", "Partitioning & Consumer Groups", "Millions of Events / Sec", "At-Least-Once & Exactly-Once Semantics"]
        },
        {
            id: "k8s_orchestration",
            icon: "☸️",
            num: "4",
            title: "Containerization & Kubernetes Orchestration",
            subtitle: "Linux cgroups, Pods, Deployments & Service Meshes",
            analogy: "A robotic international shipping yard: millions of standard steel cargo containers are automatically stacked, scheduled, and routed to cargo ships without human intervention!",
            techExplanation: "Containers package code, system libraries, and runtime dependencies using Linux kernel namespaces (process isolation) and cgroups (resource limits). Kubernetes orchestrates container lifecycles declaratively across clusters: Pods, ReplicaSets, Deployments with automated rolling updates, Horizontal Pod Autoscaling (HPA) based on CPU/memory load, and Service Mesh proxies (Envoy) providing mutual TLS (mTLS) and distributed telemetry.",
            codeSnippet: `# Kubernetes Deployment Manifest:\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: cat-games-api\nspec:\n  replicas: 10\n  template:\n    spec:\n      containers:\n      - name: api\n        image: atw/cat-games-api:v2.1\n        resources:\n          limits: { cpu: "500m", memory: "512Mi" }`,
            keySpecs: ["Linux Namespaces & cgroups", "Declarative Desired State", "Zero-Downtime Rolling Deploys", "Mutual TLS Service Mesh (mTLS)"]
        },
        {
            id: "edge_anycast",
            icon: "🌐",
            num: "5",
            title: "Edge Computing & Global BGP Anycast",
            subtitle: "Border Gateway Protocol, V8 Isolates & Sub-Millisecond Compute",
            analogy: "Instead of ordering pizza from Italy, there is a master chef station placed at the corner of your street in every neighborhood on Earth!",
            techExplanation: "Traditional cloud architectures centralize compute in a few distant regions (e.g. us-east-1). Border Gateway Protocol (BGP) Anycast announces the same IP address simultaneously from hundreds of Points of Presence (PoPs) worldwide. When a user requests data, internet routing automatically directs packets to the geographically nearest datacenter. Using V8 Isolates (Cloudflare Workers, Deno Deploy), serverless code boots in under 5 milliseconds at the network edge.",
            codeSnippet: `// Cloudflare Worker / Edge Runtime (V8 Isolate):\nexport default {\n  async fetch(request, env, ctx) {\n    const clientCountry = request.cf.country;\n    const nearestPoP = request.cf.colo;\n    return new Response(JSON.stringify({\n      message: "Computed at the Edge in 1ms!",\n      pop: nearestPoP,\n      country: clientCountry\n    }), { headers: { "Content-Type": "application/json" } });\n  }\n};`,
            keySpecs: ["BGP Anycast Routing", "V8 Lightweight Isolates (<5ms cold start)", "Edge Key-Value (KV) Storage", "Global Sub-Millisecond Latency"]
        }
    ]
};
