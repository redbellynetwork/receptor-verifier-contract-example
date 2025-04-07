# receptor-verifier-contract-example

This repo inherits the package receptor-standardvc-sc and use VCVerifierBase abstract contract and implements it

### Pre-requisites

- Require NodeJS version 20+
  - `nvm install 20`
  - `nvm use 20`
  - `node -v`
- Require Solidity compiler version 0.8.22

### How to Install/Run

- Use `npm i` to install the dependencies.

Ensure your project is configured to access GitHub Packages via authentication using a valid GitHub token. This can be done by exporting GITHUB_TOKEN or adding it in .npmrc file in your project directory.

### How to compile contracts and libraries in hardhat

- Use `npm run compile` command

## Run Scripts

### deploy.ts script

This script is used by verifier to deploy there own verifier contract:

Steps :-

1. Use node version 20 and make sure you have install the dependencies using `npm i` and compile contracts using `npx hardhat compile`

2. Have .env file in root level containing same variables as in .env.sample file and assign value to the variable `PRIVATE_KEY` be the private key of verifier who want to deploy the contract and also ensure that this priavte key account have funds and permission in testnet

3. Now you can run the command:

```shell
npx hardhat run scripts/deploy.ts
```

### verifyCredential.ts script

This script is used by user to verify the `OptimaV1Credential` issued by IDP in verifier contract:

Steps :-

1. Use node version 20 and make sure you have install the dependencies using `npm i` and compile contracts using `npx hardhat compile`

2. Have .env file in root level containing same variables as in .env.sample file and assign value to the variable `PRIVATE_KEY` be the private key of user who want to verify the credential in verifier contract and also ensure that this priavte key account have funds and permission in testnet

3. Add Verifier contract address for which you want to verify to variable `avererVerifierContractAddress` in script `verifyCredential.ts` and also add the `OptimaV1Credential` credential issued by IDP to variable `verifierCredential` in script `verifyCredential.ts`

4. Now you can run the command:

```shell
npx hardhat run scripts/verifyCredential.ts
```
