pragma solidity ^0.4.17;

import "./Ownable.sol";

contract CanvasCore {

	/// Buyable = 0: belongs to the owners. Depends on defaultBuyable
	/// Buyable = 1: is Buyable
	/// Buyable = 2: is not buyable
	mapping (uint => uint) buyable;

	/// Price for each pixelId. If not set, defaults to defaultPrice
	mapping (uint => uint) price;

	/// Owner for each pixelId. If not set, defaults to defaultOwner
	mapping (uint => address) owner;

	/// Leaser for each pixelId. If the pixel is not stale, the leaser
	/// is the owner. If it is stale and rented, the leaser is the user who has
	/// rented the pixel
	mapping (uint => address) leaser;

	/// Excess amount paid by the users is kept here and can be withdrawn.
	mapping (address => uint) withdrawAmount;

	/// Total number of pixels
	uint public totalPixels;

	/// Default values for all pixelIds initially created and owned by the creators
	bool public defaultBuyable;
	address public defaultOwner;
	uint public defaultPrice;

	/// Sets up the canvas with the total pixels (side * side)
	/// the default state of all pixels (all buyable or all unbuyable)
	/// and for each pixel owned by the creators, the default price of the pixel
	function CanvasCore(
			uint _totalPixels,
			bool _defaultBuyable,
			uint _defaultPrice)
			public
	{
			totalPixels = _totalPixels;
			defaultPrice = _defaultPrice; // in wei
			defaultOwner = msg.sender; // pixels are owned by contract creator by default
			defaultBuyable = _defaultBuyable;
	}

	/// Returns true if the given pixelId is buyable
	function isBuyable(uint _pixelId) public view returns (bool) {
			require(_pixelId > 0 && _pixelId <= totalPixels);
			if (buyable[_pixelId] == 2)
					return true;
			if (buyable[_pixelId] == 0 && defaultBuyable)
					return true;
	}

	/// Returns the price of any pixelId
	function getPrice(uint _pixelId) public view returns (uint) {
			require(_pixelId > 0 && _pixelId <= totalPixels);
			if (price[_pixelId] > 0) {
					return price[_pixelId];
			}
			return defaultPrice;
	}

	/// Gets the current leaser of the provided pixelId
	function getLeaser(uint _pixelId) public view returns (address) {
			require(_pixelId > 0 && _pixelId <= totalPixels);
			if (leaser[_pixelId] != 0) {
					return leaser[_pixelId];
			}
			return defaultOwner;
	}

	/// Gets the current owner of the provided pixelId
	function getOwner(uint _pixelId) public view returns (address) {
			require(_pixelId > 0 && _pixelId <= totalPixels);
			if (owner[_pixelId] != 0) {
					return owner[_pixelId];
			}
			return defaultOwner;
	}

	/// Takes in an array of pixelIds to buy. Also accepts payment.
	/// Buys and charges user for all pixels buyable.
	/// Sets that user as the owner and current leaser for those pixelIds
	/// Puts the remaining money in a withdrawAmount table which the user
	/// can get back his excess cash.
	function buyPixels(uint[] pixelIds) public payable {
			uint totalCost = 0;
			uint i;
			uint pixId;
			for (i = 0; i < pixelIds.length; i++) {
					pixId = pixelIds[i];
					if (isBuyable(pixId)) {
							totalCost += getPrice(pixId);
					}
			}
			uint amount = msg.value;
			require(amount >= totalCost);

			withdrawAmount[msg.sender] = amount - totalCost;

			for (i = 0; i < pixelIds.length; i++) {
					pixId = pixelIds[i];
					if (isBuyable(pixId)) {
							owner[pixId] = msg.sender;
							buyable[pixId] = 2;
					}
			}
	}
}
