const express = require('express');
const app = express();
const port = 8000;

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({ 
    endpoint: 'sgp1.vultrobjects.com',
    credentials: {
        accessKeyId: 'accessKey',
        secretAccessKey: 'secretKey'
    }
 });

app.use(express.static('public'));

console.log("直到我在毗斯迦山，发现我家极目一看，脱下帐篷，安静等候，信心变见，盼望成就")

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});