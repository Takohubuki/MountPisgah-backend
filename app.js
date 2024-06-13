const express = require('express');
const app = express();

// 导入环境变量
require('dotenv').config();
const port = process.env.PORT || 8000;
const dbUrl = process.env.DATA_BASE_URL;

// 使用工具类MongoDB连接数据库
const MongoDB = require('./utils/MongoDB');
const dbName = 'MountPisgah';

const mongo = new MongoDB(dbUrl, dbName);

const S3Client = require('./utils/s3');

// 静态文件
app.use(express.static('public'));

console.log("直到我在毗斯迦山，发现我家极目一看，脱下帐篷，安静等候，信心变见，盼望成就")

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});