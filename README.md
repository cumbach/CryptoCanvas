# CryptoCanvas
Project created with React, Truffle, Ganache, Webpack, and Babel

To Run:

```
git clone git@github.com:cumbach/CryptoCanvas.git
cd CryptoCanvas/
npm install
truffle compile
(new terminal window)
ganache-cli
truffle migrate --reset
(install MetaMask)
(set Metamask to localhost)
(add users to Metamask with private keys from ganache-cli log)
npm start

Go to `localhost:8080`
```

## Public Variables
totalPixels: total number of pixels


## Public Functions

### isBuyable(pixelId)
Returns true if the given pixelId is buyable

### getPrice(pixelId)
Returns the price of any pixelId

### getLeaser(pixelId)
Gets the current leaser of the provided pixelId (defaults to contractOwner)

### getOwner(pixelId)
Returns the current owner of the provided pixelId (defaults to contractOwner)

### buyPixels([pixelIds], [colors], url, comment, price) // (colors: hex string, price in wei)
Takes in an array of pixelIds to buy. Also accepts payment.
Buys and charges user for all pixels buyable.
Sets that user as the owner and current leaser for those pixelIds
Puts the remaining money in a withdrawAmount table which the user
can get back his excess cash.
