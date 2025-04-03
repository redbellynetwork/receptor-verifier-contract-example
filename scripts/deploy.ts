import { ethers } from "hardhat";

async function main() {
  const signer = await ethers.provider.getSigner();

  console.log("Deploying Averer Verification Contract");

  const JsonFormatter = await ethers.getContractFactory(
    "JsonFormatter",
    signer
  );
  const jsonFormatter = await JsonFormatter.deploy();
  const jsonFormatterAddress = await jsonFormatter.getAddress();

  const Base58 = await ethers.getContractFactory("Base58", signer);
  const base58 = await Base58.deploy();
  const base58Address = await base58.getAddress();

  const TimeParserUtils = await ethers.getContractFactory(
    "TimeParserUtils",
    signer
  );
  const timeParserUtils = await TimeParserUtils.deploy();
  const timeParserUtilsAddress = await timeParserUtils.getAddress();

  const StringToAddressLib = await ethers.getContractFactory(
    "StringToAddress",
    signer
  );
  const stringToAddressLib = await StringToAddressLib.deploy();
  const stringToAddressLibAddress = await stringToAddressLib.getAddress();

  const AvererVerifierContract = await ethers.getContractFactory(
    "AvererVerifierContract",
    {
      libraries: {
        JsonFormatter: jsonFormatterAddress,
        Base58: base58Address,
        TimeParserUtils: timeParserUtilsAddress,
        StringToAddress: stringToAddressLibAddress,
      },
      signer,
    }
  );

  const avererVerifierContract = await AvererVerifierContract.deploy(
    "OptimaV1Credential"
  );
  await avererVerifierContract.waitForDeployment();

  console.log(
    "Deployed Averer Verification Contract at address : ",
    await avererVerifierContract.getAddress()
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
