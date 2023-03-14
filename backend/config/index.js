require('dotenv').config()

const { REDIS_ENDPOINT_URI, REDIS_PASSWORD, REDIS_PORT } = process.env

module.exports = {
  redis: {
    endpointUri: REDIS_ENDPOINT_URI,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
}
