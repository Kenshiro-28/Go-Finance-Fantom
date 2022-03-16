import React, { Component } from 'react'
import Web3 from 'web3'
import GoToken from '../abis/GoToken.json'
import ShogunPoolAbi from '../abis/ShogunPool.json'
import logo from '../pictures/dai.png'

class ShogunPool extends Component 
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
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})   
    
    const networkId = await web3.eth.net.getId()

    // Load GoToken
    const goTokenData = GoToken.networks[networkId]
    
    if (goTokenData) 
    {
      const goToken = new web3.eth.Contract(GoToken.abi, goTokenData.address)
      this.setState({goToken})
      
      const goBalance = await goToken.methods.balanceOf(this.state.account).call()
      this.setState({goBalance})
      
      const goFixedBalance = (Math.floor(parseFloat(window.web3.utils.fromWei(this.state.goBalance)) * 10000) / 10000).toFixed(4)
      this.setState({goFixedBalance})
    } 
    else 
    {
      window.alert('Gō contract not deployed on your current network.')
    }
    
    // Load ShogunPool
    const shogunPoolData = ShogunPoolAbi.networks[networkId]
    let shogunPool
    
    if(shogunPoolData) 
    {
      shogunPool = new web3.eth.Contract(ShogunPoolAbi.abi, shogunPoolData.address)
      this.setState({shogunPool})
      
      const stakingDeposit = await shogunPool.methods.getStakingDeposit().call({from: this.state.account})
      this.setState({stakingDeposit})
      
      const fixedDeposit = parseFloat(window.web3.utils.fromWei(this.state.stakingDeposit)).toFixed(4)
      this.setState({fixedDeposit})
      
      const stakingBlock = await shogunPool.methods.getStakingBlock().call({from: this.state.account})
      this.setState({stakingBlock})
      
      const blocksStaking = await shogunPool.methods.computeBlocksStaking().call({from: this.state.account})
      this.setState({blocksStaking})
      
      let userReward = '0'
      
      if (stakingDeposit > 0)
          userReward = await shogunPool.methods.computeUserReward().call({from: this.state.account})

      this.setState({userReward})
      
      const fixedReward = parseFloat(window.web3.utils.fromWei(this.state.userReward)).toFixed(4)
      this.setState({fixedReward})
 
      const rewardsFund = await shogunPool.methods.getRewardsFund().call()
      this.setState({rewardsFund})
      
      const fixedRewardsFund = parseFloat(window.web3.utils.fromWei(this.state.rewardsFund)).toFixed(2)
      this.setState({fixedRewardsFund})
      
      const totalStakingDeposits = await shogunPool.methods.getTotalStakingDeposits().call()
      this.setState({totalStakingDeposits})
      
      const fixedTotalStakingDeposits = parseFloat(window.web3.utils.fromWei(this.state.totalStakingDeposits)).toFixed(4)
      this.setState({fixedTotalStakingDeposits})
      
      const harvestCooldownBlocks = await shogunPool.methods.getHarvestCooldownBlocks().call()
      this.setState({harvestCooldownBlocks})
      
      const stakingBlockRange = await shogunPool.methods.getStakingBlockRange().call()
      this.setState({stakingBlockRange})

      let auxStakingPower = (blocksStaking / stakingBlockRange) * 100
      
      if (auxStakingPower > 100)
          auxStakingPower = 100
            
      const stakingPower = auxStakingPower.toFixed(2)      
            
      this.setState({stakingPower})
      
      const monthlyRewards = (fixedRewardsFund / fixedTotalStakingDeposits).toFixed(2) 
      this.setState({monthlyRewards})
      
      const allowance = await this.state.goToken.methods.allowance(this.state.account, shogunPoolData.address).call()
      this.setState({allowance})
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
    const amount = this.state.goBalance
  
    this.state.goToken.methods.approve(this.state.shogunPool._address, amount).send({from: this.state.account})
  }

  deposit = (amount) => 
  {
    if ((this.state.userReward > 0) &&
        (parseInt(this.state.blocksStaking) > parseInt(this.state.harvestCooldownBlocks)))
        
        window.alert('Increasing your deposit will reset your staking power. Harvest your pending rewards first or you will lose them.')
    else
        this.state.shogunPool.methods.deposit(amount).send({from: this.state.account})
  }

  withdraw = () => 
  {
    this.state.shogunPool.methods.withdraw().send({from: this.state.account})
  }
  
  harvest = () => 
  {
    this.state.shogunPool.methods.harvest().send({from: this.state.account})
  }
  
  constructor(props) 
  {
    super(props)
    
    this.state = 
    {
      account: '0x0',
      goToken: {},
      shogunPool: {},
      goBalance: '0',
      goFixedBalance: '0',
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
      monthlyRewards: '0',
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
                    <td>{this.state.goFixedBalance} fGō</td>
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
                    <td>Harvest lockup: </td>
                    <td>1 day</td>
                  </tr>
                  <tr>
                    <td>Monthly rewards: &nbsp;&nbsp;</td>
                    <td>{this.state.monthlyRewards} DAI (per token)</td>
                  </tr>
                  <tr>
                    <td>Rewards fund: </td>
                    <td>{this.state.fixedRewardsFund} DAI</td>
                  </tr>
                  <tr>
                    <td>Total deposits: </td>
                    <td>{this.state.fixedTotalStakingDeposits} fGō</td>
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
    if (parseInt(this.state.allowance) >= parseInt(this.state.goBalance))
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

export default ShogunPool;
