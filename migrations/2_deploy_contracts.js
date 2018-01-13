var CanvasCore = artifacts.require("./CanvasCore.sol");

module.exports = function(deployer) {
  // deployer.link(CanvasCore);
  deployer.deploy(CanvasCore, 100, true, 100);
};
