# HumanBridge - Development Roadmap

Each phase must work and be tested before the next one starts. Every finished step is committed to Git.

| Phase | Goal |
|---|---|
| 0 | Environment setup (Node, Java, Python, Git, Docker) - done |
| 1 | Project skeleton: frontend, backend, ml-service each run a basic "hello" |
| 2 | Database and Redis with Docker Compose |
| 3 | Authentication: mobile OTP, Google login, QR device pairing |
| 4 | Onboarding and communication/accessibility profile |
| 5 | Contacts: search, requests, block, online status |
| 6 | Voice calls: signaling and WebRTC audio |
| 7 | Video calls |
| 8 | Speech to live captions |
| 9 | Sign recognition (controlled ISL vocabulary prototype) |
| 10 | Translation, context awareness, confidence and fallback |
| 11 | Admin portal with real backend data |
| 12 | Security hardening |
| 13 | Testing: unit, integration, load |
| 14 | Deployment |

## Rules

- No fake data. Every feature is wired to real APIs and a real database.
- Low-confidence AI results are never shown as certain.
- AI failure must never become communication failure.