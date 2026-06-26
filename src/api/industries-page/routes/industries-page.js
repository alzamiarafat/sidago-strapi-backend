"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::industries-page.industries-page", {
  config: {
    find: {
      auth: false,
    },
  },
});
