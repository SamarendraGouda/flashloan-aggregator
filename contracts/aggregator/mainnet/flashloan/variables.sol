//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { 
    IndexInterface,
    ListInterface,
    TokenInterface,
    IAaveLending,
    IERC3156FlashLender, 
    Comptroller,
    IBalancerLending
} from "./interfaces.sol";

contract Variables {

    // IndexInterface public constant instaIndex = IndexInterface(address(0)); // TODO: update at the time of deployment
    // ListInterface public immutable instaList = ListInterface(address(0)); // TODO: update at the time of deployment

    // address public immutable wchainToken = address(0); // TODO: update at the time of deployment
    address public constant chainToken = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    
    // TokenInterface public wchainContract = TokenInterface(wchainToken);

    address public constant aaveLendingAddr = 0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9;
    IAaveLending public constant aaveLending = IAaveLending(aaveLendingAddr);

    address public constant makerLendingAddr = 0x1EB4CF3A948E7D72A198fe073cCb8C7a948cD853;
    IERC3156FlashLender public constant makerLending = IERC3156FlashLender(makerLendingAddr);

    address public constant balancerLendingAddr = 0xBA12222222228d8Ba445958a75a0704d566BF2C8;
    IBalancerLending public constant balancerLending = IBalancerLending(balancerLendingAddr);

    address public constant daiToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant cDaiToken = 0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643;
    uint256 public constant daiBorrowAmount = 500000000000000000000000000;

    address public constant wEthToken = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant cEthToken = 0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5;
    uint256 public constant wethBorrowAmountPercentage = 80;

    address public constant comptrollerAddr = 0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B;
    Comptroller public constant troller = Comptroller(comptrollerAddr);

    mapping(address => address) public tokenToCToken;

    uint256 public constant InstaFeeBPS = 5; // in BPS; 1 BPS = 0.01%

}