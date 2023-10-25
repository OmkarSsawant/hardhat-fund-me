const { expect, assert } = require('chai')
const {deployments,getNamedAccounts, ethers}  = require('hardhat')

describe("FundMe Testing",async ()=> {
    let fundMe
    beforeEach(async ()=> {
        //deploy contracts locally
        let {deployer} = await getNamedAccounts()
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe",deployer)
    })

    describe("Constructor",async ()=> {
        it("Feeder  Address Matches",async()=>{
           let feederAddress
            if(developmentChains.includes(network.name)){
                feederAddress = (await deployments.get("MockV3Aggregator")).address    
            }else{
                 feederAddress  =networkConfig[chainId]["ethUsdFeedAddress"]
            }
            assert(feederAddress==fundMe.priceFeed.address,"Matches Deployed Contract")
        })
    })

    describe("Funds",async()=> {
        
    it("Multiple Users can fund",async()=> {

    })

    it("Only Deployer can withdraw ",async()=> {

    })



    })
})  