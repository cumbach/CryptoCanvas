var ConvertLib = artifacts.require("./ConvertLib.sol");
var CanvasCore = artifacts.require("./CanvasCore.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, CanvasCore);
  deployer.deploy(CanvasCore);
};
