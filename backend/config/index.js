require('dotenv').config()

const { REDIS_ENDPOINT_URI, REDIS_PASSWORD } = process.env

module.exports = {
  redis: {
    endpointUri: REDIS_ENDPOINT_URI,
    password: REDIS_PASSWORD,
  },
}
