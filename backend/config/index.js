require('dotenv').config()

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = process.env

module.exports = {
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
}
