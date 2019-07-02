pragma solidity ^0.5.4;

contract LoyaltyTokenNotary {
    address owner;
    address[] registeredCertificates;

    event ContractCreated(address contractAddress);

    constructor() public{
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "caller is not owner");
         _;
    }

    function createCertificate(string memory _Name, string memory _Symbol, uint8 _Decimal) public onlyOwner {
        address newCertificate = address(new LoyaltyToken(msg.sender, _Name, _Symbol, _Decimal));
        emit ContractCreated(newCertificate);
        registeredCertificates.push(newCertificate);
    }

    function getRegisteredCertificates() public view returns (address[] memory) {
        return registeredCertificates;
    }
}


contract LoyaltyToken {
    address owner;
    string Name;
    string Symbol;
    uint8 Decimal;

    modifier onlyOwner() {
        require(msg.sender == owner, "caller is not owner");
         _;
    }

    constructor (address _owner, string memory _Name, string memory _Symbol, uint8 _Decimal) public {
        owner = _owner;
        Name = _Name;
        Symbol = _Symbol;
        Decimal = _Decimal;
    }

    function getLoyaltyTokenDetails() public view returns (address, string memory, string memory, uint8) {
        return (owner, Name, Symbol, Decimal);
    }
}

