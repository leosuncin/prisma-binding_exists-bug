# prisma-binding error on call `exists` functions if datamodel doesn't expose `id`

[![Greenkeeper badge](https://badges.greenkeeper.io/leosuncin/prisma-binding_exists-bug.svg)](https://greenkeeper.io/)

> This repository is a example to reproduce prisma-binding's issues [#275](https://github.com/prisma/prisma-binding/issues/275) [#252](https://github.com/prisma/prisma-binding/issues/252) [#215](https://github.com/prisma/prisma-binding/issues/215)

# Requirements

- node.js
- docker with docker-compose

# Setup

1. Clone this repository `git clone https://github.com/leosuncin/prisma-binding_exists-bug.git`
2. Install dependencies `yarn install` or `npm install`
3. Create file .env with environmental variables `cp .env.example .env`
4. Customize environmental variables, edit .env file
5. Run containers `docker-compose up -d`
6. Deploy Prisma `yarn db:deploy` or `npm run db:deploy`
7. Run the server `yarn debug` or `npm run debug`

# Test

1. Clean up the database `docker-compose down -v && sleep 3 && docker-compose up -d`
2. Restore database and fixtures `yarn db:deploy` or `npm run db:deploy`
3. Run functional tests `yarn test` or `npm test`

You can debug the application with Visual Studio Code, already includes the settings `launch.json`
