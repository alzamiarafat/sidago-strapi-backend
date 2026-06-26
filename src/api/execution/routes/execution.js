"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::execution.execution", {
  config: {
    find: {
      auth: false,
    },
  },
});
