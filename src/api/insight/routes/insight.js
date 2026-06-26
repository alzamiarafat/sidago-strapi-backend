"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::insight.insight", {
  config: {
    find: {
      auth: false
    }
  }
});
