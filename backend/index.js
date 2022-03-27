import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import path from 'path'

import models, { connectDb } from './models'
import routes from './routes'

const app = express()

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors())

// Built-In Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Custom Middleware

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('janedoe') // TODO: get this from Bearer Token
  }
  next()
})

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

const eraseDatabaseOnSync = true

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({})
    ])

    createUsersWithMessages()
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  )
})

// * Database Seeding * //

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'janedoe'
  })

  const user2 = new models.User({
    username: 'johndoe'
  })

  const message1 = new models.Message({
    text: 'Message 1',
    user: user1.id
  })

  const message2 = new models.Message({
    text: 'Message 2',
    user: user2.id
  })

  const message3 = new models.Message({
    text: 'Message 3',
    user: user2.id
  })

  await message1.save()
  await message2.save()
  await message3.save()

  await user1.save()
  await user2.save()
}
