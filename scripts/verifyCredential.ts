import { ethers } from "hardhat";
import canonicalize from "canonicalize";
import { AvererVerifierContract } from "../typechain-types";

const avererVerifierContractAddress =
  "0x5c414F9243588750E4BB1Ec181270ad42A0b791F";

const verifierCredential = {
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  id: "9cf1de20-7c7b-49e3-bac7-106a1c895dd0",
  type: ["OptimaV1Credential", "VerifiableCredential"],
  issuer: "did:key:zAeVG1300Ft4byWDW3NbuxooIjQvA8P16GCiL0Gj9Hg=",
  validFrom: "2025-04-01T06:09:32.624Z",
  validUntil: "2028-04-01T06:09:32.624Z",
  credentialSubject: {
    publicAddress: "0xff96eb8458e7764FFB5995adf6F7138DE66F52d3",
  },
  proof: {
    type: "Ed25519Signature2020",
    created: "2025-04-01T06:09:32.625Z",
    proofPurpose: "assertionMethod",
    proofValue:
      "z8oagLAKH4LwjVM56i5wBvM2EDuo1WC5pHmRGWe6Ha6BNEWeKGRiHBjHDD98jRBNe3TrSZGb6knsMTK1YwhseWPH",
  },
};

async function main() {
  if (
    !(
      avererVerifierContractAddress &&
      ethers.isAddress(avererVerifierContractAddress)
    )
  ) {
    console.error("Averer Verifier Contract Address is required.");
    return;
  }

  const { proof, ...vcWithoutProof } = verifierCredential;
  const issuerDid = vcWithoutProof.issuer;

  const signer = await ethers.provider.getSigner();
  const signerAddress = await signer.getAddress();

  const avererVerifierContract = (await ethers.getContractAt(
    "AvererVerifierContract",
    avererVerifierContractAddress
  )) as AvererVerifierContract;

  console.log(
    "Before verificaton status of signer : ",
    await avererVerifierContract.verificationStatus(signerAddress)
  );

  const tx = await avererVerifierContract
    .connect(signer)
    .verifyCredential(
      issuerDid,
      canonicalize(vcWithoutProof)!,
      canonicalize(proof)!
    );

  await tx.wait();

  console.log(
    "After verificaton status of signer : ",
    await avererVerifierContract.verificationStatus(signerAddress)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
