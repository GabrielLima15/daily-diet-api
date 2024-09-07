
const { releaseNotification } = require('./notifier/push')

module.exports = {
    "* */30 * * * * ": async ({ strapi }) => {
        console.log("Cron JOB Event")
    },
    
    "*/15 * * * *": async ({ strapi }) => {
        const registers = await strapi.entityService.findMany('api::notification.notification', { 
            filters:{
                $or:[
                    {
                        processed: {
                            $eq: false
                        }
                    },
                    {
                        processed: {
                            $eq: null
                        }
                    },
                ]
            },
        });    
        if(registers?.length){ registers.map(releaseNotification) ;}
    },
};  