"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::performance.performance", {
  config: {
    find: {
      auth: false,
    },
  },
});
