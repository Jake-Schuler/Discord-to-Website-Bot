FROM node:lts AS runtime
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
ENV API_URL=http://js-dtwb-backend:8000/
EXPOSE 4321
CMD node ./dist/server/entry.mjs
