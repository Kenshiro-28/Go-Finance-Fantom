import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import GinkoAbi from '../abis/Ginko.json'
import logo from '../pictures/ginko.png'

class Ginko extends Component 
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
    const fantomNetworkId = 250
    const daiTokenAddress = "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"
  
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})   
    
    const networkId = await web3.eth.net.getId()

    // Load DaiToken
    if (networkId===fantomNetworkId) 
    {  
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenAddress)
      this.setState({daiToken})
          
      const daiBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({daiBalance})
          
      const daiFixedBalance = (Math.floor(parseFloat(window.web3.utils.fromWei(this.state.daiBalance)) * 100) / 100).toFixed(2)
      this.setState({daiFixedBalance})
    }
       
    // Load Ginko
    const ginkoData = GinkoAbi.networks[networkId]
    let ginko
    
    if(ginkoData) 
    {
      ginko = new web3.eth.Contract(GinkoAbi.abi, ginkoData.address)
      this.setState({ginko})
      
      const stakingDeposit = await ginko.methods.getStakingDeposit().call({from: this.state.account})
      this.setState({stakingDeposit})
      
      const fixedDeposit = parseFloat(window.web3.utils.fromWei(this.state.stakingDeposit)).toFixed(2)
      this.setState({fixedDeposit})
      
      const stakingBlock = await ginko.methods.getStakingBlock().call({from: this.state.account})
      this.setState({stakingBlock})
      
      const blocksStaking = await ginko.methods.computeBlocksStaking().call({from: this.state.account})
      this.setState({blocksStaking})
      
      let userReward = '0'
      
      if (stakingDeposit > 0)
          userReward = await ginko.methods.computeUserReward().call({from: this.state.account})

      this.setState({userReward})
      
      const fixedReward = parseFloat(window.web3.utils.fromWei(this.state.userReward)).toFixed(2)
      this.setState({fixedReward})
 
      const rewardsFund = await ginko.methods.getRewardsFund().call()
      this.setState({rewardsFund})
      
      const fixedRewardsFund = parseInt(window.web3.utils.fromWei(this.state.rewardsFund))
      this.setState({fixedRewardsFund})
      
      const totalStakingDeposits = await ginko.methods.getTotalStakingDeposits().call()
      this.setState({totalStakingDeposits})
      
      const fixedTotalStakingDeposits = parseInt(window.web3.utils.fromWei(this.state.totalStakingDeposits))
      this.setState({fixedTotalStakingDeposits})
      
      const harvestCooldownBlocks = await ginko.methods.getHarvestCooldownBlocks().call()
      this.setState({harvestCooldownBlocks})
      
      const stakingBlockRange = await ginko.methods.getStakingBlockRange().call()
      this.setState({stakingBlockRange})

      let auxStakingPower = (blocksStaking / stakingBlockRange) * 100
      
      if (auxStakingPower > 100)
          auxStakingPower = 100
            
      const stakingPower = auxStakingPower.toFixed(2)      
            
      this.setState({stakingPower})
      
      const monthlyAPR = ((rewardsFund / totalStakingDeposits) * 100).toFixed(2) 
      this.setState({monthlyAPR})
      
      const allowance = await this.state.daiToken.methods.allowance(this.state.account, ginkoData.address).call()
      this.setState({allowance})
    }
    else 
    {
      window.alert('Ginko contract not deployed on your current network.')
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
    const amount = this.state.daiBalance
  
    this.state.daiToken.methods.approve(this.state.ginko._address, amount).send({from: this.state.account})
  }

  deposit = (amount) => 
  {
    if ((this.state.userReward > 0) &&
        (parseInt(this.state.blocksStaking) > parseInt(this.state.harvestCooldownBlocks)))
        
        window.alert('Increasing your deposit will reset your staking power. Harvest your pending rewards first or you will lose them.')
    else
        this.state.ginko.methods.deposit(amount).send({from: this.state.account})
  }

  withdraw = () => 
  {
    this.state.ginko.methods.withdraw().send({from: this.state.account})
  }
  
  harvest = () => 
  {
    this.state.ginko.methods.harvest().send({from: this.state.account})
  }
  
  constructor(props) 
  {
    super(props)
    
    this.state = 
    {
      account: '0x0',
      daiToken: {},
      ginko: {},
      daiBalance: '0',
      daiFixedBalance: '0',
      stakingDeposit: '0',
      fixedDeposit: '0',
      stakingBlock: '0',
      blocksStaking: '0',
      userReward: '0',
      fixedReward: '0',
      rewardsFund: '0',
      fixedRewardsFund: '0',
      totalStakingDeposits: '1', 
      fixedTotalStakingDeposits: '0',
      harvestCooldownBlocks: '0',
      stakingBlockRange: '0',
      stakingPower: '0',
      monthlyAPR: '0',
      allowance: '0'
    }
  }

  render() 
  {
    const userStats = (
              <table align="center">
                <tbody>
                  <tr>
                    <td>Balance: </td>
                    <td>{this.state.daiFixedBalance} DAI</td>
                  </tr>
                  <tr>
                    <td>Blocks staking: </td>
                    <td>{this.state.blocksStaking}</td>
                  </tr>
                  <tr>
                    <td>Staking power: </td>
                    <td>{this.state.stakingPower} %</td>
                  </tr>
                  <tr>
                    <td>Harvest lockup: &nbsp;&nbsp;</td>
                    <td>1 day</td>
                  </tr>
                  <tr>
                    <td>Rewards fund: </td>
                    <td>{this.state.fixedRewardsFund} DAI</td>
                  </tr>
                  <tr>
                    <td>Total deposits: </td>
                    <td>{this.state.fixedTotalStakingDeposits} DAI</td>
                  </tr>
                  <tr>
                    <td>Monthly APR: </td>
                    <td>{this.state.monthlyAPR} %</td>
                  </tr>
                  <tr>
                    <td>Deposit fee: </td>
                    <td>10 %</td>
                  </tr> 
                </tbody>
            </table>)
    
    const approveButton = (
              <form onSubmit={(event) => {
                    event.preventDefault()
                    this.approve()}}>
                    
                  <div className="d-grid gap-2">
                    <input type="text" 
                           maxLength = "25" 
                           size = '12' 
                           className='form-control'
                           ref={(input) => {this.input = input}}
                           placeholder = '0'
                           required />
                                 
                    <button type="submit" className="btn btn-lg btn-primary">Approve</button>
                  </div>
                </form>)
    
    const depositButton = (
                <form onSubmit={(event) => {
                    event.preventDefault()
                    
                    if ((!isNaN(this.input.value)) && (parseFloat(this.input.value) > 0))
                    {
                      const amount = window.web3.utils.toWei(this.input.value)
                      this.deposit(amount)
                    }}}>
                    
                  <div className="d-grid gap-2">
                    <input type="text" 
                                 maxLength = "25" 
                                 className='form-control'
                                 ref={(input) => {this.input = input}}
                                 placeholder = '0'
                                 required />
                    
                    <button type="submit" className="btn btn-lg btn-primary">Deposit</button>
                  </div>
                </form>)
    
    const withdrawButton = (<button 
                              className="btn btn-lg btn-primary"
                              onClick={(event) => {
                                event.preventDefault()
                                this.withdraw()}}>
                                
                                Withdraw
                            </button>)
    
    const disabledWithdrawButton = (
                            <button 
                              type="submit"
                              className="btn btn-lg btn-outline-secondary disabled">
                                
                              Withdraw
                            </button>)
    
    const harvestButton = (<button 
                              type="submit"
                              className="btn btn-lg btn-primary"
                              onClick={(event) => {
                                event.preventDefault()
                                this.harvest()}}>
                                
                              Harvest
                           </button>)
                           
    const disabledHarvestButton = (
                            <button 
                              type="submit"
                              className="btn btn-lg btn-outline-secondary disabled">
                              
                              Harvest
                           </button>)
    
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
        	
    let depositSection = approveButton
    let withdrawSection = withdrawButton
    let harvestSection = harvestButton
    let returnValue

    //Check deposit section
    if (parseInt(this.state.allowance) >= parseInt(this.state.daiBalance))
        depositSection = depositButton;
            
    //Check withdraw section
    if (this.state.stakingDeposit==='0')
        withdrawSection = disabledWithdrawButton
    
    //Check harvest section
    if (parseInt(this.state.blocksStaking) <= parseInt(this.state.harvestCooldownBlocks))
        harvestSection = disabledHarvestButton
        	
    const userMenu = (
            <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm">
                <div className="deposit_column"></div>
                {depositSection}
                <br /><p />
              </div>
              <div className="col-sm">
                <div className="d-grid gap-2">
                  <p className="centered_text">Deposit: {this.state.fixedDeposit}</p>
                  {withdrawSection}
                </div>
                <br /><p />
              </div>
              <div className="col-sm">
                <div className="d-grid gap-2">
                  <p className="centered_text">Rewards: {this.state.fixedReward}</p>
                  {harvestSection}
                </div>
                <br /><p />
              </div>
              <div className="col-sm-1">
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

export default Ginko;

