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

### I want to reiterate an analogy that I like to make:
- This idea is analogous to the real life equivalent of a billboard, except that the billboard is accessible all around the world, can never be taken down, and doesn’t have any one “true” owner.
- People can pay to own parts of the billboard, which they are free to do with as they please. They can advertise, draw, and promote. They can do nothing. They can sit on it and speculate. They can sell it for whatever price they want.
- However, as with a real billboard, if you just leave it up by the side of the road and don't maintain it, eventually people will deface it with their own "art", the elements will wear it down, or it will get covered in bird poop.
- As with a real billboard, when you purchase the space, you can pay an upfront fee for it to be maintained for a specified amount of time, but you will still need to occasionally renew your contract to keep it maintained.



## Early wireframes
- Landing page shows Canvas (center) and hidden panel on the right
- Click to expand the panel, Canvas slides left, color selector bar appears at bottom, all pixels go white
- Panel has "Buy" and "Rent" tabs
- Buy/Rent both display a list of all transactions, "link" and "comment" input fields, duration slider, and costs
- Buy tab additionally allows users to filter pixels by price via slider
- Rent tab allows users to filter pixels by current availability

## Example user flow:
- User1 goes to the app and wants to purchase a 64x64 plot for an advertisement. They open the panel and select the "Buy" tab. They can use the slider to find a plot that they like and can afford. They "draw" using the color selector bar at the bottom. As they draw, a growing list of transactions appears in the panel. When the drawing is complete, they can set a link that the app would go to and a comment it would display on hover. User1 wants the ad to display for at least 3 months, so they add 11 weeks to the duration (increasing costs). Clicking complete would open Metamask with the grand total (cost of running the code and the transaction cost), and allow them to execute the bulk purchase.

- After 3 months, User2 sees that the plot of pixels has gone stale. User2 is able to "rent" the space and create a doodle (for "free").

- User1 sees that their ad has been defaced. They then have to go back and redo their work (they can pay to add time to the duration but instead decide to stick to the default free "week").

- User1 is able to come back at any point within the free week and "refresh" their work (for "free") to keep it from going stale. They come back on a weekly basis to refresh. Every time they refresh their art, the cooldownTime starts over at a week.


## CanvasCore (Contract)
The overall contract that contains all the functionality (ERC721, Ownable).

## Pixel (Struct)
The primary element of this contract - has features and can be bought and rented.

### buyPixels
Users are able to buy pixels (if the owner has set a price). When you buy pixels, you set the new properties. One of these properties will be the "cooldownTime" or the time for the pixel to go "stale". There is a free default cooldownTime (see ownerOnly), but users can pay extra to extend their initial cooldownTime. At any point, the pixel owners can also pay to add time.

Stale pixels retain their properties until someone changes them through a buy or rent action.

### rentPixels
When a pixel goes "stale", aka it passes its cooldownTime, other users will be able to rent the pixel.

For MVP:
- Users are only able to rent a stale pixel when it has become stale. There is a default amount of time that they can rent it for (see ownerOnly), which resets the pixel's properties and updates the cooldownTime.

- At any time, the owner of that pixel can re-seize control of the pixel (revert the properties), but this won't take effect until the new cooldownTime has been reached

For Final Product:
- We may want to consider allowing users to "bid" on pixels before they become stale. We may also want to consider allowing users to pay extra to rent pixels for longer than the default time. This will allow us to introduce the idea of paying the pixel owners when lots of people want to rent their property.

### changeMeta
Set off during a buy or rent action. Changes the properties such as color, link, comment.

### transferOwnership
Pixels will each have their own price (set by the purchaser during a buy action). If the price is set to null, the pixel is not for sale. Users can buy pixels (setting off transferOwnership) at any point.

### ownerOnly
We will need a way to control various aspects of the contract, although not too much. Ethereum has a handy way of allowing the ContractOwner to execute private functions. This function will allow the company to reset things like the default (free) cooldownTime, rentalFees (not in MVP) and buyingFees.
