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
        this.totalPixels = this.totalPixels.bind(this)
        this.defaultPrice = this.defaultPrice.bind(this)
        this.isBuyable = this.isBuyable.bind(this)
        this.getPrice = this.getPrice.bind(this)
        this.getOwner = this.getOwner.bind(this)
        this.getLeaser = this.getLeaser.bind(this)
        this.buyPixels = this.buyPixels.bind(this)
        this.getCanvas = this.getCanvas.bind(this)

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
        })
    }

    // setStatus(status) {
    //     this.setState({ status })
    // }

    totalPixels() {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.totalPixels();
      }).then(totalPixels => {
        console.log('totalPixels: ');
        console.log(parseInt(totalPixels, 10));
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

    buyPixels(pixelIdsArray, colorsArray, url, comment, priceWei, cooldownTime) {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.buyPixels.sendTransaction(pixelIdsArray, colorsArray, url, comment, web3.toWei(priceWei, 'ether'), cooldownTime, {from: web3.eth.accounts[0], value: web3.toWei(priceWei, 'ether')});
      }).then(transactionId => {
        console.log('buyPixels transaction posted (may take time to verify transaction)');
      });
    }

    getCanvas() {
      this.CanvasCore.deployed().then(instance => {
        const canvas = instance;
        return canvas.getCanvas({gas: 300000});
      }).then(canvasStateArray => {
        console.log('Pixels Ids:')
        console.log(canvasStateArray[0].map(function(bigNumId){
          return parseInt(bigNumId);
        }));
        console.log('Pixels Colors:')
        console.log(canvasStateArray[1].map(function(bigNumColor){
          return parseInt(bigNumColor);
        }));
        console.log('Pixels Prices:')
        console.log(canvasStateArray[2].map(function(bigNumPrice){
          return parseInt(bigNumPrice);
        }));
        console.log('Pixels Buyable:')
        console.log(canvasStateArray[3]);
        console.log('Pixels Rentable')
        console.log(canvasStateArray[4]);
      });
    }

    testCode() {
      console.log('Test Code:');
      // ASK ME FOR EXPLANATION HERE!!!
      // this.getCanvas();
      // this.totalPixels();
      // this.defaultPrice();
      // this.getPrice(5);
      // this.isBuyable(5);
      // this.getOwner(5);
      // this.getLeaser(5);

      // BUY LARGE PLOT:
      // let pixelIds = [];
      // let colors = [];
      // const price = 0.1 // this is in ether
      // const cooldownTime = 3600 // this is in seconds
      // for (var i = 3; i < 50; i++) {
      //   pixelIds.push(i);
      //   colors.push(1234);
      // }
      // this.buyPixels(pixelIds, colors, "url", "comment", price, cooldownTime);

      // BUY SINGLE PIXEL:
      // this.buyPixels([1], [1234], "url", "comment", 0.1, 1);
    }

    render() {
      return <h1 onClick={this.testCode}>CLICK THIS TO RUN TEST CODE</h1>
    }

}
