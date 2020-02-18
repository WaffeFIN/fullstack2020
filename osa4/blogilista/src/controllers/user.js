const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => { 
	const users = await User.find({})
	response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined ||
	  ("" + body.password).length < 3) {
    return response.status(400).json({ error: 'too short password' })
  }

  const saltRounds = 10
  const hash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    login: body.login,
    name: body.name,
    hash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter