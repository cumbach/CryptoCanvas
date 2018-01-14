pragma solidity ^0.4.17;

import "./Ownable.sol";

contract CanvasCore is Ownable {

    struct Pixel {
        address owner;
        // Leaser for each pixelId. If the pixel is not stale, the leaser
        // is the owner. If it is stale and rented, the leaser is the user who has
        // rented the pixel
        address leaser;
        string url;
        string comment;
        uint128 price;
        uint32 color;
        // Time at which the pixel becomes available for renting
        uint64 staleTime;
        // True if the pixel has been bought by someone else and is not owned
        // by the default contract owner anymore.
        bool inMarket;
    }

    address creator;

    // Default set for  the cooldown times for buying and selling.
    // This can be modified in onlyOwner functions.
    uint buyCooldownTime = 1 weeks;
    uint rentCooldownTime = 1 days;

    /// Excess amount paid by the users is kept here and can be withdrawn.
    mapping (address => uint) amountToWithdraw;
    /// Total number of pixels
    uint public totalPixels;
    /// Default values for all pixelIds initially created and owned by the creators
    bool public defaultBuyable;
    address public defaultOwner;
    uint public defaultPrice;

    /// A dynamic list of pixels.
    mapping(uint => Pixel) pixels;

    /// The number of pixels which are in market
    uint setPixels;

    /// Sets up the canvas with the total pixels (side * side)
    /// the default state of all pixels (all buyable or all unbuyable)
    /// and for each pixel owned by the creators, the default price of the pixel
    function CanvasCore(
            uint _totalPixels,
            bool _defaultBuyable,
            uint _defaultPrice)
            public
    {
        creator = msg.sender;
        totalPixels = _totalPixels;
        defaultPrice = _defaultPrice; // in wei
        defaultOwner = msg.sender; // pixels are owned by contract creator by default
        defaultBuyable = _defaultBuyable;
    }

    modifier isValidPixelId(uint _pixelId) {
        require(_pixelId >= 0 && _pixelId < totalPixels);
        _;
    }

    function setBuyCooldownTime(uint _buyCooldownTime) external onlyOwner {
        buyCooldownTime = _buyCooldownTime;
    }

    function setRentCooldownTime(uint _rentCooldownTime) external onlyOwner {
        rentCooldownTime = _rentCooldownTime;
    }

    /// Returns true if the given pixelId is buyable
    // If it has a non-zero price, or it is owned by the creators of the
    // contract and defaultBuyable is true, then it returns true.
    function isBuyable(uint _pixelId) public view isValidPixelId(_pixelId) returns (bool) {
        if (pixels[_pixelId].price > 0)
            return true;
        if (!pixels[_pixelId].inMarket)
            return defaultBuyable;
        return false;
    }

    /// Returns true if the given pixelId is rentable.
    // If it has an owner, its in the market and it became stale before the
    // current time, then it is marked as rentable.
    function isRentable(uint _pixelId) public view isValidPixelId(_pixelId) returns (bool) {
        return (pixels[_pixelId].owner > 0 && pixels[_pixelId].staleTime <= now);
    }

    /// Returns the price of any pixelId
    function getPrice(uint _pixelId) public view isValidPixelId(_pixelId) returns (uint) {
        if (!pixels[_pixelId].inMarket && defaultBuyable)
            return defaultPrice;

        return pixels[_pixelId].price;
    }

    /// Gets the current leaser of the provided pixelId
    function getLeaser(uint _pixelId) public view isValidPixelId(_pixelId) returns (address) {
        if (pixels[_pixelId].owner != 0) {
            return pixels[_pixelId].leaser;
        }
        return defaultOwner;
    }

    /// Gets the current owner of the provided pixelId
    function getOwner(uint _pixelId) public view isValidPixelId(_pixelId) returns (address) {
        if (pixels[_pixelId].owner != 0) {
            return pixels[_pixelId].owner;
        }
        return defaultOwner;
    }

    function getStaleTime(uint _pixelId) public view returns (uint, uint) {
        return (pixels[_pixelId].staleTime, now);
    }

    /// Takes in an array of pixelIds to buy. Also accepts payment.
    /// Buys and charges user for all pixels buyable.
    /// Sets that user as the owner and current leaser for those pixelIds
    /// Puts the remaining money in a amountToWithdraw table which the user
    /// can get back his excess cash.
    function buyPixels(
        uint[] _pixelIds,
        uint32[] _colors,
        string _url,
        string _comment,
        uint128 _price)
        public
        payable
    {
        // This block checks if the sender provided enough capital for the purchase.
        uint totalCost = 0;
        uint i;
        uint pixId;
        for (i = 0; i < _pixelIds.length; i++) {
            pixId = _pixelIds[i];
            if (isBuyable(pixId)) {
                totalCost += getPrice(pixId);
            }
        }
        uint amount = msg.value;
        require(amount >= totalCost);

        // Sets the excess funds in a withdrawAmount mapping.
        amountToWithdraw[msg.sender] += (amount - totalCost);

        // Sets the staleTime, which is the time when the pixel is up for renting
        uint64 _staleTime = uint64(buyCooldownTime + now);

        // Updates the owner and metadata.
        for (i = 0; i < _pixelIds.length; i++) {
            Pixel storage pixel = pixels[_pixelIds[i]];
            if (isBuyable(pixId)) {
                amountToWithdraw[getOwner(pixId)] += getPrice(pixId);
                pixel.owner = msg.sender;
                pixel.leaser = msg.sender;
                pixel.color = _colors[i];
                pixel.price = _price;
                pixel.staleTime = _staleTime;
                pixel.url = _url;
                pixel.comment = _comment;
                if (pixel.inMarket == false)
                    setPixels++;
                pixel.inMarket = true;
            }
        }
    }

    /// Takes in an array of pixelIds to rent. Also accepts payment.
    /// Rents and charges user for all pixels buyable.
    /// Sets that user as the current leaser for those pixelIds
    /// Puts the remaining money in a amountToWithdraw table which the user
    /// can get back his excess cash.
    function rentPixels(
        uint[] _pixelIds,
        uint32[] _colors,
        string _url,
        string _comment)
        public
        payable
    {
        // This block checks if the sender provided enough capital for the purchase.
        uint totalCost = 0;
        uint i;
        uint pixId;
        for (i = 0; i < _pixelIds.length; i++) {
            pixId = _pixelIds[i];
            if (isRentable(pixId)) {
                totalCost += getPrice(pixId);
            }
        }
        uint amount = msg.value;
        require(amount >= totalCost);

        // Sets the excess funds in a withdrawAmount mapping.
        amountToWithdraw[msg.sender] += (amount - totalCost);
        // Sets the staleTime, which is the time when the pixel is up for renting
        uint64 _rentedUntilTime = uint64(rentCooldownTime + now);

        // Updates the owner and metadata.
        for (i = 0; i < _pixelIds.length; i++) {
            Pixel storage pixel = pixels[_pixelIds[i]];
            if (isRentable(pixId)) {
                // Splits the price 50-50 between the current owner and
                // contract creator
                amountToWithdraw[getOwner(pixId)] += getPrice(pixId) / 2;
                amountToWithdraw[creator] += (getPrice(pixId) + 1) / 2;

                pixel.leaser = msg.sender;
                pixel.color = _colors[i];
                pixel.staleTime = _rentedUntilTime;
                pixel.url = _url;
                pixel.comment = _comment;
            }
        }
    }

    // Returns all the pixels that have been bought. These ignores the pixels that have
    // not undergone any transaction and are owned by the creator
    // Returns <= totalPixels elements in each element
    function getCanvas() external view returns (uint[], uint[], uint[], bool[], bool[]) {
        uint[] memory _pixelIds = new uint[](setPixels);
        uint[] memory _colors = new uint[](setPixels);
        uint[] memory _prices = new uint[](setPixels);
        bool[] memory _buyable = new bool[](setPixels);
        bool[] memory  _rentable = new bool[](setPixels);

        uint counter = 0;
        for (uint i = 1; i <= totalPixels; i++) {
            if (pixels[i].owner > 0) {
                _pixelIds[counter] = i;
                _colors[counter] = pixels[i].color;
                _prices[counter] = pixels[i].price;
                _buyable[counter] = isBuyable(i);
                _rentable[counter] = isRentable(i);
                counter++;
            }
        }

        return (_pixelIds, _colors, _prices, _buyable, _rentable);
    }

    function withdraw() public {
        uint amount = amountToWithdraw[msg.sender];
        amountToWithdraw[msg.sender] = 0;

        if (!msg.sender.send(amount))
            amountToWithdraw[msg.sender] = amount;
    }
}