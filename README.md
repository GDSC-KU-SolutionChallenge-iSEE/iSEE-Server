# iSee-Server

Server application for **iSee** project, attending [GoogleSolutionChallenge2024](https://developers.google.com/community/gdsc-solution-challenge). 

iSee aims to provide visual assitance for individuals with visual impairments. 

## TL;DR
### isee-server
```bash
docker build -f docker/Dockerfile.server.prod -t isee-server:v0.1 .
docker -p 3000:3000 run 
```

### isee-stream-server
```bash
docker build -f docker/Dockerfile.stream.prod -t isee-stream-server:v0.1 .
docker -p 9000:9000 run 
```

## Build from source
### 0. Prerequisites
- `isee-stream-server`
  - [cargo](https://github.com/rust-lang/cargo) : rust dependency manager (v1.75.0)
  - [rustc](https://github.com/rust-lang/rust) : rust compiler (v1.75.0)
- `isee-server`
  - DB setup required for [prisma](https://www.prisma.io/)
  - `.env` configuration as `isee-server/.env.example`
  - Bus config : `config/*.json` required
  
### 1. Build&Run
### isee-server
```bash
git clone https://github.com/GDSC-KU-SolutionChallenge-iSEE/iSEE-Server.git

cd iSEE-Server/isee-server

npm install
npx prisma generate
npm run build
npm run start:prod
```

### isee-stream-server
```bash
git clone https://github.com/GDSC-KU-SolutionChallenge-iSEE/iSEE-Server.git

cd iSEE-Server/isee-stream-server

cargo run
```

## Development
```bash
# isee-server
# on initial run
npm run db:init:dev
# on db schema revision (for prisma)
npm run db:save:dev
# start&watch nestjs application
npm run start:dev

# isee-stream-server
cargo watch -c -x run
```

