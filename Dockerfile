# Use the official Rust image from the Docker Hub
FROM rust:1.75-alpine

WORKDIR /app

COPY . .

RUN cargo build --release

CMD ["/app/target/release/isee-server"]