import React, { Component } from 'react'
import Web3 from 'web3'
import GohmToken from '../abis/GohmToken.json'
import VaultAbi from '../abis/Vault.json'
import logo from '../pictures/vault.png'

class Vault extends Component 
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
    const gOhmTokenAddress = "0x91fa20244Fb509e8289CA630E5db3E9166233FDc"
  
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})   
    
    const networkId = await web3.eth.net.getId()

    // Load GohmToken
    if (networkId===fantomNetworkId) 
    {  
      const gOhmToken = new web3.eth.Contract(GohmToken.abi, gOhmTokenAddress)
      this.setState({gOhmToken})
          
      const gOhmBalance = await gOhmToken.methods.balanceOf(this.state.account).call()
      this.setState({gOhmBalance})
          
      const gOhmFixedBalance = (Math.floor(parseFloat(window.web3.utils.fromWei(this.state.gOhmBalance)) * 1000000) / 1000000).toFixed(6)
      this.setState({gOhmFixedBalance})
    }
       
    // Load Vault
    const VaultData = VaultAbi.networks[networkId]
    
    if(VaultData) 
    {
      const vault = new web3.eth.Contract(VaultAbi.abi, VaultData.address)
      this.setState({vault})
      
      const stakingDeposit = await vault.methods.getStakingDeposit().call({from: this.state.account})
      this.setState({stakingDeposit})
      
      const fixedDeposit = parseFloat(window.web3.utils.fromWei(this.state.stakingDeposit)).toFixed(6)
      this.setState({fixedDeposit})
      
      const stakingBlock = await vault.methods.getStakingBlock().call({from: this.state.account})
      this.setState({stakingBlock})
      
      const blocksStaking = await vault.methods.computeBlocksStaking().call({from: this.state.account})
      this.setState({blocksStaking})
      
      let userReward = '0'
      
      if (stakingDeposit > 0)
          userReward = await vault.methods.computeUserReward().call({from: this.state.account})

      this.setState({userReward})
      
      const fixedReward = parseFloat(window.web3.utils.fromWei(this.state.userReward)).toFixed(6)
      this.setState({fixedReward})
 
      const rewardsFund = await vault.methods.getRewardsFund().call()
      this.setState({rewardsFund})
      
      const fixedRewardsFund = parseFloat(window.web3.utils.fromWei(this.state.rewardsFund)).toFixed(6)
      this.setState({fixedRewardsFund})
      
      const totalStakingDeposits = await vault.methods.getTotalStakingDeposits().call()
      this.setState({totalStakingDeposits})
      
      const fixedTotalStakingDeposits = parseFloat(window.web3.utils.fromWei(this.state.totalStakingDeposits)).toFixed(6)
      this.setState({fixedTotalStakingDeposits})
      
      const harvestCooldownBlocks = await vault.methods.getHarvestCooldownBlocks().call()
      this.setState({harvestCooldownBlocks})
      
      const stakingBlockRange = await vault.methods.getStakingBlockRange().call()
      this.setState({stakingBlockRange})

      let auxStakingPower = (blocksStaking / stakingBlockRange) * 100
      
      if (auxStakingPower > 100)
          auxStakingPower = 100
            
      const stakingPower = auxStakingPower.toFixed(2)      
            
      this.setState({stakingPower})
      
      const monthlyAPR = ((rewardsFund / totalStakingDeposits) * 100).toFixed(2) 
      this.setState({monthlyAPR})
      
      const allowance = await this.state.gOhmToken.methods.allowance(this.state.account, VaultData.address).call()
      this.setState({allowance})
    }
    else 
    {
      window.alert('Vault contract not deployed on your current network.')
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
    const amount = this.state.gOhmBalance
  
    this.state.gOhmToken.methods.approve(this.state.vault._address, amount).send({from: this.state.account})
  }

  deposit = (amount) => 
  {
    if ((this.state.userReward > 0) &&
        (parseInt(this.state.blocksStaking) > parseInt(this.state.harvestCooldownBlocks)))
        
        window.alert('Increasing your deposit will reset your staking power. Harvest your pending rewards first or you will lose them.')
    else
        this.state.vault.methods.deposit(amount).send({from: this.state.account})
  }

  withdraw = () => 
  {
    this.state.vault.methods.withdraw().send({from: this.state.account})
  }
  
  harvest = () => 
  {
    this.state.vault.methods.harvest().send({from: this.state.account})
  }
  
  constructor(props) 
  {
    super(props)
    
    this.state = 
    {
      account: '0x0',
      vault: {},
      gOhmToken: {},
      gOhmBalance: '0',
      gOhmFixedBalance: '0',
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
                    <td>{this.state.gOhmFixedBalance} gOHM</td>
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
                    <td>{this.state.fixedRewardsFund} gOHM</td>
                  </tr>
                  <tr>
                    <td>Total deposits: </td>
                    <td>{this.state.fixedTotalStakingDeposits} gOHM</td>
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
    if (parseInt(this.state.allowance) >= parseInt(this.state.gOhmBalance))
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

export default Vault;
