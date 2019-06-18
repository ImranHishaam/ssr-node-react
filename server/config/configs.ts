
import * as dotenv from 'dotenv';

dotenv.config()

const config = {
  app: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY
  }
};

module.exports = config;