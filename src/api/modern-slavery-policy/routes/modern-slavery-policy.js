"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::modern-slavery-policy.modern-slavery-policy", {
  config: {
    find: {
      auth: false,
    },
  },
});
