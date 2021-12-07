const hre = require("hardhat");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { ethers } = hre;

import {
  InstaFlashAggregatorAvalanche,
  InstaFlashAggregatorAvalanche__factory,
  IERC20__factory,
  IERC20,
  InstaFlashReceiver__factory,
  InstaFlashReceiver,
  InstaFlashAggregatorProxy,
  InstaFlashAggregatorProxy__factory,
  InstaFlashAggregatorAdmin,
  InstaFlashAggregatorAdmin__factory,
} from "../../typechain";

describe("FlashLoan", function () {
  let Aggregator, aggregator, Receiver, receiver: InstaFlashReceiver, Proxy, proxy, Admin, admin;
  let signer: SignerWithAddress;

  // const master = '0xa9061100d29C3C562a2e2421eb035741C1b42137';

  // let ABI = [ "function initialize()" ];
  // let iface = new ethers.utils.Interface(ABI);
  // const data = iface.encodeFunctionData("initialize");

  const DAI = "0xd586e7f844cea2f87f50152665bcbc2c279d8d70";
  const USDT = "0xc7198437980c041c805a1edcba50c1ce5db95118";
  const WAVAX = "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7";
  const ACC_DAI = "0xed2a7edd7413021d440b09d654f3b87712abab66";
  const ACC_USDT = "0xed2a7edd7413021d440b09d654f3b87712abab66";
  const ACC_WAVAX = "0x43beddb3199f2a635c85ffc4f1af228198d268ab";

  const dai = ethers.utils.parseUnits("10", 18);
  const usdt = ethers.utils.parseUnits("10", 6);
  const wavax = ethers.utils.parseUnits("10", 18);
  const Dai = ethers.utils.parseUnits("5000", 18);
  const Usdt = ethers.utils.parseUnits("5000", 6);
  const Wavax = ethers.utils.parseUnits("5000", 18);
  
  const zeroAddr =
    "0x0000000000000000000000000000000000000000000000000000000000000000";

  beforeEach(async function () {
    [signer] = await ethers.getSigners();
    // Aggregator = new InstaFlashAggregatorAvalanche__factory(signer);
    // aggregator = await Aggregator.deploy();
    // await aggregator.deployed();

    // Admin = new InstaFlashAggregatorAdmin__factory(signer);
    // admin = await Admin.deploy(master);
    // await admin.deployed();

    // Proxy = new InstaFlashAggregatorProxy__factory(signer);
    // proxy = await Proxy.deploy(aggregator.address, admin.address, data);
    // await proxy.deployed();

    Receiver = new InstaFlashReceiver__factory(signer);
    receiver = await Receiver.deploy('0x2b65731A085B55DBe6c7DcC8D717Ac36c00F6d19');
    await receiver.deployed();

    const token_dai = new ethers.Contract(
      DAI,
      IERC20__factory.abi,
      ethers.provider
    );

    await hre.network.provider.send("hardhat_setBalance", [
      ACC_DAI,
      ethers.utils.parseEther("10.0").toHexString(),
    ]);

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [ACC_DAI],
    });

    const signer_dai = await ethers.getSigner(ACC_DAI);
    await token_dai.connect(signer_dai).transfer(receiver.address, dai);

    await hre.network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [ACC_DAI],
    });
  });

  describe("Single token", async function () {
    it("Should be able to take flashLoan of a single token from AAVE", async function () {
      await receiver.flashBorrow([DAI], [Dai], 1, zeroAddr);
    });
  });

  describe("Multi token", async function () {
    beforeEach(async function () {
      const token_usdt = new ethers.Contract(
        USDT,
        IERC20__factory.abi,
        ethers.provider
      );

      await hre.network.provider.send("hardhat_setBalance", [
        ACC_USDT,
        ethers.utils.parseEther("10.0").toHexString(),
      ]);

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [ACC_USDT],
      });

      const signer_usdt = await ethers.getSigner(ACC_USDT);
      await token_usdt.connect(signer_usdt).transfer(receiver.address, usdt);

      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [ACC_USDT],
      });

      const token_wavax = new ethers.Contract(
        WAVAX,
        IERC20__factory.abi,
        ethers.provider
      );

      await hre.network.provider.send("hardhat_setBalance", [
        ACC_WAVAX,
        ethers.utils.parseEther("10.0").toHexString(),
      ]);

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [ACC_WAVAX],
      });

      const signer_wavax = await ethers.getSigner(ACC_WAVAX);
      await token_wavax.connect(signer_wavax).transfer(receiver.address, wavax);

      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [ACC_WAVAX],
      });
    });
    it("Should be able to take flashLoan of multiple tokens together from AAVE", async function () {
      await receiver.flashBorrow([DAI, USDT, WAVAX], [Dai, Usdt, Wavax], 1, zeroAddr);
    });
  });
});
