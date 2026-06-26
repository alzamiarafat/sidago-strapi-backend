"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::brand-page.brand-page", {
  config: {
    find: {
      auth: false,
    },
  },
});
