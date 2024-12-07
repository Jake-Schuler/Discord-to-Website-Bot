# A website that takes messages from a discord server and puts them on a website

## Usage
Create a `.env` in both the `backend` and `frontend` folders

**Example `.env` files**

backend:
```
DISCORD_TOKEN=<DISCORD TOKEN HERE>
DISCORD_CHANNEL_ID=<CHANNEL ID HERE>
PORT=3000
```

frontend:
```
API_URL=http://js-dtwb-backend:3000/
```

then run `docker compose build && docker compose up -d`

And you should be set.

(ik I write bad documentation)

Made by Jake Schuler
