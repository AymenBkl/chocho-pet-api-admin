const { exec } = require('child_process');

module.exports.backUp = exec(`mongodump -u aymenelom -p 261997 --ssl --host 192.168.1.104 --sslCAFile I:\\ChochoPet\\api-admin-chochopet\\api-admin\\admin-api\\bin\\mongoSSL\\rootCA.pem --sslPEMKeyFile I:\\ChochoPet\\api-admin-chochopet\\api-admin\\admin-api\\bin\\mongoSSL\\mongodb.pem --authenticationDatabase admin --tlsInsecure -d chochopet -o I:\\ChochoPet\\Dump\\ChochoPetBackUp${new Date().getMilliseconds()}`, (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});


