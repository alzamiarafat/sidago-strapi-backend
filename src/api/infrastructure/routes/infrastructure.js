"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::infrastructure.infrastructure", {
  config: {
    find: {
      auth: false,
    },
  },
});
