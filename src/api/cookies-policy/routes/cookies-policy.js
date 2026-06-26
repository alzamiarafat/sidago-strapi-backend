"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::cookies-policy.cookies-policy", {
  config: {
    find: {
      auth: false,
    },
  },
});
