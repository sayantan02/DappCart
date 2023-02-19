// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract DappCart {

    string public website_name;
    address payable public owner;
    uint256 public cost = 0.01 ether;

    struct Product {
        uint256 id;
        string product_name;
        string desciption;
        uint256 product_price;
        string category;
        string product_image;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Product product;
    }

    Product[] products;

    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    constructor(string memory _web_name) {
        website_name = _web_name;
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed to perform this job");
        _;
    }

    function CreateProcuct(
        uint256 _id,
        string memory _product_name,
        string memory _product_desc,
        uint256 _product_price,
        string memory _product_image,
        string memory _category,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        require(_rating <= 5, "Rating should not be greater than 5");
        require(_stock != 0, "Product is not in stock");

        products.push(
            Product(
                _id,
                _product_name,
                _product_desc,
                _product_price,
                _category,
                _product_image,
                _rating,
                _stock
            )
        );
    }

    function changeProduct(
        uint256 _id,
        uint256 _stock,
        uint256 _price
    ) public onlyOwner {
        products[_id].stock = _stock;
        products[_id].product_price = _price;
    }

    function Purchase(uint256 _id) public payable {
        require(msg.sender != owner, "Owner cannot buy products");
        Product memory item = products[_id];
        require(msg.value >= item.product_price, "No sufficient Ether");

        // (bool sent,) = owner.call{value: msg.value}("");
        // require(sent,"Transaction failed.");
        
        Order memory order = Order(block.timestamp, item);

        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        products[_id].stock = item.stock - 1;
    }

    function getAllProducts() public view returns(Product[] memory) {
        return products;
    }
}
