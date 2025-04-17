# streamplace overlay thing

Uses [Bun](https://bun.sh) but you could probably also just use yarn or npm or whatever. I run server.js using [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) and then reverse proxy it using [caddy](https://caddyserver.com) as my server management tool. you'll want to set up a separate subdomain for the server vs the actual frontend i think

if you go to the frontend index.html page it'll give you a form w/ limited config options for your overlay. i might add more or like a custom css field but that's what we've got so far; if you want something custom you can ofc clone this and fuck around

then add your url as a browser source to obs. tada

## local dev

`bun i` to install dependencies (there are not many)

`bun run server.js` to run the server application

do something like `npx http-server` in this folder to run the overlay. you can do this a lot of different ways probably so as long as it serves it to something it's whatever