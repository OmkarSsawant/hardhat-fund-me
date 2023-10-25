const { network } = require("hardhat")
const {networkConfig, developmentChains} = require('../hardhat-helper-config') 
const verify = require("../utils/verify")
module.exports = async ({getNamedAccounts,deployments}) => {
    const {deploy,log}  = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId
    let feederAddress 

    //This works for test nets , but for the local we need to create minimal mock contract
    if(developmentChains.includes(network.name)){
        feederAddress = (await deployments.get("MockV3Aggregator")).address    
    }else{
         feederAddress  =networkConfig[chainId]["ethUsdFeedAddress"]
    }
    const  args = [feederAddress]
   const fundMe =  await deploy("FundMe",{
        from:deployer,
        log:true,
        args:args,
        waitConfirmations:network.config.blockConfirmations || 1
    })



    log("======================= Hurray !! Deployed =======================")

    //verify
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API){
        await verify(fundMe.address,args)
    }
}

module.exports.tags  = ["all","fundme"]