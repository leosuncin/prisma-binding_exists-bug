module.exports = {
  async existsEmail(parent, { email }, ctx) {
    // BUG: won't work if model definition doesn't expose `id`
    return await ctx.db.exists.User({ email })

    // This work without exposes `id`
    // const result = await ctx.db.query.user({where: {email}})
    // return Boolean(result)
  },
}
