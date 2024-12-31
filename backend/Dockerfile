FROM denoland/deno
WORKDIR /app

COPY . .

RUN deno cache main.js

ENV PORT=8000

EXPOSE 8000
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.js"]
