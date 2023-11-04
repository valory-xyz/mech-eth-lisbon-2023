const fs = require("fs");
const globalsFile = "globals.json";
const dataFromJSON = fs.readFileSync(globalsFile, "utf8");
const parsedData = JSON.parse(dataFromJSON);
const blockchainShortsName = parsedData.blockchainShortsName;
const blockchainShortsSymbol = parsedData.blockchainShortsSymbol;
const baseURI = parsedData.baseURI;

module.exports = [
    blockchainShortsName,
    blockchainShortsSymbol,
    baseURI
];