# iSee-Server
Server application for **iSee** project, attending [GoogleSolutionChallenge2024](https://developers.google.com/community/gdsc-solution-challenge). 

iSee aims to provide visual assitance for individuals with visual impairments. 

## TL;DR
### isee-stream-server
```bash
docker build -f docker/Dockerfile.stream.prod -t isee-stream-server:v0.1 .
docker -p 9000:9000 run 
```

## Build from source
### 0. Prerequisites
- [cargo](https://github.com/rust-lang/cargo) : rust dependency manager (v1.75.0)
- [rustc](https://github.com/rust-lang/rust) : rust compiler (v1.75.0)

  
### 1. Build&Run
```bash
git clone https://github.com/GDSC-KU-SolutionChallenge-iSEE/iSEE-Server.git

cd iSEE-Server/isee-stream-server

cargo run
```

## Development
```bash
# isee-stream-server
cargo watch -c -x run
```

