'use strict';

// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const bcrypt = require('bcrypt');

/**
 * A set of functions called "actions" for `me`
 */

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  read: async (ctx: any) => {
    const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

    // @ts-expect-error TS(2304): Cannot find name 'strapi'.
    const register = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: {
        id: user.id
      }
    });

    delete register['password'];

    return register;
  },
  update: async (ctx: any) => {
    const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

    // @ts-expect-error TS(2304): Cannot find name 'strapi'.
    const register = await strapi.db.query("plugin::users-permissions.user").update({
      where: {
        id: user.id
      },
      data: {
        ...body
      }
    });

    delete register['password'];

    return register;
  },
  updatePassword: async (ctx: any) => {
    const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

    if (!body.password) { return ctx.badRequest("A senha é obrigatória.", { code: "BadRequest", status: "400" }); }

    const password = bcrypt.hashSync(body.password, 10);
    // @ts-expect-error TS(2304): Cannot find name 'strapi'.
    const register = await strapi.query("plugin::users-permissions.user").update({
      where: {
        id: user.id
      },
      data: { 
        password: password, 
        id: user.id 
      }
    });

    delete register['password'];

    return register;
  },
  remove: async (ctx: any) => {
    const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

    // @ts-expect-error TS(2304): Cannot find name 'strapi'.
    const register = await strapi.db.query("plugin::users-permissions.user").delete({
      where: {
        id: user.id
      }
    });

    return register;
  },
};
