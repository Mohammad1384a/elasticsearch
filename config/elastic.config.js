const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();
const { USERNAME, PASSWORD, HOST } = process.env;

const elasticClient = new Client({
  node: HOST,
  auth: {
    username: USERNAME,
    password: PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  elasticClient,
};
