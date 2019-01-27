const { GraphQLServer } = require('graphql-yoga')
const jwt = require('jsonwebtoken')

const resolvers = require('./resolvers')
const db = require('./prisma')

const options = {
  resolvers,
  typeDefs: './schema.graphql',
  context: req => ({ ...req, db }),
}

const server = new GraphQLServer(options)

server.express.use((req, res, next) => {
  const { authorization = '' } = req.headers
  const token = authorization.split(' ')[1]

  if (token) {
    const { iat, ...user } = jwt.verify(token, process.env.APP_SECRET)
    req.user = user
  }

  return next()
})

server.start(deets => {
  console.log(`Server is now running on port http:/localhost:${deets.port}`)
})
