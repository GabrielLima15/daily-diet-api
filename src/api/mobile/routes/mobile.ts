// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  routes: [
    {
      "method": "GET",
      "path": "/mobile/deeplink",
      "handler": "mobile.deeplink",
      "config": {
        "policies": [],
        "prefix": "",
        "description": "Redirect to app deeplink with redirect params"
      }
    },
    {
      "method": "GET",
      "path": "/mobile/store",
      "handler": "mobile.store",
      "config": {
        "policies": [],
        "prefix": "",
        "description": "Redirect to app store"
      }
    }
  ],
};
