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
          		<p>Gō Finance is a cooperative DeFi platform. To use the farms, users must contribute to the shared fund by paying deposit fees. Smart contracts use the shared fund to automatically execute custom strategies that generate rewards for all depositors.</p>
          		<p>The web interface is open source and anyone can download and run it locally on their computer. Smart contracts have no owner privileges and run an immutable set of rules. They are deployed on Polygon and Fantom.</p>
          		<p>Keep in mind that trading is a risky activity that can involve a loss of money. You should only invest the amount you can afford to lose.</p>
          		<br /><p />
          		<p className="centered_text">----- Tokenomics -----</p>
          		<br />
          		<p>fGō is a fully decentralized token that can be staked to earn rewards. There are performance fees on some strategies that buy fGō from the market, which helps increase its price. The name comes from the gō (合) or cup, which is a traditional Japanese unit used for a serving of rice and a cup of sake in Japanese cuisine.</p>
          		<br />
          		<p>Token name: &nbsp;&nbsp;fGō</p>
          		<p>Total supply: &nbsp;&nbsp;1 million</p>
          		<p>Contract: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          		      0x827a19692B8BcEa675a8Bb5791048b2E2E616F16</p>
          		<br /><p />
          		<p className="centered_text">----- 合 Gō Farm -----</p>
          		<br />
          		<p>You can deposit your fGō tokens to earn fGō rewards that are variable and subject to the dynamics of supply and demand. Your rewards increase with your staking power, which depends on how often you harvest your rewards: the longer the time between harvests, the higher the staking power.</p>
          		
          		<p>You can harvest up to one time per day, but the maximum staking power is reached after one year without harvesting, at which point you must harvest to continue earning rewards.</p>
          		
          		<br />
          		<p>Contract: &nbsp;&nbsp;0xc99a8C938efFE3725952Ba083F624C364ed717FC</p>
          		<br /><p />
          		
          		<p className="centered_text">----- 丁半 Chō-Han -----</p>
          		<br />
				<p>Chō-Han is a traditional Japanese gambling game that involves the rolling of two standard six-sided dice. Before the dice are revealed, players must place their bets on the outcome. The outcome can either be 'Chō' (even) or 'Han' (odd), referring to the sum of the numbers on the two dice. Players place their bets by saying 'Chō' or 'Han' and putting their money on the table. After all the bets are placed, the dealer will uncover the cup or bowl and reveal the dice. Winning players receive double their bet.</p>
				
				<p>The minimum bet is 0.01 SUSHI and the maximum bet is half the treasury. The outcome of each game is calculated from a random number provided by ChainLink oracles, ensuring that the outcome depends solely on your luck.</p>
				
				<p>The house fee is 0.1% of the bet amount. One third of this fee is used to purchase Link tokens and pay ChainLink oracles, another third to purchase Gō tokens on the market and donate them to Gō Farm, and the last third is added to the treasury.</p>
          		
          		<br />
          		<p>Contract: &nbsp;&nbsp;0xfaa8172CD9DEdCc5AD8a1742F7d996908f4b0D11</p>
          		<br /><p />          		
          		
          		<p className="centered_text">----- 銀行 Ginkō -----</p>
          		<br />
          		<p>You can deposit your DAI tokens to earn DAI rewards that are variable and subject to the dynamics of supply and demand. Your rewards increase with your staking power, which depends on how often you harvest your rewards: the longer the time between harvests, the higher the staking power.</p>
          		
          		<p>You can harvest up to one time per day, but the maximum staking power is reached after one month without harvesting, at which point you must harvest to continue earning rewards.</p>
          		
          		<p>Deposit fees are used to buy TSHARE and deposit it in the Tomb Finance Masonry. Two-thirds of the TOMB rewards earned on Tomb Finance are used to buy DAI and deposit it in the rewards fund. The remaining third of the rewards are reinvested in the Masonry, increasing performance over time.</p>
          		
          		<br />
          		<p>Contract: &nbsp;&nbsp;0x34b67c2D8fC0c01Af91397b80d2E099138275FEB</p>
          		<br /><p /> 
          		
           		<p className="centered_text">----- 金庫 Vault -----</p>
          		<br />
          		<p>You can deposit your Olympus governance tokens (gOHM) to earn gOHM rewards that are variable and subject to the dynamics of supply and demand. Your rewards increase with your staking power, which depends on how often you harvest your rewards: the longer the time between harvests, the higher the staking power.</p>
          		
          		<p>You can harvest up to one time per day, but the maximum staking power is reached after one month without harvesting, at which point you must harvest to continue earning rewards.</p>
          		
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
