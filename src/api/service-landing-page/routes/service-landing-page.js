"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::service-landing-page.service-landing-page", {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
