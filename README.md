# Express MongoDB + Vue Example

## Requirements

- Node v16 (preferably through [NVM](https://github.com/nvm-sh/nvm))
- NPM
- MongoDB ([Installation guide on MacOS](https://www.robinwieruch.de/mongodb-macos-setup/))

## Run Develeopment

```
nvm use # (If you use NVM)
npm i
npm run dev
```

Frontend runs on http://localhost:3000 with hot reload
API runs on http://localhost/3030 (you can change port in .env) with nodemon (to restart api when files are changed)

## Run Production

```
npm i
npm start
```

Both frontend and api is un on port 3030 (you can change port in .env)
