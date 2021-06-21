const { exec } = require('child_process');

const { google } = require('googleapis');
const { config } = require('../config');

const loggerController = require('../Controllers/Logger/serverLogger');

const fs = require('fs');

const cron = require('node-cron')
let task = cron.schedule('0 0 * * 0', () => { 
    console.log('started');
    createBackup();
});
module.exports.backUp = (req,res,next) => {
  createBackup(res);
};


function createBackup(res = '') {
  const now = new Date();
  const file = `ChochoPetBackUp${now.getFullYear() + '-' + now.getMonth() + '-'  + now.getDate() + '-' + now.getHours() + '-' + now.getMinutes()}.archive`;
  const filePath = `I:\\ChochoPet\\Dump\\`;
  exec(`mongodump -u aymenelom -p 261997 --ssl --host 192.168.1.104 --sslCAFile I:\\ChochoPet\\api-admin-chochopet\\api-admin\\admin-api\\bin\\mongoSSL\\rootCA.pem --sslPEMKeyFile I:\\ChochoPet\\api-admin-chochopet\\api-admin\\admin-api\\bin\\mongoSSL\\mongodb.pem --authenticationDatabase admin --tlsInsecure -d chochopet --archive=${filePath + file} `, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      loggerController.insertServerLogger({ level: 'ERROR', type: 'BACKUP', msg: 'BACKUP ERROR' + new Error(err) });
      if (res && res !=''){
        res.json({status:500,success:false,err:"Error While making Backup"});
      }
      return;
    }

    // the *entire* stdout and stderr (buffered)
    loggerController.insertServerLogger({ level: 'SUCCESS', type: 'BACKUP', msg: 'BACKUP SUCCESSFULL,' + file });
    prepareGoogle(filePath,file,res);
  });
}

async function prepareGoogle(filePath,fileName,res = '') {
  const auth2Client = new google.auth.OAuth2(config.googleDrive.clientId, config.googleDrive.clientSecret, config.googleDrive.redirectUri);
  auth2Client.setCredentials({ refresh_token: config.googleDrive.refreshToken });
  const drive = google.drive({
    version: 'v3',
    auth: auth2Client
  });
  uploadFile(drive,filePath,fileName,res);
}


async function uploadFile(drive, filePath,fileName,res = '') {
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
    deleteFile(filePath,fileName,res,'Back Up Database');
  }
  catch (error) {
    loggerController.insertServerLogger({ level: 'ERROR', type: 'DRIVE', msg: 'ERROR WHILE UPLOADING FILE TO DRIVE,' + new Error(error) });
    deleteFile(filePath,fileName);
    if (res && res !=''){
      res.json({status:500,success:false,err:"Error While making Backup"});
    }
  }
}


module.exports.loadFilesDrive = async (req,res,next) => {
  const auth2Client = new google.auth.OAuth2(config.googleDrive.clientId, config.googleDrive.clientSecret, config.googleDrive.redirectUri);
  auth2Client.setCredentials({ refresh_token: config.googleDrive.refreshToken });
  const drive = google.drive({
    version: 'v3',
    auth: auth2Client
  });
  try {
  const folderId = '1dR3rD4Tn4GadD3Rt4kSzZBUPevzuzSN1';
  const response = await drive.files.list({
    pageSize:200,
    orderBy:'createdTime desc',
    q: `'${folderId}' in parents and trashed=false and mimeType='text/plain'`
  })
    res.json({status:200,success:true,data:response.data.files})
  }
  
  catch (error){
    loggerController.insertServerLogger({ level: 'ERROR', type: 'DRIVE', msg: 'LAODING DATA FROM DRIVE,' + new Error(error) });
    res.json({status:500,success:false,err:'Error While Loading Data From Google Drive'})

  }
}

module.exports.downloadFile = async (req,globalRes,next) => {
  const fileId = req.body.fileId;
  const fileName = req.body.fileName;
  const auth2Client = new google.auth.OAuth2(config.googleDrive.clientId, config.googleDrive.clientSecret, config.googleDrive.redirectUri);
  auth2Client.setCredentials({ refresh_token: config.googleDrive.refreshToken });
  const filePath = 'I:\\ChochoPet\\Dump\\'
  const drive = google.drive({
    version: 'v3',
    auth: auth2Client
  });
 var dest = fs.createWriteStream(filePath + fileName);
 drive.files.get({fileId: fileId,alt:"media"}, {responseType: 'stream'},
  function(err, res){
     res.data
     .on('end', () => {
        loggerController.insertServerLogger({ level: 'SUCCESS', type: 'DRIVE', msg: 'FILE DOWNLOADED SUCCESSFULLY,' + fileName });
        console.log('Done');
        restoreDatabase(filePath,fileName,globalRes);
     })
     .on('error', err => {
      loggerController.insertServerLogger({ level: 'ERROR', type: 'DRIVE', msg: 'ERROR WHILE DOWNLOADING FILE,' + fileName + ', ' + new Error(err) });
      console.log('Error', err); 
      res.json({status:500,success:false,err:"Error downlading file"})
     })
     .pipe(dest);
  })
  
}

function restoreDatabase(filePath,fileName,res){
  exec(`mongorestore -u aymenelom -p 261997 --ssl --host 192.168.1.104 --sslCAFile I:\\ChochoPet\\api-admin-chochopet\\api-admin\\admin-api\\bin\\mongoSSL\\rootCA.pem --sslPEMKeyFile I:\\ChochoPet\\api-admin-chochopet\\api-admin\\admin-api\\bin\\mongoSSL\\mongodb.pem --authenticationDatabase admin --tlsInsecure  --archive=${filePath + fileName}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      loggerController.insertServerLogger({ level: 'ERROR', type: 'RESTORE', msg: 'RESTORE ERROR' + new Error(err) });
      res.json({status:500,success:false,err:"Error While making Restore"});
      return;
    }

    // the *entire* stdout and stderr (buffered)
    loggerController.insertServerLogger({ level: 'SUCCESS', type: 'RESTORE', msg: 'RESTORE SUCCESSFULL,' + fileName });
    deleteFile(filePath,fileName,res,'Restore')
  });
}

function deleteFile(filePath,fileName,res = '',msg = 'Restore'){
  fs.unlink(filePath + fileName, (err => {
    if (err)  {
      loggerController.insertServerLogger({ level: 'ERROR', type: 'FILE DELETE', msg: 'DELETE FILE,' + filePath + fileName + ', ' + new Error(err) }); 
      if (res && res != ''){
        res.json({status:500,success:false,err:"Error While making" + msg});
      }
    } 
    else {
      loggerController.insertServerLogger({ level: 'SUCCESS', type: 'FILE DELETE', msg: 'FILE DELETED SUCCESSFULLY,' + filePath + fileName });
      if (res && res != ''){
        res.json({status:200,success:true,msg:msg + " Successfull"})
      }
    }
  }));
}


