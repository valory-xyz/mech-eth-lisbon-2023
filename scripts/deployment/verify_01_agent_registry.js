const fs = require("fs");
const globalsFile = "globals.json";
const dataFromJSON = fs.readFileSync(globalsFile, "utf8");
const parsedData = JSON.parse(dataFromJSON);
const agentRegistryName = parsedData.agentRegistryName;
const agentRegistrySymbol = parsedData.agentRegistrySymbol;
const baseURI = parsedData.baseURI;

module.exports = [
    agentRegistryName,
    agentRegistrySymbol,
    baseURI
];