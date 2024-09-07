'use strict';

/**
 * notification router
 */

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createCore... Remove this comment to see the full error message
const { createCoreRouter } = require('@strapi/strapi').factories;

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = createCoreRouter('api::notification.notification');
