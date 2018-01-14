import React, { Component } from 'react'

import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'


// Import our contract artifacts and turn them into usable abstractions.
import canvas_artifacts from './../../build/contracts/CanvasCore.json'

const TOTAL_PIXEL_COUNT = 100
const ASSUMED_INITIALLY_PURCHASED_PIXELS = 3
const COMPANY_ADDRESS = 'company address'
const COMPANY_OWNED_PIXEL_TEMPLATE = {
    color: 4,
    link: 'www.cryptocanvas.io',
    comment: 'BUY THIS PIXEL!!!',
    owner: COMPANY_ADDRESS,
    price: 10,
    coolDownTime: 9999,
}
export default class CanvasCore extends Component {
    constructor(props) {
        super(props)
        this.startUp = this.startUp.bind(this)
        this.testCode = this.testCode.bind(this)
        this.checkPublicVars = this.checkPublicVars.bind(this)
        this.isBuyable = this.isBuyable.bind(this)
        this.getPrice = this.getPrice.bind(this)
        this.getOwner = this.getOwner.bind(this)
        this.getLeaser = this.getLeaser.bind(this)
        this.buyPixels = this.buyPixels.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            status: null,
            amount: '',
            receiver: '',
            pixels: [], // array of <Pixels>
            changes: {}, // eg: {pixelId: { color: <new color> }}
        }
        this.startUp()
        this.getAllPixels().then(pixels => {
            this.intializePixels(pixels)
        })
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
        })
    }

    testCode() {
        this.getPrice();
    }

    intializePixels(fetchedPixels) {
        const pixels = []
        let pixelMap
        if (fetchedPixels && fetchedPixels.length) {
            pixelMap = fetchedPixels.reduce((acc, pixel) => {
                return ({
                    ...acc,
                    [pixel.id]: pixel,
                })
            }, {})
        } else pixelMap = {}

        //Can incorporate a redundant check with getTotalPixels() later


        for (var i = 0; i < TOTAL_PIXEL_COUNT; i++) {
            if (pixelMap[i]) {
                pixels.push(pixelMap[i])
            } else {
                pixels.push({
                    ...COMPANY_OWNED_PIXEL_TEMPLATE,
                    id: i,
                    })
            }
        }

        this.setState({ pixels })
    }

    getAllPixels() {
        //Mocking the data received from the SmarContract for now
        // SHOULD ALWAYS RETURN A PROMISE!
        return new Promise(resolve => {
            setTimeout(resolve, 500)
            return [
                {
                    id: 27,
                    color: 0,
                    link: 'https://www.google.com',
                    comment: 'hi mom',
                    owner: 'addressowner1',
                    price: 27, // ?Fraction of Ether?
                    coolDownTime: 200, //hours
                },
                {
                    id: 1,
                    color: 2,
                    link: 'https://www.yahoo.com',
                    comment: 'crytpomania',
                    owner: 'addressowner2',
                    price: 100, // ?Fraction of Ether?
                    coolDownTime: 300, //hours
                },
                {
                    id: 27,
                    color: 4,
                    link: 'https://www.google.com',
                    comment: 'hello world',
                    owner: 'addressowner3',
                    price: 50, // ?Fraction of Ether?
                    coolDownTime: 100, //hours
                },
            ]
        })
    }

    handleChangePixel({ id, field, newValue }) {
        this.setState({
            changes: {
                [field]: value,
            }
        })
    }

    //ALL CODE BELOW HERE RE: METACOIN
    setStatus(status) {
        this.setState({ status })
    }

    checkPublicVars() {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.totalPixels;
      }).then(totalPixels => {
        console.log('checkPublicVars');
        console.log(totalPixels);
      });
    }

    isBuyable(pixelId) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.isBuyable(pixelId);
      }).then(buyable => {
        console.log(pixelId + ' isBuyable:');
        console.log(buyable);
      });
    }

    getPrice(pixelId) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.getPrice(pixelId);
      }).then(price => {
        console.log(pixelId + ' getPrice:');
        console.log(price);
      });
    }

    getOwner(pixelId) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.getOwner(pixelId);
      }).then(owner => {
        console.log(pixelId + ' getOwner:');
        console.log(owner);
      });
    }

    getLeaser(pixelId) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.getLeaser(pixelId);
      }).then(leaser => {
        console.log(pixelId + ' getLeaser:');
        console.log(leaser);
      });
    }

    buyPixels(pixelIdsArray, colorsArray, url, comment, price) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.buyPixels(pixelIdsArray, colorsArray, url, comment, price);
      }).then(idk => {
        console.log('buyPixels: ');
        console.log(idk);
      });
    }

    testCode() {
      this.checkPublicVars();
      // this.getPrice(5);
      // this.isBuyable(5);
      // this.getOwner(5);
      // this.getLeaser(5)
      // this.buyPixels([4,5,6], ['#ff0000', '#ff0000', '#ff0000'], 'www.x.com', 'comment', 100);
    }

    handleChange(e) {
        e.preventDefault()
        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        const {
            pixels,

            account,
            amount,
            receiver,
        } = this.state

<<<<<<< Updated upstream
        return (
            <div>
                <App
                    pixels={pixels}
                    onChangePixel={this.handleChangePixel}
                />
                <br/>
                <br/>
                <br/>
                --------------------------------------------------------
                ^^ Our app above
                legacy Megacoin render below ~
                --------------------------------------------------------
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
=======
        return <h1 onClick={this.testCode}>CLICK THIS TO RUN TEST CODE</h1>
>>>>>>> Stashed changes
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
