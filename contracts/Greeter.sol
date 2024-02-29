// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Greeter {
    string public s_greeting;

    constructor(string memory greeting) {
        s_greeting = greeting;
    }

    function setGreeting(string memory greeting) public {
        s_greeting = greeting;
    }

    function greet() public view returns (string memory) {
        return s_greeting;
    }
}