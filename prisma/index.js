const { Prisma } = require('prisma-binding')

module.exports = new Prisma({
  typeDefs: 'prisma/generated.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
})
