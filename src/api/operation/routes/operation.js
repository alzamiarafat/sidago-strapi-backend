"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::operation.operation", {
  config: {
    find: {
      auth: false,
    },
  },
});
