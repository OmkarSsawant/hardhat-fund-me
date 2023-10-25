const networkConfig = {
    11155111:{
        network:"Sepolia",
        ethUsdFeedAddress:"0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    //..more test nets and their feed addresses
}

const developmentChains = ["hardhat","localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 2000_00000000
module.exports  = {networkConfig,developmentChains,DECIMALS,INITIAL_ANSWER}