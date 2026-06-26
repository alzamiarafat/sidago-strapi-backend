"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::contact-page.contact-page", {
  config: {
    find: {
      auth: false,
    },
  },
});
