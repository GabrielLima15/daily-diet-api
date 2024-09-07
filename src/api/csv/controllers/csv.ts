'use strict';

// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
var Json2csvParser = require('json2csv').Parser;
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const csv = require("csvtojson");


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'saveFile'.
const saveFile = (fileToUpload: any) => {
  return new Promise(async (resolve) => {
    const fileResult = await fs.readFileSync(fileToUpload.path);
    // @ts-expect-error TS(2580): Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const fileData = Buffer.from(fileResult);
    // @ts-expect-error TS(2304): Cannot find name '__dirname'.
    const destinationFolder = __dirname + "/../../../../public/";
    const fileName = fileToUpload.name;
    const destinationFilePath = path.join(destinationFolder, fileName);
    fs.writeFile(destinationFilePath, fileData, (err: any) => {
      if (err) {
        console.error('Error saving file:', err);
      } else {
        resolve(destinationFilePath);
        // resolve(fileData);
      }
    });
  });
}

const convertCsvToJson = async (csvFilePath: any) => {
  try {
    const data = await csv().fromFile(csvFilePath)
    //remove file
    return data

  } catch (error) {
    console.error('Erro ao converter CSV para JSON:', error);
    return [];
  }
};

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  download: async (ctx: any) => {
    try {
      let { table, filter, omit, prep } = ctx.request.query;

      if (!table) {
        // @ts-expect-error TS(2552): Cannot find name 'badRequest'. Did you mean 'IDBRe... Remove this comment to see the full error message
        return badRequest("table is empty");
      }

      // @ts-expect-error TS(2304): Cannot find name 'strapi'.
      const model = strapi.db.config.models.find((model: any) => model.collectionName === table);
      // @ts-expect-error TS(2304): Cannot find name 'strapi'.
      var data = await strapi.db.query(model?.uid).findMany(JSON.parse(filter || "{}"));

      if (omit) {
        const omitParse = (obj: any, arr: any) =>
          Object.keys(obj)
            .filter(k => !arr.includes(k))
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

        omit = JSON.parse(omit)

        data = data.map((item: any) => omitParse(item, omit));

      }

      if (prep) {
        prep = JSON.parse(prep);
        data = data.map((item: any) => ({
          ...prep,
          ...item
        }))
      }

      if (data?.length > 0) {
        let columns = [];
        // @ts-expect-error TS(2304): Cannot find name 'strapi'.
        let listColumns = strapi.db.config.models.find((f: any) => f.uid === model.uid)
        for (var i of Object.keys(listColumns?.attributes)) {
          columns.push(i);
        }

        const json2csvParser = new Json2csvParser({ columns });
        const csv = json2csvParser.parse(data);

        ctx.response.attachment("data.csv")
        ctx.response.type = 'text/csv; charset=utf-8';
        ctx.body = csv
      }

    } catch (error) {
      ctx.badRequest(error);

    }
  },
  upload: async (ctx: any) => {
    try {
      const { files } = ctx.request;

      const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

      if (!files) return ctx.body = "empty files";

      const file = await saveFile(files.file);
      const result = await convertCsvToJson(file)

      if (result.length === 0) return ctx.badRequest("no rows in file")

      let successes = 0

      for (const row in result) {
        // process your row
        // const currentRow = result[row]
        // await strapi.db.query("api::process-user.process-user").create({ data: payload })
      }

      ctx.body = {
        "message": "completed upload",
        success: successes === result?.length
      }

    } catch (error) {
      console.log(error)
      ctx.badRequest(error);

    }
  },
};

