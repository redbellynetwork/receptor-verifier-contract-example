// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.22;

import {VCVerifierBaseContract} from "@redbellynetwork/receptor-standardvc-sc/contracts/verifier/VCVerifierBase.sol";

contract AvererVerifierContract is VCVerifierBaseContract {
    
    /// @dev - Mapping to store verification status of each user
    mapping(address => bool) public verificationStatus;

    /**
     * @dev Constructor to set the VCVerifierBaseContract
     * @param _credentialType The type of the credential(schema)
     */
    constructor(string memory _credentialType) VCVerifierBaseContract(_credentialType) {}

    /**
     * @dev The function that will be executed after the verification is successful from the verifyCredential function.
     * @param userAddress address of the user that called the verifyCredential function
     */
    function _postVerification(address userAddress) internal override {
        verificationStatus[userAddress] = true;
    }
}
