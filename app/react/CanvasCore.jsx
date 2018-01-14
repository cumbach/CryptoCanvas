import React, { Component } from 'react'

import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

import App from './App.jsx'
import colors from './colors.js'

// Import our contract artifacts and turn them into usable abstractions.
import canvas_artifacts from './../../build/contracts/CanvasCore.json'

const TOTAL_PIXEL_COUNT = 100
const ASSUMED_INITIALLY_PURCHASED_PIXELS = 3
const COMPANY_ADDRESS = 'company address'
const COMPANY_OWNED_PIXEL_TEMPLATE = {
    link: 'www.cryptocanvas.io',
    comment: 'BUY THIS PIXEL!!!',
    owner: COMPANY_ADDRESS,
    coolDownTime: 9999,
}
export default class CanvasCore extends Component {
    constructor(props) {
        super(props)

        this.startUp = this.startUp.bind(this)
        this.totalPixels = this.totalPixels.bind(this)
        this.defaultPrice = this.defaultPrice.bind(this)
        this.isBuyable = this.isBuyable.bind(this)
        this.getPrice = this.getPrice.bind(this)
        this.getOwner = this.getOwner.bind(this)
        this.getLeaser = this.getLeaser.bind(this)
        this.buyPixels = this.buyPixels.bind(this)
        this.rentPixels = this.rentPixels.bind(this)
        this.getCanvas = this.getCanvas.bind(this)
        this.buySuccess = this.buySuccess.bind(this)
        this.rentSuccess = this.rentSuccess.bind(this)

        this.testCode = this.testCode.bind(this)
        this.testBuy = this.testBuy.bind(this)
        this.testRent = this.testRent.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.handleRemoveChange = this.handleRemoveChange.bind(this)
        this.handleChangePixel = this.handleChangePixel.bind(this)

        this.state = {
            status: null,
            amount: '',
            receiver: '',
            /* ^^ metacoin*/
            totalPixels: 0,
            defaultPrice: 0,
            isBuyable: false,
            price: 0,
            owner: '',
            leaser: '',
            canvas: [],

            pixels: [], // array of <Pixels>
            changes: {}, // eg: {pixelId: { color: <new color> }}
        }

        this.startUp()

        // FOR FAKE API
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

    setStatus(status) {
      this.setState({ status })
    }

    startUp() {
        const self = this
        this.CanvasCore = contract(canvas_artifacts);
        // Bootstrap the CanvasCore abstraction for Use.
        this.CanvasCore.setProvider(web3.currentProvider);

        this.CanvasCore.deployed().then(instance => {
          instance.BuyEvent(function(error, result){
            if (error) {
              console.log(error);
            } else {
              self.buySuccess();
            }
          });
          instance.RentEvent(function(error, result){
            if (error) {
              console.log(error);
            } else {
              self.rentSuccess();
            }
          });
        });

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

    buySuccess() {
      console.log('buy complete');
      // this.getCanvas()?
    }

    rentSuccess() {
      console.log('rent complete');
      // this.getCanvas()?
    }


    totalPixels() {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.totalPixels();
      }).then(totalPixels => {
        console.log('totalPixels: ');
        console.log(parseInt(totalPixels, 10));
        this.setState({'totalPixels': parseInt(totalPixels, 10)});
      });
    }

    // This is the price of all uninitialized pixels
    defaultPrice() {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.defaultPrice();
      }).then(defaultPrice => {
        console.log('defaultPrice: ');
        console.log(web3.fromWei(parseInt(defaultPrice, 10), 'ether'));
        this.setState({'defaultPrice': web3.fromWei(parseInt(defaultPrice, 10), 'ether')});
      });
    }

    isBuyable(pixelId) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.isBuyable(pixelId);
      }).then(buyable => {
        console.log(pixelId + ' isBuyable:');
        console.log(buyable);
        this.setState({'isBuyable': buyable});
      });
    }

    getPrice(pixelId) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.getPrice(pixelId);
      }).then(price => {
        console.log(pixelId + ' getPrice:');
        console.log(web3.fromWei(parseInt(price, 10),'ether'));
        this.setState({'price': web3.fromWei(parseInt(price))});

      });
    }

    getOwner(pixelId) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.getOwner(pixelId);
      }).then(owner => {
        console.log(pixelId + ' getOwner:');
        console.log(owner);
        this.setState({'owner': owner});
      });
    }

    getLeaser(pixelId) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.getLeaser(pixelId);
      }).then(leaser => {
        console.log(pixelId + ' getLeaser:');
        console.log(leaser);
        this.setState({'leaser': leaser});
      });
    }

    buyPixels(pixelIdsArray, colorsArray, url, comment, priceEther) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.buyPixels.sendTransaction(pixelIdsArray, colorsArray, url, comment, web3.toWei(priceEther, 'ether'), {from: web3.eth.accounts[0], value: web3.toWei(priceEther, 'ether')});
      }).then(transactionId => {
        console.log('buyPixels transaction posted (may take time to verify transaction)');
      });
    }

    rentPixels(pixelIdsArray, colorsArray, url, comment) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.rentPixels.sendTransaction(pixelIdsArray, colorsArray, url, comment, {from: web3.eth.accounts[0], gas: 300000});
      }).then(transactionId => {
        console.log('rentPixels transaction posted (may take time to verify transaction)');
      });
    }

    getCanvas() {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.getCanvas({gas: 300000});
      }).then(canvasStateArray => {
        const idsArray = canvasStateArray[0].map(function(bigNumId){
          return parseInt(bigNumId);
        });
        const colorsArray = canvasStateArray[1].map(function(bigNumColor){
          return parseInt(bigNumColor);
        });
        const priceArray = canvasStateArray[2].map(function(bigNumPrice){
          return web3.fromWei(parseInt(bigNumPrice, 10),'ether');
        });
        const buyableArray = canvasStateArray[3];
        const rentableArray = canvasStateArray[4];
        console.log('canvas:');
        console.log([idsArray, colorsArray, priceArray, buyableArray, rentableArray]);
        this.setState({'canvas': [idsArray, colorsArray, priceArray, buyableArray, rentableArray]})
        return [idsArray, colorsArray, priceArray, buyableArray, rentableArray];
      });
    }

    testCode() {
      console.log('Test Code:');
      // this.totalPixels();
      // this.defaultPrice();
      // this.getPrice(5);
      // this.isBuyable(5);
      // this.getOwner(5);
      // this.getLeaser(5);
    }

    testBuy() {
      // BUY LARGE PLOT:
      // let pixelIds = [];
      // let colors = [];
      // const price = 0.1 // this is in ether
      // for (var i = 3; i < 50; i++) {
      //   pixelIds.push(i);
      //   colors.push(1234);
      // }
      // this.buyPixels(pixelIds, colors, "url", "comment", price);

      // BUY SINGLE PIXEL:
      this.buyPixels([4], [1234], "one", "commentone", 0.002);
    }

    testRent() {
      // RENT SINGLE PIXEL:
      this.rentPixels([4], [1234], "two", "commenttwo");
    }



    // FAKED API DATA
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
                        buyable: Math.random() < .2 ? true : false,
                        color: Math.random() > 0.5 ? '#9300FF' : '#DDF0EA',
                        price: Math.floor(300 * Math.random()),
                    })
            }
        }

        this.setState({ pixels })
    }



    // FAKED API DATA
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





    handleChangePixel(id, changes) {
        this.setState((prevState, props) => {
            return {
                changes: {
                    ...prevState.changes,
                    [id]: {
                        ...prevState.changes[id],
                        ...changes
                    }
                }
            }
        })
    }

    handleChange(e) {
        e.preventDefault()
        this.setState({ [e.target.id]: e.target.value })
    }

    handleRemoveChange(id) {
      const { changes } = this.state
      const newChanges = { ...changes }
      delete newChanges[id]
      this.setState({
        changes: newChanges
      })
    }


    render() {
        const {
            changes,
            pixels,

            account,
            amount,
            receiver,
        } = this.state

        const updatedPixels = [ ...pixels ];
        Object.keys(changes).forEach((id) => {
          updatedPixels[id] = {
            ...updatedPixels[id],
            ...changes[id]
          }
        });

        const showIsBuyable = this.state.isBuyable ? 'true' : 'false';
        console.log(changes)


        return (
            <div>
                <App
                  pixels={updatedPixels}
                  onChangePixel={this.handleChangePixel}
                  changes={changes}
                  onRemoveChange={this.handleRemoveChange}
                />
                <h1 onClick={this.totalPixels}>totalPixels:{this.state.totalPixels}</h1><br/>
                <h1 onClick={this.defaultPrice}>defaultPrice:{this.state.defaultPrice}</h1><br/>
                <h1 onClick={this.isBuyable.bind(this, 5)}>isBuyable:{showIsBuyable}</h1><br/>
                <h1 onClick={this.getPrice.bind(this, 5)}>getPrice:{this.state.price}</h1><br/>
                <h1 onClick={this.getOwner.bind(this, 5)}>getOwner:{this.state.owner}</h1><br/>
                <h1 onClick={this.getLeaser.bind(this, 5)}>getLeaser:{this.state.leaser}</h1><br/>
                <h1 onClick={this.getCanvas}>getCanvas(console):{this.state.canvas}</h1><br/>
                <h1 onClick={this.testBuy}>Test:Fake Buy</h1><br/>
                <h1 onClick={this.testRent}>Test:Fake Rent</h1><br/>



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
