pragma solidity ^0.4.17;

contract CanvasCore {


	/// Buyable = 0: belongs to the owners. Depends on defaultBuyable
	/// Buyable = 1: is Buyable
	/// Buyable = 2: is not buyable
	mapping (uint => uint) buyable;
	mapping (uint => uint) price;
	mapping (uint => address) owner;
	mapping (uint => address) leaser;
	mapping (address => uint) withdrawAmount;

	uint public totalPixels;

	bool public defaultBuyable;
	address public defaultOwner;
	uint public defaultPrice;

	function CanvasCore(
			uint _totalPixels,
			bool _defaultBuyable,
			uint _defaultPrice)
			public
	{
			totalPixels = _totalPixels;
			defaultPrice = _defaultPrice;
			defaultOwner = msg.sender;
			defaultBuyable = _defaultBuyable;
	}

	function isBuyable(uint _pixelId) public view returns (bool) {
			require(_pixelId > 0 && _pixelId <= totalPixels);
			if (buyable[_pixelId] == 2)
					return true;
			if (buyable[_pixelId] == 0 && defaultBuyable)
					return true;
	}

	function getPrice(uint _pixelId) public view returns (uint) {
			require(_pixelId > 0 && _pixelId <= totalPixels);
			if (price[_pixelId] > 0) {
					return price[_pixelId];
			}
			return defaultPrice;
	}

	function getLeaser(uint _pixelId) public view returns (address) {
			require(_pixelId > 0 && _pixelId <= totalPixels);
			if (leaser[_pixelId] != 0) {
					return leaser[_pixelId];
			}
			return defaultOwner;
	}

	function getOwner(uint _pixelId) public view returns (address) {
			require(_pixelId > 0 && _pixelId <= totalPixels);
			if (owner[_pixelId] != 0) {
					return owner[_pixelId];
			}
			return defaultOwner;
	}

	function buy(uint[] pixelIds) public payable {
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
