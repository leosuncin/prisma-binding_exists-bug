const resolvers = require('../resolvers')
const db = require('../prisma')

describe('Mutations', () => {
  it('Should allow to sign up', async () => {
    const args = {
      email: `john.doe-${Date.now()}@example.com`,
      name: 'John Doe',
      password: 'Pa$$w0rd',
      bio: `Joined on ${new Date().toLocaleDateString()}`,
    }
    const context = {
      request: {},
      response: {
        header: jest.fn(),
      },
      db,
    }

    const resp = await resolvers.Mutation.signup(null, args, context)

    expect(resp).toMatchObject({
      email: expect.stringMatching(/john.doe-\d+@example.com/),
      name: args.name,
      roles: expect.arrayContaining(['USER']),
    })
    expect(context.response.header).toHaveBeenCalledWith(
      'Authorization',
      expect.stringMatching(/^Bearer /),
    )
  })

  it('Should allow to sign in', async () => {
    const args = {
      email: 'hazel.mckinney24@example.com',
      password: 'kathleen',
    }
    const context = {
      request: {},
      response: {
        header: jest.fn(),
      },
      db,
    }

    const resp = await resolvers.Mutation.login(null, args, context)

    expect(resp).toMatchObject({
      email: args.email,
      name: 'Hazel Mckinney',
      roles: expect.arrayContaining(['USER']),
    })
    expect(context.response.header).toHaveBeenCalledWith(
      'Authorization',
      expect.stringMatching(/^Bearer /),
    )
  })

  it('Should fail to sign in whith wrong credentials', () => {
    const context = {
      request: {},
      response: {
        header: jest.fn(),
      },
      db,
    }

    expect(
      Promise.all([
        resolvers.Mutation.login(
          null,
          {
            email: 'hazel.mckinney24@example.com',
            password: 'Pa$$w0rd',
          },
          context,
        ),
        resolvers.Mutation.login(
          null,
          {
            email: 'john-titor@future.wow',
            password: 'Pa$$w0rd',
          },
          context,
        ),
      ]),
    ).rejects.toThrow('Incorrect email or password.')
    expect(context.response.header).not.toHaveBeenCalled()
  })
})

describe('Queries', async () => {
  it('Should allow to check if email exists', async () => {
    const context = {
      db,
    }

    const [toExists, toNotExists] = await Promise.all([
      resolvers.Query.existsEmail(
        null,
        { email: 'hazel.mckinney24@example.com' },
        context,
      ),
      resolvers.Query.existsEmail(
        null,
        { email: 'john-titor@future.wow' },
        context,
      ),
    ])

    expect(toExists).toBe(true)
    expect(toNotExists).toBe(false)
  })
})
