"use strict";
import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  MONGO_URL,
  JWT_SECRET,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  EMAIL_HOST,
} = process.env;

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");

const config = {
  port: PORT,
  host: HOST,
  hostURL: HOST_URL,
  mongoURL: MONGO_URL,
  jwtSecret: JWT_SECRET,
  email: {
    address: EMAIL_ADDRESS,
    password: EMAIL_PASSWORD,
    host: EMAIL_HOST,
  },
};

export default config;
