'use strict';

const bcrypt = require('bcrypt');

/**
 * A set of functions called "actions" for `me`
 */

module.exports = {
  read: async (ctx) => {
    const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

    const register = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: {
        id: user.id
      }
    });

    delete register['password'];

    return register;
  },
  update: async (ctx) => {
    const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

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
  updatePassword: async (ctx) => {
    const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

    if (!body.password) { return ctx.badRequest("A senha é obrigatória.", { code: "BadRequest", status: "400" }); }

    const password = bcrypt.hashSync(body.password, 10);
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
  remove: async (ctx) => {
    const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

    const register = await strapi.db.query("plugin::users-permissions.user").delete({
      where: {
        id: user.id
      }
    });

    return register;
  },
};
