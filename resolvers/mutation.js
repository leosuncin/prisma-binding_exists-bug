const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function setupToken({ email, scopes }, ctx) {
  const token = jwt.sign({ email, scopes }, process.env.APP_SECRET)

  ctx.response.header('Authorization', `Bearer ${token}`)
}

module.exports = {
  async signup(parent, args, ctx) {
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(args.password, salt)
    const user = await ctx.db.mutation.createUser(
      {
        data: { ...args, password, roles: { set: ['USER'] } },
      },
      '{ name email password roles }',
    )

    setupToken(user, ctx)

    return user
  },

  async login(parent, { email, password }, ctx) {
    const user = await ctx.db.query.user(
      {
        where: { email },
      },
      '{ name email password roles }',
    )

    if (!user) throw new Error('Incorrect email or password.')

    if (!(await bcrypt.compare(password, user.password)))
      throw new Error('Incorrect email or password.')

    setupToken(user, ctx)

    return user
  },
}
