// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  routes: [
    {
      "method": "GET",
      "path": "/csv/download",
      "handler": "csv.download",
      "config": {
        "policies": []
      }
    },
    {
      "method": "POST",
      "path": "/csv/upload",
      "handler": "csv.upload",
      "config": {
        "policies": []
      }
    }
  ],
};