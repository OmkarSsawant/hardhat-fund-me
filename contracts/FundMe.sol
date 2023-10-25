// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PriceConvertor.sol";

error NotOwner();

contract FundMe{
    using PriceConvertor for uint;
    uint s_transactionsCount = 0;
    mapping(address => uint) private s_fundersToAmount;
    address[] private s_funders;
    uint public constant MIN_USD = 50 * 1e18;
    AggregatorV3Interface private s_priceFeed;
    /* constant and immutable (can be init only once)  , custom errors are used to save gas , bcz saved in bytecode */


    address public immutable i_owner;

    modifier onlyOwner{
        // require(i_owner == msg.sender,"Only Owners can withdraw Money");
        if(msg.sender != i_owner){
            revert NotOwner();
        }
        _;
    }
    constructor(address feeder){
        //As Constructor is called once so owner will be one whoever deploys the contract
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(feeder);
        
    }

    receive() external payable{
        //It gets called whenever this contract receives transaction
        //without calling fund , like direct transfer from metamask
        //only that a little more gas is charged
        fund();
    }

    fallback() external payable{
        //When Data is transfered to contract 
        //But there is no one to receive 
        //`fallback` is called
        fund();
    }


    function fund() public payable{
        s_transactionsCount = s_transactionsCount +1;
        require(msg.value.getConversionRate(s_priceFeed) >= MIN_USD,"Not Sufficient Balance");
        //if this fails
        //all the code that was executed is reverted 
        //i.e, s_transactionsCount will be again s_transactionsCount-1
        s_fundersToAmount[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    function withdraw() public onlyOwner{
        for(uint i=0;i<s_funders.length;i++){
            s_fundersToAmount[s_funders[i]] = 0;
        }
        s_funders = new address[](0);
        /*
        //Three ways to withdraw
        //trasfer
        //send
        //call
        //to make transaction account address should be payable
        // payable(msg.sender).transfer(address(this).balance);//transfers and automatically reverts if fails, has gas limit

        // bool paySuccess = payable(msg.sender).send(address(this).balance); //transfers and needs manual revert like below , has gas limit
        // require(paySuccess,"Transaction Failed");
        */

        
        (bool success,) = payable(msg.sender).call{value:address(this).balance}(""); //transfers and needs manual revert like below , has gas limit
        require(success,"Transaction Failed");

    }

    function gasEffectiveWithdraw() public onlyOwner{
        address[] memory funders = s_funders;
         for(uint i=0;i<funders.length;i++){
            s_fundersToAmount[funders[i]] = 0;
        }
              (bool success,) = payable(msg.sender).call{value:address(this).balance}(""); //transfers and needs manual revert like below , has gas limit
        require(success,"Transaction Failed");
    }


    function getFundersToAmount(address funderAddress)
    public 
    view 
    returns (uint){
        return s_fundersToAmount[funderAddress];
    }


  function getFunder(uint index)
    public 
    view 
    returns (address){
        return s_funders[index];
    }


      function getOwner()
    public 
    view 
    returns (address){
        return i_owner;
    }

      function getPriceFeed()
    public 
    view 
    returns (AggregatorV3Interface){
        return s_priceFeed;
    }




}