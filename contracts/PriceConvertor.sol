// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


library PriceConvertor{

        /*
    - Sepolia Testnet 
    - ETH/USD
    - 0x694AA1769357215DE4FAC081bf1f309aDC325306 (Each net can have different aggregator(here)/contract address)
    */
    function getPrice(AggregatorV3Interface priceFeed)internal view returns (uint) {
        (,int price,,,) = priceFeed.latestRoundData(); //ETH in terms of USD
        return uint(price * 10e10); //to match tens of eth as it as 18zeros and price has 8tens
    }


    function getConversionRate(uint ethAmount,AggregatorV3Interface priceFeed) internal view returns (uint) {
        uint ethPrice = getPrice(priceFeed);
        uint ethInUsd = (ethPrice * ethAmount) / 1e18; //as both have e18 so zeros become e36
        return ethInUsd; 
    }
}