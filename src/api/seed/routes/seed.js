"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/seed",
      handler: "seed.create",
      config: {
        auth: false,
      },
    },
  ],
};
