import React, { Component } from 'react'
import Web3 from 'web3'
import GoToken from '../abis/GoToken.json'
import GoFarm from '../abis/GoFarm.json'
import GoFtmLP from '../abis/GoFtmLP.json'
import FtmDaiLP from '../abis/FtmDaiLP.json'
import rugdoc from '../pictures/rugdoc.png'

class Home extends Component 
{
  intervalID;

  async componentWillMount() 
  {
    await this.loadWeb3()
    
    if (window.web3!==undefined)
    {
        await this.loadBlockchainData()
        this.intervalID = setInterval(this.loadBlockchainData.bind(this), 5000);
    }
  }
  
  componentWillUnmount() 
  {
    clearInterval(this.intervalID);
  }
  
  async loadBlockchainData() 
  {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    
    // Load GoToken
    const goTokenData = GoToken.networks[networkId]
    let goToken
    
    if (goTokenData) 
    {
      goToken = new web3.eth.Contract(GoToken.abi, goTokenData.address)
      
      const totalSupply = await goToken.methods.totalSupply().call()
      this.setState({totalSupply})
    } 
    else 
    {
      window.alert('Gō contract not deployed on your current network.')
    }

    // Load GoFarm
    const goFarmData = GoFarm.networks[networkId]
    let goFarm
    
    if(goFarmData && goToken) 
    {
      goFarm = new web3.eth.Contract(GoFarm.abi, goFarmData.address)
      
      const farmTreasury = await goFarm.methods.getFarmTreasury().call()
      this.setState({farmTreasury})
      
      const rewardsFund = await goFarm.methods.getRewardsFund().call()
      this.setState({rewardsFund})

      const totalFarmBalance = await goToken.methods.balanceOf(goFarmData.address).call()
      this.setState({totalFarmBalance})
      
      const totalGoStaked = await goFarm.methods.getTotalGoStaked().call()
      this.setState({totalGoStaked})
    }
 
	// Load FtmDaiLP    
    const ftmNetworkId = 250   
    const ftmDaiLpTokenAddress = "0xe120ffbda0d14f3bb6d6053e90e63c572a66a428"
    
    if (networkId===ftmNetworkId) 
    {
	  const ftmDaiLP = new web3.eth.Contract(FtmDaiLP.abi, ftmDaiLpTokenAddress)  
      const ftmDaiReserves = await ftmDaiLP.methods.getReserves().call()
	  const ftmReserves = ftmDaiReserves[0]
	  const daiReserves = ftmDaiReserves[1]
      const ftmPriceUSD = daiReserves / ftmReserves
      
      this.setState({ftmPriceUSD})
    }

    // Load GoFtmLP    
    const goFtmLpTokenAddress = "0x6daB378FBf1fB08A5423AC8f6F34480e9bDbae5a"
    
    if (networkId===ftmNetworkId) 
    {
	  const goFtmLP = new web3.eth.Contract(GoFtmLP.abi, goFtmLpTokenAddress)  
      const goFtmReserves = await goFtmLP.methods.getReserves().call()
  	  const ftmReserves = goFtmReserves[0]
	  const goReserves = goFtmReserves[1]
      const goPriceFtm = ftmReserves / goReserves
      const goPriceUSD = goPriceFtm * this.state.ftmPriceUSD
      const marketCap = goPriceUSD * window.web3.utils.fromWei(this.state.totalSupply)

      this.setState({goPriceUSD})
      this.setState({marketCap})
    }
  }

  async loadWeb3() 
  {
    if (window.ethereum) 
    {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) 
    {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else 
    {
      window.alert('Your web browser is not ready to connect to the blockchain. You could consider trying MetaMask or using the web browser built into your wallet.')
    }
  }

  constructor(props) 
  {
    super(props)
    
    this.state = 
    {
      totalSupply: '0',
      farmTreasury: '0',
      rewardsFund: '0',
      totalFarmBalance: '0',
      totalGoStaked: '0',
      ftmPriceUSD: '0',
      goPriceUSD: '0',
      marketCap: '0'
    }
  } 
   
  render() 
  {
    const title = (
            <div className="row">
                <br /><p />	
                <br /><p />
                <br /><p />	
                <br /><p />		
              <div className="col-sm">
                <h3>Gō Finance</h3>
          		<br /><p />	
		        <p className="centered_text">Cooperative DeFi Farming</p>
          		<br /><p />
          		<center>
          		    <a href="https://rugdoc.io/project/go-finance-fantom/" target="blank">
              		    <img src={rugdoc} height="120" alt="Rugdoc"/>
              		</a>
          		</center>
          		<br /><p />
          		<br />
		      </div>
		    </div>)
	
    let returnValue;

    if (window.web3!==undefined)
    {
        returnValue = (
            <div className="container">
    	        {title}
        	    <div className="row">
        	       <div className="col-sm">
                      <center>
                        <table>
                          <tbody>
                            <tr>
                                <td>Total supply: </td>
                                <td>{window.web3.utils.fromWei(this.state.totalSupply)} fGō</td>
                            </tr>
                            <tr>
                                <td>Token price: </td>
                                <td>{parseFloat(this.state.goPriceUSD).toFixed(4)} $</td>
                            </tr>
                            <tr>
                                <td>Market Cap: </td>
                                <td>{parseInt(this.state.marketCap)} $</td>
                            </tr>
                            <tr>
                                <td>Treasury: </td>
                                <td>{parseInt(window.web3.utils.fromWei(this.state.farmTreasury))} fGō</td>
                            </tr>
                            <tr>
                                <td>Rewards fund: &nbsp;&nbsp;</td>
                                <td>{parseInt(window.web3.utils.fromWei(this.state.rewardsFund))} fGō</td>
                            </tr>
                            <tr>
                                <td>Total staked: </td>
                                <td>{parseInt(window.web3.utils.fromWei(this.state.totalGoStaked))} fGō</td>
                            </tr>
                            <tr>
                                <td>Farm balance: </td>
                                <td>{parseInt(window.web3.utils.fromWei(this.state.totalFarmBalance))} fGō</td>
                            </tr>
                          </tbody>
                        </table>
                    </center>
        		    <br /><p />	
        		    <br /><p />	
      		      </div>
	            </div>
	         </div>);     
     }   
     else
     {
        returnValue = (
           <div className="container">
              {title}
              <br /><p />	
		      <br /><p />
	       </div>);   
     }  
     
     return returnValue;
   }
}

export default Home;
