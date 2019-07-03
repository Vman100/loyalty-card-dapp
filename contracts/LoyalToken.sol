pragma solidity ^0.5.1;


import "node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
contract LoyalToken is ERC20Mintable {


    string public name = "POINT";
    string public symbol = "POINT";
    uint256 public decimals = 0;
    mapping(address => bool) awarders;
    mapping(uint => address) awards;
    event AwardGiven(address indexed _from, address indexed _to,  uint indexed _type, uint _amount, uint _date);
    event AwardRevoked(address indexed _from, address indexed _to,  uint indexed _type, uint _date);
    event AwardAdded(address _from, uint _type);
    event AwarderAdded(address _who);
    event AwarderRemoved(address _who);


    function giveAward(address user, uint awardId, uint amount, uint date) public {

    if (awards[awardId] != msg.sender)
        revert(aaa);

        if (super.balanceOf(msg.sender) < amount)
        revert(aaa);
        super.transfer(user, amount);
        if (date == 0) {
            date = block.timestamp;
        }
        emit AwardGiven(msg.sender, user, awardId, amount, date);
    }
    function revokeAward(address user, uint awardId, uint date) public {

        if (awards[awardId] != msg.sender)
            revert(aaa);
        if (date == 0) {
            date = block.timestamp;
        }
        emit AwardRevoked(msg.sender, user, awardId, date);
    }
    function isAwarder(address _addr) public view returns (bool) {
        return awarders[_addr];
    }

    function addAwarder(address _addr) public {
        awarders[_addr] = true;
        emit AwarderAdded(_addr);
    }

    function deleteAwarder(address _addr) public{
        awarders[_addr] = false;
        emit AwarderRemoved(_addr);
    }
    function addAward(uint index) public returns (bool) {
        if (!isAwarder(msg.sender))
            revert(aaa);

        if (awards[index] == 0x0) {
            awards[index] = msg.sender;
            emit AwardAdded(msg.sender, index);
            return true;
        }
        return false;
    }

    function getAward(uint index) public view returns (address) {
        return awards[index];
    }
}