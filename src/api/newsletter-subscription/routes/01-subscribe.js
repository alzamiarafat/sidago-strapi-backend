"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/newsletter-subscriptions/subscribe",
      handler: "newsletter-subscription.subscribe",
      config: {
        auth: false,
      },
    },
  ],
};
