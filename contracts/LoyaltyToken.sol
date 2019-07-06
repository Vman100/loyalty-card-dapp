pragma solidity ^0.5.4;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract LoyaltyTokenNotary {
    address owner;
    address[] registeredLoyaltyTokens;

    mapping(address => bool) isBrandOwner;

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

    // event AwardGiven(address indexed _from, address indexed _to,  uint indexed _type, uint _amount, uint _date);
    // event AwardRevoked(address indexed _from, address indexed _to,  uint indexed _type, uint _date);
    // event AwardAdded(address _from, uint _type);
    // event AwarderAdded(address _who);
    // event AwarderRemoved(address _who);

    constructor (address creator, string memory _Name,string memory _Symbol, uint8 _Decimal) public ERC20Detailed(_Name, _Symbol, _Decimal) {
       if(msg.sender != creator){
       transferOwnership(creator);
       addMinter(creator);
       renounceMinter();
       }
    }

    // modifier checkAwardId(uint _awardId) {
    //     require(awards[_awardId] == msg.sender, "caller is not user");
    //     _;
    // }

    function getLoyaltyTokenDetails() public view returns (address, string memory, string memory, uint8) {
        return (owner(), name(), symbol(), decimals());
    }

    // function giveAward(address _user,uint _awardId, uint _amount, uint _date) public checkAwardId(_awardId) {
    //     require(balanceOf(msg.sender) > _amount, "Balance is insufficient");
    //     transfer(_user, _amount);
    //     emit AwardGiven(msg.sender, _user, _awardId, _amount, _date);
    // }

    // function revokeAward(address _user, uint _awardId, uint _date) public checkAwardId(_awardId) {
    //     emit AwardRevoked(msg.sender, _user, _awardId, _date);
    // }
    // function isAwarder(address _addr) public view returns (bool) {
    //     return awarders[_addr];
    // }

    // function addAwarder(address _addr) public {
    //     awarders[_addr] = true;
    //     emit AwarderAdded(_addr);
    // }

    // function deleteAwarder(address _addr) public{
    //     awarders[_addr] = false;
    //     emit AwarderRemoved(_addr);
    // }
    // function addAward(uint index) public {
    //     require(isAwarder(msg.sender), "caller is not Awarder");
    //     require(awards[index] != address(0x00), "");
    //     awards[index] = msg.sender;
    //     emit AwardAdded(msg.sender, index);
    // }

    // function getAward(uint index) public view returns (address) {
    //     return awards[index];
    // }
}