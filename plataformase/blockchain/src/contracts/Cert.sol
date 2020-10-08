pragma solidity ^0.5.0;

contract Cert {
  string Hash;

  function set(string memory _Hash) public {
    Hash = _Hash;
  }

  function get() public view returns (string memory) {
    return Hash;
  }
}
