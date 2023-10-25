const { network } = require("hardhat")
const {developmentChains,DECIMALS,INITIAL_ANSWER} = require('../hardhat-helper-config')
module.exports = async ({getNamedAccounts,deployments}) => {
    const {deploy,log}  = deployments
    const {deployer} = await getNamedAccounts()
    const chainName = network.name

    if(developmentChains.includes(chainName)){
        log("Local Network Detected , Deploying Mocks ...")
        await deploy("MockV3Aggregator",{
            from:deployer,
            log:true,
            contract:"MockV3Aggregator",
            args:[DECIMALS,INITIAL_ANSWER]
        })
        log(" ==================  Deployed Mocks ! on Local Network   ====================")
    }
}


module.exports.tags = ["all","mocks"]