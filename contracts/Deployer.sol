// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Create2 } from "@openzeppelin/contracts/utils/Create2.sol";
import { Greeter } from "./Greeter.sol";

contract Deployer {
    event Deployed(address contractAddress, bytes32 salt);

    function computeAddress(bytes32 _salt) public view returns (address) {
        bytes memory _bytecodeHash = type(Greeter).creationCode;
        return Create2.computeAddress(_salt, keccak256(_bytecodeHash));
    }

    function deployGreeter(bytes32 _salt) public payable returns(address greeterAddress) {
        bytes memory _bytecode = type(Greeter).creationCode;
        greeterAddress = Create2.deploy(0, _salt, _bytecode);
        emit Deployed(greeterAddress, _salt);
    }
}
