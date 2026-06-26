"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::careers-page.careers-page", {
  config: {
    find: {
      auth: false,
    },
  },
});
