// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = (config: any, {
    strapi
}: any) => {
    return async (ctx: any, next: any) => {
        if (ctx.path === '/') {
            ctx.redirect(strapi.config.get('server.admin.url', '/admin'));
            return
        }
        await next()
    };
};