"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::legal-hub.legal-hub", {
  config: {
    find: {
      auth: false,
    },
  },
});
