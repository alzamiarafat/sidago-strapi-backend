"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::business-process.business-process", {
  config: {
    find: {
      auth: false,
    },
  },
});
