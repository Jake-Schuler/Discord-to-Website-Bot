FROM denoland/deno
WORKDIR /app

COPY . .

RUN deno cache main.ts

ENV PORT=8000
ENV DISCORD_TOKEN=null

EXPOSE 8000
CMD ["run", "--allow-net", "main.ts"]