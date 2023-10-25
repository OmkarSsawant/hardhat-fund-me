const {run} = require('hardhat/config') 

async function verify(contractAddress,args){
  try {
    await run("verify:verify",{
      address:contractAddress,
      contructorArguments:args
    })
  } catch (error) {
      if(error.message.includes("already verified"))
        console.log("Already Verified!");
      else 
        console.log(error);  
  }
}

module.exports = verify