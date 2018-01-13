import React, { Component } from 'react'

import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import canvas_artifacts from './../../build/contracts/CanvasCore.json'


export default class CanvasCore extends Component {
    constructor(props) {
        super(props)
        this.startUp = this.startUp.bind(this)
        this.testCode = this.testCode.bind(this)
        this.getPrice = this.getPrice.bind(this)
        // this.refreshBalance = this.refreshBalance.bind(this)
        // this.sendCoin = this.sendCoin.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            status: null,
            amount: '',
            receiver: '',
        }
        this.startUp()
    }

    componentDidMount() {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
           console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
            //  Use Mist/MetaMask's provider
            this.web3 = new Web3(web3.currentProvider);
        } else {
            console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        }
    }

    startUp() {
        const self = this
        this.CanvasCore = contract(canvas_artifacts);
        // Bootstrap the CanvasCore abstraction for Use.
        this.CanvasCore.setProvider(web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.")
                return
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
                return
            }
            self.setState({
                accounts: accs,
                account: accs[0]
            })

            // self.refreshBalance();
        })
    }

    setStatus(status) {
        this.setState({ status })
    }

    // refreshBalance() {
    //     const { account } = this.state
    //     var meta
    //     this.CanvasCore.deployed().then(instance => {
    //         meta = instance
    //         return meta.getBalance.call(account, { from: account });
    //     }).then(value => {
    //         this.setState({ balance: value.valueOf() })
    //     }).catch(e => {
    //         console.log(e);
    //         this.setStatus("Error getting balance; see log.");
    //     });
    // }
    //
    // sendCoin() {
    //     const { account, amount, receiver } = this.state
    //
    //     this.setStatus("Initiating transaction... (please wait)");
    //
    //     var meta
    //     var self = this
    //     this.CanvasCore.deployed().then(instance => {
    //         meta = instance
    //         return meta.sendCoin(receiver, parseInt(amount), { from: account });
    //     }).then(() => {
    //         self.setStatus("Transaction complete!");
    //         self.refreshBalance();
    //     }).catch(e => {
    //         console.log(e);
    //         self.setStatus("Error sending coin; see log.");
    //     })
    // }
    getPrice() {
      console.log('getPrice');
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.getPrice(5);
      }).then(price => {
        console.log(price);
      });

    }

    testCode() {
      this.getPrice();

    }

    handleChange(e) {
        e.preventDefault()
        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        const {
            account,
            amount,
            receiver,
        } = this.state

        return (
            <div>
                <h1>CryptoCanvasjsx</h1>
                <h2>Example Truffle Dapp</h2>
                <h3>
                    You have <span className="black"><span id="balance">{this.state.balance}</span> META</span></h3>
                <br/>
                <h1>Test Code</h1>
                <form>
                    <label>
                        Amount:
                    </label>
                    <input
                        value={this.state.amount}
                        onChange={this.handleChange}
                        type="text"
                        id="amount"
                        placeholder="e.g., 95"
                    />
                    <br/>
                    <br/>
                    <label>
                        To Address:
                    </label>
                    <input
                        value={this.state.receiver}
                        onChange={this.handleChange}
                        type="text"
                        id="receiver"
                        placeholder="e.g., 0x93e66d9baea28c17d9fc393b53e3fbdd76899dae"
                    />
                </form>
                <br/><br/>
                <button id="send" onClick={this.testCode}>
                    Send MetaCoin
                </button>
                <br/><br/>
                <span id="status"></span>
                <br/>
                <span className="hint"><strong>Hint:</strong> open the browser developer console to view any errors and warnings.</span>
            </div>
        )
    }

}



// window.addEventListener('load', function () {
//     // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//     if (typeof web3 !== 'undefined') {
//         console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
//         // Use Mist/MetaMask's provider
//         window.web3 = new Web3(web3.currentProvider);
//     } else {
//         console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
//         // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//         window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
//     }


// });
