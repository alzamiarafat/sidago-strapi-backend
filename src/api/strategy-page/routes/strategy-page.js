"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::strategy-page.strategy-page", {
  config: {
    find: {
      auth: false,
    },
  },
});
