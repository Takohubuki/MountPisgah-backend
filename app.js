const express = require('express');
const app = express();

require('module-alias/register');

const path = require('path');

const holies_router = require('@routes/HolyofHolies');

const config = require('@config/config');

app.use(express.json());

// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/holyofholies', holies_router);
// app.use(pisgah_router)
app.use(holies_router);

console.log("直到我在毗斯迦山，发现我家极目一看，脱下帐篷，安静等候，信心变见，盼望成就")

app.listen(config.port, () => console.log(`Server is running on port ${config.port}`));