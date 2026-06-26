"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::site-page.site-page", {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
