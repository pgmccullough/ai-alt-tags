FROM denoland/deno:1.41.0

WORKDIR /app

COPY . .

EXPOSE 8080

CMD ["run", "--watch", "--allow-net", "--allow-read", "--allow-env", "main.ts"]