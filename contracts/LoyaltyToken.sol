pragma solidity ^0.5.4;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract LoyaltyTokenNotary {
    address owner;
    address[] registeredLoyaltyTokens;

    mapping(address => bool) public isBrandOwner;

    event ContractCreated(address indexed contractAddress);
    event BrandOwnerAdded(address indexed brandOwnerAddress);

    constructor() public{
        owner = msg.sender;
    }

    modifier onlyBrandOwner() {
        require(isBrandOwner[msg.sender], "caller is not a brand owner");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _;
    }

    function addBrandOwner(address _brandOwnerAddress) public onlyOwner {
        require(!isBrandOwner[_brandOwnerAddress], "supplied address is already a brand owner");
        isBrandOwner[_brandOwnerAddress] = true;
        emit BrandOwnerAdded(_brandOwnerAddress);
    }

    function createLoyaltyToken(string memory _Name, string memory _Symbol, uint8 _Decimal) public onlyBrandOwner {
        address newLoyaltyToken = address(new LoyaltyToken(msg.sender, _Name, _Symbol, _Decimal));
        emit ContractCreated(newLoyaltyToken);
        registeredLoyaltyTokens.push(newLoyaltyToken);
    }

    function getRegisteredLoyaltyTokens() public view returns (address[] memory) {
        return registeredLoyaltyTokens;
    }
}

contract LoyaltyToken is ERC20, ERC20Detailed, ERC20Mintable, Ownable {
    using SafeERC20 for ERC20;

    constructor (address creator, string memory _Name,string memory _Symbol, uint8 _Decimal) public ERC20Detailed(_Name, _Symbol, _Decimal) {
       if(msg.sender != creator){
       transferOwnership(creator);
       addMinter(creator);
       renounceMinter();
       }
    }

    function getLoyaltyTokenDetails() public view returns (address, string memory, string memory, uint8) {
        return (owner(), name(), symbol(), decimals());
    }
}