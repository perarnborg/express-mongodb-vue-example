import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import path from 'path'

import models, { connectDb } from './models'
import routes from './routes'
import createSignedInUserMiddleware from './middleware/signed-in-user'

const app = express()

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors())

// Built-In Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Custom Middleware

app.use(createSignedInUserMiddleware(models))

// * Routes * //

app.use('/api/session', routes.session)
app.use('/api/users', routes.user)
app.use('/api/messages', routes.message)

// * Serve frontend in production * //
app.use(express.static(__dirname + '/../frontend/dist'))
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '/../frontend/dist/index.html'))
})

// * Start * //

const eraseDatabaseOnSync = false // NOTE: Set to true if you want to flush db on startup

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({})
    ])
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  )
})
