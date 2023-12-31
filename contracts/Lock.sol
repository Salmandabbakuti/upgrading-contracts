// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint public unlockTime;

    event Withdrawal(uint amount, uint when);

    function initialize(uint _unlockTime) public payable initializer {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        __Ownable_init(msg.sender);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function withdraw() public {
        // Here, anyone can call this function and withdraw the funds from contract
        // This is a vulnerability, So we will be fixing by upgrading the contract
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        payable(msg.sender).transfer(address(this).balance);
        emit Withdrawal(address(this).balance, block.timestamp);
    }
}
