'use strict';

/**
 * A set of functions called "actions" for `notifier`
 */

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {

  notifications: async (ctx: any) => {
      const { params: params, state: { user: user }, request: { body: body, query: query, header} } = ctx;

      // @ts-expect-error TS(2304): Cannot find name 'strapi'.
      const register = await strapi.query('api::notification.notification').findMany({ 
        where:{
          user: user.id
        }
       });

      return ctx.send([
          ...register
      ]);
  },
  saveDeviceToken: async (ctx: any) => {
      const { params: params, state: { user: user }, request: { body: body, query: query, header} } = ctx;

      // @ts-expect-error TS(2304): Cannot find name 'strapi'.
      let register = await strapi.query('api::devicetoken.devicetoken').findOne({ 
        where:{
          user: user.id, ...body
        }
       });
      if(!register?.id){
          // @ts-expect-error TS(2304): Cannot find name 'strapi'.
          register = await strapi.query('api::devicetoken.devicetoken').create({ 
            data:{
              user: user.id, ...body
            }
          });
      }

      return ctx.send({ 
          ...register
      });
  },
  updateNotification: async (ctx: any) => {
      const { params: params, state: { user: user }, request: { body: body, query: query, header} } = ctx;

      // @ts-expect-error TS(2304): Cannot find name 'strapi'.
      let register = await strapi.query('api::notification.notification').update({
        where:{ id: params.id }, 
        data: { ...body }
      });

      return ctx.send({ 
          ...register
      });
  },
  remove: async (ctx: any) => {
      const { params: params, state: { user: user }, request: { body: body, query: query, header} } = ctx;

      // @ts-expect-error TS(2304): Cannot find name 'strapi'.
      const register = await strapi.query('api::notification.notification').delete({ 
        where:{
          user: user.id, id: params.id
        }
       });

      return ctx.send({ 
          ...register
      });
  },
  removeAll: async (ctx: any) => {
      const { params: params, state: { user: user }, request: { body: body, query: query, header} } = ctx;

      // @ts-expect-error TS(2304): Cannot find name 'strapi'.
      const register = await strapi.query('api::notification.notification').delete({ 
        where:{
          user: user.id
        }
      });

      return ctx.send({ 
          ...register
      });
  },
};






