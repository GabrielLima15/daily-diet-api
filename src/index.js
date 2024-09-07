'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // strapi.db.lifecycles.subscribe({
    //   models: ['api::process.process'],

    //   async afterCreate(event) {
    //     try {

    //       if (event?.result?.id) { 

    //         await strapi.db.query('api::process.process').update({
    //           where: {
    //             id: event.result.id
    //           },
    //           data: { }
    //         })

    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   },
      
    // });
  },
};
