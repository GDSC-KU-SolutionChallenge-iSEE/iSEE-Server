# iSee-Server
Server application for **iSee** project, attending [GoogleSolutionChallenge2024](https://developers.google.com/community/gdsc-solution-challenge). 

iSee aims to provide visual assitance for individuals with visual impairments. 

## TL;DR
```bash
docker build . -t isee-server:v0.1
docker run 
```

## Build from source
### 0. Prerequisites
- [cargo](https://github.com/rust-lang/cargo) : rust dependency manager (v1.75.0)
- [rustc](https://github.com/rust-lang/rust) : rust compiler (v1.75.0)

  
### 1. Build&Run
```bash
git clone https://github.com/GDSC-KU-SolutionChallenge-iSEE/iSEE-Server.git

cd iSEE-Server

cargo run
```

