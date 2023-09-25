import React, { Component } from 'react'
import Web3 from 'web3'
import SushiToken from '../abis/SushiToken.json'
import ChoHanAbi from '../abis/ChoHan.json'
import logo from '../pictures/sushi.png'

class ChoHan extends Component 
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
  
  getBetName(bet)
  {
    let betName = "ERROR"
  
    if (bet == 0)
  	  betName = "Chō"
    else if (bet == 1)
      betName = "Han"  
        
    return betName    	
  }
  
  async loadBlockchainData() 
  {
    const fantomNetworkId = 250
    const sushiTokenAddress = "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC"
	const choHanAddress = "0xfaa8172CD9DEdCc5AD8a1742F7d996908f4b0D11"  
  
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})   
    
    const networkId = await web3.eth.net.getId()
    
    const minimumBetAmount = "10000000000000000"; //0.01 SUSHI
    this.setState({minimumBetAmount})
    
    const fixedMinimumBetAmount = parseFloat(window.web3.utils.fromWei(minimumBetAmount)).toFixed(2) 
    this.setState({fixedMinimumBetAmount})        
    
    if (networkId===fantomNetworkId) 
    {  
      // Load Sushi token    
      const sushiToken = new web3.eth.Contract(SushiToken.abi, sushiTokenAddress)
      this.setState({sushiToken})
          
      const sushiBalance = await sushiToken.methods.balanceOf(this.state.account).call()
      this.setState({sushiBalance})
          
      const sushiFixedBalance = (Math.floor(parseFloat(window.web3.utils.fromWei(this.state.sushiBalance)) * 100) / 100).toFixed(2)
      this.setState({sushiFixedBalance})
      
      const allowance = await sushiToken.methods.allowance(this.state.account, choHanAddress).call()
      this.setState({allowance})        

      // Load Cho-Han
      const chohan = new web3.eth.Contract(ChoHanAbi.abi, choHanAddress)
      this.setState({chohan})
      
      const treasury = await chohan.methods.getTreasury().call({from: this.state.account})
      this.setState({treasury})      
      
      const fixedTreasury = parseFloat(window.web3.utils.fromWei(this.state.treasury)).toFixed(2)
      this.setState({fixedTreasury})      
     
      const maximumBetAmount = await chohan.methods.getMaximumBetAmount().call({from: this.state.account})
      this.setState({maximumBetAmount})
      
      const fixedMaximumBetAmount = parseFloat(window.web3.utils.fromWei(maximumBetAmount)).toFixed(2) 
      this.setState({fixedMaximumBetAmount})      
      
      const lastAmount = await chohan.methods.getLastAmount().call({from: this.state.account})
      this.setState({lastAmount})
      
	  const fixedLastAmount = parseFloat(window.web3.utils.fromWei(this.state.lastAmount)).toFixed(2)
	  this.setState({fixedLastAmount})
	  
	  const totalEarnings = await chohan.methods.getTotalEarnings().call({from: this.state.account})
	  this.setState({totalEarnings})
	  
	  const fixedTotalEarnings = parseFloat(window.web3.utils.fromWei(this.state.totalEarnings)).toFixed(2)
	  this.setState({fixedTotalEarnings})	  

      if (lastAmount > 0)
      {
		  const lastBet = await chohan.methods.getLastBet().call({from: this.state.account})
		  this.setState({lastBet})
		  
		  const fixedLastBet = this.getBetName(lastBet)
		  this.setState({fixedLastBet})        
      
		  const lastResult = await chohan.methods.getLastResult().call({from: this.state.account})
		  this.setState({lastResult})
		  
		  const fixedLastResult = this.getBetName(lastResult)
		  this.setState({fixedLastResult})        
      }
    }
    else 
    {
      window.alert('Chō-han contract not deployed on your current network.')
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

  approve = () => 
  {
    const amount = this.state.sushiBalance
  
    this.state.sushiToken.methods.approve(this.state.chohan._address, amount).send({from: this.state.account})
  }

  play = (bet, amount) =>
  {
	if (bet < 0 || bet > 1)
		window.alert('Invalid bet')
	else if (amount < +this.state.minimumBetAmount || amount > +this.state.maximumBetAmount)
		window.alert('Invalid amount')
	else
		this.state.chohan.methods.play(bet, amount).send({from: this.state.account})		
  }
  
  cho = (amount) => 
  {
    const CHO = 0
    this.play(CHO, amount)
  }
  
  han = (amount) => 
  {
    const HAN = 1
    this.play(HAN, amount)
  }  

  constructor(props) 
  {
    super(props)
    
    this.state = 
    {
      account: '0x0',
      sushiToken: {},
      chohan: {},
      sushiBalance: '0',
      sushiFixedBalance: '0',
      lastBet: '0',
      fixedLastBet: '',      
      lastResult: '0',
      fixedLastResult: '',
      lastAmount: '0',
      fixedLastAmount: '0',
      treasury: '0',
      fixedTreasury: '0',
      minimumBetAmount: '0',
      fixedMinimumBetAmount: '0',
      maximumBetAmount: '0',
      fixedMaximumBetAmount: '0',
      totalEarnings: '0',
      fixedTotalEarnings: '0'      
    }
  }

  render() 
  {
    const userStats = (
              <table align="center">
                <tbody>
                  <tr>
                    <td>Balance: </td>
                    <td>{this.state.sushiFixedBalance} SUSHI</td>
                  </tr>
                  <tr>
                    <td>Last bet: </td>
                    <td>{this.state.fixedLastBet}</td>
                  </tr>
                  <tr>
                    <td>Last amount: </td>
                    <td>{this.state.fixedLastAmount} SUSHI</td>
                  </tr>
                  <tr>
                    <td>Last result: </td>
                    <td>{this.state.fixedLastResult}</td>
                  </tr>
                  <tr>
                    <td>Total earnings: &nbsp;&nbsp;</td>
                    <td>{this.state.fixedTotalEarnings} SUSHI</td>
                  </tr>                  
                  <tr>
                    <td>Minimum bet: </td>
                    <td>{this.state.fixedMinimumBetAmount} SUSHI</td>
                  </tr>                  
                  <tr>
                    <td>Maximum bet: </td>
                    <td>{this.state.fixedMaximumBetAmount} SUSHI</td>
                  </tr>
                  <tr>
                    <td>Treasury: </td>
                    <td>{this.state.fixedTreasury} SUSHI</td>
                  </tr>                   
                  <tr>
                    <td>House fee: </td>
                    <td>0.1 %</td>
                  </tr>                                                                             
                </tbody>
            </table>)
    
    const approveButton = (
              <form onSubmit={(event) => {
                    event.preventDefault()
                    this.approve()}}>
                    
                  <div className="d-grid gap-2">
           
                    <button type="submit" className="btn btn-lg btn-primary">Approve</button>
                  </div>
                </form>)
    
    const choHanButtons = (
	  <form onSubmit={(event) => 
	  {
		event.preventDefault();

		if (!isNaN(this.input.value) && parseFloat(this.input.value) > 0) 
		{
		  const amount = window.web3.utils.toWei(this.input.value);

		  if (this.state.isChoButtonClicked) 
		    this.cho(amount);
		  else if (this.state.isHanButtonClicked) 
		    this.han(amount);
		}
	  }}>
		<div className="d-grid gap-2">
		  <input
		    type="text"
		    maxLength="25"
		    className="form-control"
		    ref={(input) => {
		      this.input = input;
		    }}
		    placeholder="0"
		    required
		  />

		  <button
		    type="submit"
		    className="btn btn-lg btn-primary"
		    onClick={() => this.setState({ isChoButtonClicked: true, isHanButtonClicked: false })}
		  >
		    Chō
		  </button>

		  <button
		    type="submit"
		    className="btn btn-lg btn-primary"
		    onClick={() => this.setState({ isChoButtonClicked: false, isHanButtonClicked: true })}
		  >
		    Han
		  </button>
		</div>
	  </form>)
                
    const title = (
            <div className="row">
              <div className="col-sm">
    	        <br /><p />	
		        <br /><p />
		        <center><img src={logo} height="140" alt="Logo"/></center>
        		<br /><p />
        		<br /><p />
        	  </div>
        	</div>)
        	
	const gameInfo = (
        <div className="row">
          <div className="col-sm">
			<p>Chō-Han is a traditional Japanese gambling game that involves the rolling of two standard six-sided dice. Before the dice are revealed, players must place their bets on the outcome. The outcome can either be 'Chō' (even) or 'Han' (odd), referring to the sum of the numbers on the two dice. Players place their bets by saying 'Chō' or 'Han' and putting their money on the table. After all the bets are placed, the dealer will uncover the cup or bowl and reveal the dice. Winning players receive double their bet.</p>
			
			<p>The minimum bet is 0.01 SUSHI and the maximum bet is half the treasury. The outcome of each game is calculated from a random number provided by ChainLink oracles, ensuring that the outcome depends solely on your luck.</p>
			
			<p>The house fee is 0.1% of the bet amount. One third of this fee is used to purchase Link tokens and pay ChainLink oracles, another third to purchase Gō tokens on the market and donate them to Gō Farm, and the last third is added to the treasury.</p>
          </div>              
        </div>)        	
        	
    let userMenu
    let buttonPanel
    let returnValue

    if (parseInt(this.state.allowance) < parseInt(this.state.sushiBalance))
		buttonPanel = approveButton
    else
		buttonPanel = choHanButtons
    
	userMenu = (
        <div className="row">
          <div className="col-sm">
          </div>            
          <div className="col-sm-3">
            {buttonPanel}
            <br /><p />
          </div>
          <div className="col-sm">
          </div>              
        </div>)
            
    //Compute the web page
    if (window.web3!==undefined)
    {
        returnValue = (
    	   <div className="container">
    	     {title}
             {userStats}
             <br /><p />
             <br /><p />            
             {userMenu}    
             <br /><p />
             <br /><p />
             {gameInfo}
             <br /><p />
             <br /><p />
             <br /><p />             
           </div>)
     }   
     else
     {
        returnValue = (
    	   <div className="container">
		      {title}
		      {userStats}
		      <br /><p />
		      <br /><p />
		      <br /><p />    
           </div>);  
     }  
     
     return returnValue;
   }
}

export default ChoHan;

