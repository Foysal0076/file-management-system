const jwt = require('jsonwebtoken')

import { dummyUsers } from './dummyData'

const authenticateUser = (email: string, password: string) => {
  const dummyUser = dummyUsers.find(
    (user) => user.email === email && user.password === password
  )
  if (!dummyUser) {
    throw new Error('User is not registered')
  }

  if (password !== dummyUser.password) {
    throw new Error('Invalid password')
  }

  const jsonwebtoken = jwt.sign(
    {
      id: dummyUser.id,
      name: dummyUser.name,
      email: dummyUser.email,
      iat: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET,
    { expiresIn: 7 * 24 * 60 * 60 } //7 days
  )

  return {
    id: dummyUser.id,
    name: dummyUser.name,
    email: dummyUser.email,
    token: jsonwebtoken,
  }
}

//verify token
const verifyToken = (token: string) => {
  try {
    const bearerToken =
      token.split(' ')[0] === 'Bearer' ? token.split(' ')[1] : token
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET)
    return decoded
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}

export const authService = { authenticateUser, verifyToken }
