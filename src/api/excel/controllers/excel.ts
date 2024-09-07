'use strict';

/**
 * Upload interface to use Instead CSV upload
 */
 
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path'); 
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const reader = require('xlsx');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'saveFile'.
const saveFile = (fileToUpload: any) => {
  if(!fileToUpload){ return ;}
  return new Promise(async (resolve) => {
    const fileResult = await fs.readFileSync(fileToUpload?.path);
    // @ts-expect-error TS(2580): Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const fileData = Buffer.from(fileResult);
    // @ts-expect-error TS(2304): Cannot find name '__dirname'.
    const destinationFolder = __dirname + "/../../../../public/uploads";
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

const processXls = (path: any) => {
  // Reading our test file
  return new Promise(resolve => {
    const file = reader.readFile(path)
    let data: any = []
    const sheets = file.SheetNames
    // console.log({ sheets })
    for(let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json( file.Sheets[file.SheetNames[i]] )
      temp.forEach((res: any) => data.push(res) )
    }
    resolve(data)
  });
} 

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  upload: async (ctx: any, next: any) => {
    try {
      const { files } = ctx.request;

      const { params: params, state: { user: user }, request: { body: body, query: query, header } } = ctx;

      if (!files) return ctx.body = "empty files";

      const file = await saveFile(files.file);
      const result = await processXls(file)
      
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (result.length === 0) return ctx.badRequest("no rows in file")

      // Process your file
        
      // const payloads = makePayloads(result, body)
      // const promises = payloads.map(p => createOrUpdate(p))
      // const results = await Promise.all(promises)

      ctx.body = {
        "message": "completed upload",
        // @ts-expect-error TS(2552): Cannot find name 'results'. Did you mean 'result'?
        success: (results?.length === result?.length)
      }

      return ;

    } catch (error) {
      console.log(error)
      ctx.badRequest(error);

    }
  }
};



const createOrUpdate = async ({
  data
}: any) => {
  // @ts-expect-error TS(2304): Cannot find name 'strapi'.
  let already = await strapi.db.query("api::pre-user.pre-user").findOne({ where: { name:data?.name, classification:data?.classification, process:data?.process } })
  if( already?.id ) { 
    // @ts-expect-error TS(2304): Cannot find name 'strapi'.
    return await strapi.db.query("api::pre-user.pre-user").update({ where: { id: already?.id }, data }) ;
  }
  // @ts-expect-error TS(2304): Cannot find name 'strapi'.
  return await strapi.db.query("api::pre-user.pre-user").create({ data }) ;
}

const makePayloads = (result: any, body: any) => {
  return result?.map((m: any) => ({
    data: {
      name: m?.__EMPTY_1,
      // @ts-expect-error TS(2304): Cannot find name 'EnumClasses'.
      classification: EnumClasses?.[m?.__EMPTY_2],
      value: m?.__EMPTY_5,
      procurator: m?.__EMPTY_6,
      procurator_phone: m?.__EMPTY_8,
      procurator_email: m?.__EMPTY_7,
      license: (m?.__EMPTY_9 === "S"),
      presence: (m?.__EMPTY_10 === "S"),
      vote: (m?.__EMPTY_11 === "S"),
      process: body?.process
    }
  }));
}
