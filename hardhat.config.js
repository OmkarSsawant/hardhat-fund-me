require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers:[
      {version:"0.8.8"},
      {version:"0.6.6"}
    ]
  },
  namedAccounts:{
   deployer:{
    default:0
   } ,
   user:{
    default:1,

   }
  },
  networks:{
    
    sepolia:{
      url:process.env.SEPOLIA_RPC_URL,
      accounts:[process.env.SEPOLIA_PRIVATE_KEY],
      blockConfirmations:6,
      chainId:11155111,//see chainID of network on chainlist.org
    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      //account : Auto Injected by hardhat!
      chainId:31337
  }
  },
  etherscan:{
    apiKey:process.env.ETHERSCAN_API_KEY
  },
  gasReporter:{
    enabled:false,
    outputFile:"gas-report.txt",
    noColors:true,
    // currency:"INR",
    // coinmarketcap:COINMARKETCAP_APIKEY
  }
};
