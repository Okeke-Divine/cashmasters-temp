const fs = require("fs")

async function getRandomItem(fileDir){
    let data  = await fs.readFileSync(fileDir, "utf-8");
    let processData = JSON.parse(data);
    let urlIndex = Math.floor(Math.random() * processData.length);
    return processData[urlIndex];
}

module.exports = {getRandomItem};