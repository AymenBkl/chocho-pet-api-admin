const { exec } = require('child_process');

const { google } = require('googleapis');
const { config } = require('../config');

const loggerController = require('../Controllers/Logger/serverLogger');

const fs = require('fs');


var fstream = require('fstream'),
  tar = require('tar'),
  zlib = require('zlib');
module.exports.backUp = createBackup();


function createBackup() {
  const file = `ChochoPetBackUp${new Date().getTime()}.txt`;
  const filePath = `I:\\ChochoPet\\Dump\\`;
  exec(`mongodump -u aymenelom -p 261997 --ssl --host 192.168.1.104 --sslCAFile I:\\ChochoPet\\api-admin-chochopet\\api-admin\\admin-api\\bin\\mongoSSL\\rootCA.pem --sslPEMKeyFile I:\\ChochoPet\\api-admin-chochopet\\api-admin\\admin-api\\bin\\mongoSSL\\mongodb.pem --authenticationDatabase admin --tlsInsecure -d chochopet --archive=${filePath + file} --gzip`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      loggerController.insertServerLogger({ level: 'ERROR', type: 'BACKUP', msg: 'BACKUP ERROR' + new Error(err) });
      return;
    }

    // the *entire* stdout and stderr (buffered)
    loggerController.insertServerLogger({ level: 'SUCCESS', type: 'BACKUP', msg: 'BACKUP SUCCESSFULL,' + file });
    prepareGoogle(filePath,file);
  });
}

async function prepareGoogle(filePath,fileName) {
  const auth2Client = new google.auth.OAuth2(config.googleDrive.clientId, config.googleDrive.clientSecret, config.googleDrive.redirectUri);
  auth2Client.setCredentials({ refresh_token: config.googleDrive.refreshToken });
  const drive = google.drive({
    version: 'v3',
    auth: auth2Client
  });
  
 loadFilesDrive(drive);
 //uploadFile(drive,filePath,fileName);
}


async function uploadFile(drive, filePath,fileName) {
  try {
    const folderId = '1dR3rD4Tn4GadD3Rt4kSzZBUPevzuzSN1';
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: 'text/plain',
        parents:[folderId]
      },
      media: {
        mimeType: 'text/plain',
        body: fs.createReadStream(filePath + fileName),
      },
      
    })
    loggerController.insertServerLogger({ level: 'SUCCESS', type: 'DRIVE', msg: 'DRIVE UPLOAD SUCCESSFULLY SUCCESSFULL,' + response.data });
    deleteFile(filePath,fileName);
  }
  catch (error) {
    loggerController.insertServerLogger({ level: 'ERROR', type: 'DRIVE', msg: 'ERROR WHILE UPLOADING FILE TO DRIVE,' + new Error(error) });
    deleteFile(filePath,fileName);
  }
}


async function loadFilesDrive(drive){
  try {
    const folderId = '1dR3rD4Tn4GadD3Rt4kSzZBUPevzuzSN1';
  const response = await drive.files.list({
    pageSize:200,
    q: `'${folderId}' in parents and trashed=false`
  })
    console.log(response.data.files);
  }
  
  catch (error){

  }
}

function deleteFile(filePath,fileName){
  fs.unlink(filePath + fileName, (err => {
    if (err)   loggerController.insertServerLogger({ level: 'ERROR', type: 'FILE DELETE', msg: 'DELETE FILE,' + filePath + fileName + ', ' + new Error(err) }); 
    else {
      loggerController.insertServerLogger({ level: 'SUCCESS', type: 'FILE DELETE', msg: 'FILE DELETED SUCCESSFULLY,' + filePath + fileName });
    }
  }));
}


