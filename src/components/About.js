import React, { Component } from 'react'

class About extends Component 
{
  render() 
  {
    const content = (
            <div className="row">
                <br /><p />	
                <br /><p />
                <br /><p />
                <br />
              <div className="col-sm">
                <p className="centered_text">----- Overview -----</p>
                <br />
          		<p>Gō Finance is a 100% decentralized DeFi platform with an open source web interface that anyone can download and run locally on their computer.</p>
          		<p>Smart contracts have no owner privileges and run an immutable set of rules. They are deployed on BSC, Polygon and Fantom.</p>
          		<p>Keep in mind that trading is a risky activity that can involve a loss of money. You should only invest the amount you can afford to lose.</p>
          		<br /><p />
          		<p className="centered_text">----- Tokenomics -----</p>
          		<br />
          		<p>fGō is a fully decentralized token with limited supply and very slow issuance, which makes it a good store of value. The name comes from the gō (合) or cup, which is a traditional Japanese unit used for a serving of rice and a cup of sake in Japanese cuisine.</p>
          		<br />
          		<p>Token name: &nbsp;&nbsp;fGō</p>
          		<p>Total supply: &nbsp;&nbsp;1 million</p>
          		<p>Contract: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          		      0x827a19692B8BcEa675a8Bb5791048b2E2E616F16</p>
          		<br /><p />
          		<p className="centered_text">----- 合 Gō Farm -----</p>
          		<br />
          		<p>You can stake your fGō tokens to earn fGō rewards that are variable and subject to the dynamics of supply and demand. Your rewards increase with your staking power, which depends on how often you harvest your rewards: the longer the time between harvests, the higher the staking power.</p>
          		
          		<p>You can harvest up to one time per day, but the maximum staking power is reached after one year without harvesting. Keep in mind that your rewards may suddenly increase or decrease depending on how much other users harvest and the total deposits on the farm, so the most conservative approach is frequent harvests.</p>
          		
          		<br />
          		<p>Contract: &nbsp;&nbsp;0xc99a8C938efFE3725952Ba083F624C364ed717FC</p>
          		<br /><p />
          		
          		<p className="centered_text">----- 銀行 Ginkō -----</p>
          		<br />
          		<p>You can stake your DAI tokens to earn DAI rewards that are variable and subject to the dynamics of supply and demand. Your rewards increase with your staking power, which depends on how often you harvest your rewards: the longer the time between harvests, the higher the staking power.</p>
          		
          		<p>You can harvest up to one time per day, but the maximum staking power is reached after one month without harvesting. Keep in mind that your rewards may suddenly increase or decrease depending on how much other users harvest and the total deposits on the contract, so the most conservative approach is frequent harvests.</p>
          		
          		<p>Deposit fees are used to buy TSHARE and deposit it in the Tomb Finance Masonry. Two-thirds of the TOMB rewards earned on Tomb Finance are used to buy DAI and deposit it in the rewards fund. The remaining third of the rewards are reinvested in the Masonry, increasing performance over time.</p>
          		
          		<br />
          		<p>Contract: &nbsp;&nbsp;0x34b67c2D8fC0c01Af91397b80d2E099138275FEB</p>
          		<br /><p /> 
          		
          		<p className="centered_text">----- 将軍 Shōgun Pool -----</p>
          		<br />
          		<p>You can stake your fGō tokens to earn DAI rewards that are variable and subject to the dynamics of supply and demand. Your rewards increase with your staking power, which depends on how often you harvest your rewards: the longer the time between harvests, the higher the staking power.</p>
          		
          		<p>You can harvest up to one time per day, but the maximum staking power is reached after one month without harvesting. Keep in mind that your rewards may suddenly increase or decrease depending on how much other users harvest and the total deposits on the contract, so the most conservative approach is frequent harvests.</p>
          		
          		<p>Deposit fees are used to buy BSHARE and deposit it in the Based Finance Acropolis. Two-thirds of the BASED rewards earned on Based Finance are used to buy DAI and deposit it in the rewards fund. The remaining third of the rewards are reinvested in the Acropolis, increasing performance over time.</p>
          		
          		<br />
          		<p>Contract: &nbsp;&nbsp;0x8DEEBDa6AA4d8c86653bB984e647ef5dEE575982</p>
          		<br /><p />           		

          		<p className="centered_text">----- 霊 Rei Pool -----</p>
          		<br />
          		<p>You can stake your fGō tokens to earn AAVE rewards that are variable and subject to the dynamics of supply and demand. Your rewards increase with your staking power, which depends on how often you harvest your rewards: the longer the time between harvests, the higher the staking power.</p>
          		
          		<p>You can harvest up to one time per day, but the maximum staking power is reached after one month without harvesting. Keep in mind that your rewards may suddenly increase or decrease depending on how much other users harvest and the total deposits on the contract, so the most conservative approach is frequent harvests.</p>
          		
          		<p>Deposit fees are used to buy BSHARE and deposit it in the Based Finance Acropolis. Two-thirds of the BASED rewards earned on Based Finance are used to buy AAVE and deposit it in the rewards fund. The remaining third of the rewards are reinvested in the Acropolis, increasing performance over time.</p>
          		
          		<br />
          		<p>Contract: &nbsp;&nbsp;0x1eAcE63DdAAFAd808f0FE4757774f0d7f3328A09</p>
          		<br /><p /> 

          		<p className="centered_text">----- 気 Ki Pool -----</p>
          		<br />
          		<p>You can stake your fGō tokens to earn 2OMB rewards that are variable and subject to the dynamics of supply and demand. Your rewards increase with your staking power, which depends on how often you harvest your rewards: the longer the time between harvests, the higher the staking power.</p>
          		
          		<p>You can harvest up to one time per day, but the maximum staking power is reached after one month without harvesting. Keep in mind that your rewards may suddenly increase or decrease depending on how much other users harvest and the total deposits on the contract, so the most conservative approach is frequent harvests.</p>
          		
          		<p>Deposit fees are used to buy BSHARE and deposit it in the Based Finance Acropolis. Two-thirds of the BASED rewards earned on Based Finance are used to buy 2OMB and deposit it in the rewards fund. The remaining third of the rewards are reinvested in the Acropolis, increasing performance over time.</p>
          		
          		<br />
          		<p>Contract: &nbsp;&nbsp;0x939f6DC232Bc5e02b336Fd1C6B46E2A516D442B0</p>
          		<br /><p />  
          		
          		<p className="centered_text">----- 金庫 Vault -----</p>
          		<br />
          		<p>You can stake your Olympus governance tokens (gOHM) to earn gOHM rewards that are variable and subject to the dynamics of supply and demand. Your rewards increase with your staking power, which depends on how often you harvest your rewards: the longer the time between harvests, the higher the staking power.</p>
          		
          		<p>You can harvest up to one time per day, but the maximum staking power is reached after one month without harvesting. Keep in mind that your rewards may suddenly increase or decrease depending on how much other users harvest and the total deposits on the contract, so the most conservative approach is frequent harvests.</p>
          		
          		<p>Deposit fees are used to buy TSHARE and deposit it in the Tomb Finance Masonry. Two-thirds of the TOMB rewards earned on Tomb Finance are used to buy gOHM and deposit it in the rewards fund. The remaining third of the rewards are reinvested in the Masonry, increasing performance over time.</p>
          		
          		<br />
          		<p>Contract: &nbsp;&nbsp;0xd97F1e594EC1e3eC0E00cCc2A8d4fF9E1B62Ee6F</p>
          		<br /><p />           		
          		
          		<p className="centered_text">----- Disclaimer -----</p>
          		<br />
          		<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
          		
          		<br /><p />	
                <br /><p />
              </div>
		    </div>)
	
    let returnValue;

    returnValue = (
           <div className="container">
              {content}
	       </div>);   

     return returnValue;
   }
}

export default About;
