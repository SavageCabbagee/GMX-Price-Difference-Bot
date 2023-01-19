import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Fetcher, Route, Token as JOEToken, Trade, TokenAmount, TradeType, Percent } from '@traderjoe-xyz/sdk';
const TeleBot = require("telebot");
const abiDecoder = require('abi-decoder');

const providerARB = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/arbitrum"
);
const providerAVAX = new ethers.providers.JsonRpcProvider(
  "https://api.avax.network/ext/bc/C/rpc"
);

const abiohm = [{"inputs":[{"internalType":"address","name":"_customTreasury","type":"address"},{"internalType":"address","name":"_principalToken","type":"address"},{"internalType":"address","name":"_olympusTreasury","type":"address"},{"internalType":"address","name":"_subsidyRouter","type":"address"},{"internalType":"address","name":"_initialOwner","type":"address"},{"internalType":"address","name":"_olympusDAO","type":"address"},{"internalType":"uint256[]","name":"_tierCeilings","type":"uint256[]"},{"internalType":"uint256[]","name":"_fees","type":"uint256[]"},{"internalType":"bool","name":"_feeInPayout","type":"bool"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"deposit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"expires","type":"uint256"}],"name":"BondCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"internalPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"debtRatio","type":"uint256"}],"name":"BondPriceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"remaining","type":"uint256"}],"name":"BondRedeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"initialBCV","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBCV","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"adjustment","type":"uint256"},{"indexed":false,"internalType":"bool","name":"addition","type":"bool"}],"name":"ControlVariableAdjustment","type":"event"},{"inputs":[],"name":"adjustment","outputs":[{"internalType":"bool","name":"add","type":"bool"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"buffer","type":"uint256"},{"internalType":"uint256","name":"lastBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"bondInfo","outputs":[{"internalType":"uint256","name":"payout","type":"uint256"},{"internalType":"uint256","name":"vesting","type":"uint256"},{"internalType":"uint256","name":"lastBlock","type":"uint256"},{"internalType":"uint256","name":"truePricePaid","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bondPrice","outputs":[{"internalType":"uint256","name":"price_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_olympusTreasury","type":"address"}],"name":"changeOlympusTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentOlympusFee","outputs":[{"internalType":"uint256","name":"currentFee_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"debtDecay","outputs":[{"internalType":"uint256","name":"decay_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"debtRatio","outputs":[{"internalType":"uint256","name":"debtRatio_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_maxPrice","type":"uint256"},{"internalType":"address","name":"_depositor","type":"address"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_controlVariable","type":"uint256"},{"internalType":"uint256","name":"_vestingTerm","type":"uint256"},{"internalType":"uint256","name":"_minimumPrice","type":"uint256"},{"internalType":"uint256","name":"_maxPayout","type":"uint256"},{"internalType":"uint256","name":"_maxDebt","type":"uint256"},{"internalType":"uint256","name":"_initialDebt","type":"uint256"}],"name":"initializeBond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastDecay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxPayout","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paySubsidy","outputs":[{"internalType":"uint256","name":"payoutSinceLastSubsidy_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"payoutFor","outputs":[{"internalType":"uint256","name":"_payout","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositor","type":"address"}],"name":"pendingPayoutFor","outputs":[{"internalType":"uint256","name":"pendingPayout_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositor","type":"address"}],"name":"percentVestedFor","outputs":[{"internalType":"uint256","name":"percentVested_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"policy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositor","type":"address"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_addition","type":"bool"},{"internalType":"uint256","name":"_increment","type":"uint256"},{"internalType":"uint256","name":"_target","type":"uint256"},{"internalType":"uint256","name":"_buffer","type":"uint256"}],"name":"setAdjustment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum CustomALCXBond.PARAMETER","name":"_parameter","type":"uint8"},{"internalType":"uint256","name":"_input","type":"uint256"}],"name":"setBondTerms","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"terms","outputs":[{"internalType":"uint256","name":"controlVariable","type":"uint256"},{"internalType":"uint256","name":"vestingTerm","type":"uint256"},{"internalType":"uint256","name":"minimumPrice","type":"uint256"},{"internalType":"uint256","name":"maxPayout","type":"uint256"},{"internalType":"uint256","name":"maxDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPayoutGiven","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPrincipalBonded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferManagment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"trueBondPrice","outputs":[{"internalType":"uint256","name":"price_","type":"uint256"}],"stateMutability":"view","type":"function"}];
const router_abi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WAVAX","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WAVAX","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAXSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapAVAXForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAXSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]; 
const token_abi = [{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const gmx_avax_LP = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
abiDecoder.addABI(router_abi);

const poolAddressETH_USDC = "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443";
const poolAddressGMX_ETH = "0x80A9ae39310abf666A87C743d6ebBD0E8C42158E";

const poolContractETH = new ethers.Contract(
  poolAddressETH_USDC,
  IUniswapV3PoolABI,
  providerARB
);
const poolContractGMX = new ethers.Contract(
  poolAddressGMX_ETH,
  IUniswapV3PoolABI,
  providerARB
);
const OhmProContract = new ethers.Contract(
  '0xdfb034cd2789b9f85e57d25C69E161eA0bdC8f53',
  abiohm,
  providerARB
);
const GMX_LP_AVAX = new ethers.Contract(
  '0x0c91a070f862666bbcce281346be45766d874d98',
  gmx_avax_LP,
  providerAVAX
);

const WAVAX = new JOEToken(43114, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, "WAVAX", "Wrapped AVAX");
const USDC = new JOEToken(43114, '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', 6, "USDC", "USDC");
const GMX = new JOEToken(43114, '0x62edc0692BD897D2295872a9FFCac5425011c661', 18, "GMX", "GMX");

interface Immutables {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: ethers.BigNumber;
}

interface State {
  liquidity: ethers.BigNumber;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}

async function getPoolImmutablesETH() {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
    await Promise.all([
      poolContractETH.factory(),
      poolContractETH.token0(),
      poolContractETH.token1(),
      poolContractETH.fee(),
      poolContractETH.tickSpacing(),
      poolContractETH.maxLiquidityPerTick(),
    ]);
  
  const immutables: Immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  };
  return immutables;
}

async function getPoolStateETH() {
  const [liquidity, slot] = await Promise.all([
    poolContractETH.liquidity(),
    poolContractETH.slot0(),
  ]);

  const PoolState: State = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };

  return PoolState;
}

async function getETHprice() {
  const [immutables, state] = await Promise.all([
    getPoolImmutablesETH(),
    getPoolStateETH(),
  ]);

  const TokenA = new Token(42161, immutables.token0, 18, "WETH", "Wrapped Ether");

  const TokenB = new Token(42161, immutables.token1, 6, "USDC", "USD Coin");

  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );
  const poolTokenPrice = poolExample.priceOf(TokenA).toSignificant(6)

  return (poolTokenPrice);
}

async function getPoolImmutablesGMX() {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
    await Promise.all([
      poolContractGMX.factory(),
      poolContractGMX.token0(),
      poolContractGMX.token1(),
      poolContractGMX.fee(),
      poolContractGMX.tickSpacing(),
      poolContractGMX.maxLiquidityPerTick(),
    ]);

  const immutables: Immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  };
  return immutables;
}

async function getPoolStateGMX() {
  const [liquidity, slot] = await Promise.all([
    poolContractGMX.liquidity(),
    poolContractGMX.slot0(),
  ]);

  const PoolState: State = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };

  return PoolState;
}

async function getGMXpricefromETH() {
  const [immutables, state] = await Promise.all([
    getPoolImmutablesGMX(),
    getPoolStateGMX(),
  ]);

  const TokenA = new Token(42161, immutables.token0, 18, "WETH", "Wrapped Ether");

  const TokenB = new Token(42161, immutables.token1, 18, "GMX", "GMX");

  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );
  const poolTokenPrice = poolExample.priceOf(TokenB).toSignificant(6)

  return (poolTokenPrice);
}

async function getGMXpriceArbi() {
   var eth = await getETHprice();
   var gmx = await getGMXpricefromETH();
   var gmx_usdc = (Number(eth) * Number(gmx)).toFixed(3);

   return (gmx_usdc);
};

async function getGMXpriceAvax() {
  const WAVAXUSDCPair = await Fetcher.fetchPairData(WAVAX, USDC, providerAVAX);

  const WAVAXGMXPair = await Fetcher.fetchPairData(WAVAX, GMX, providerAVAX);

  const route = new Route([WAVAXGMXPair, WAVAXUSDCPair], GMX);

  const price = route.midPrice.toSignificant(5);

  return (price);
}

async function priceDiff() {
  try {
    const GMX_Arbi = await getGMXpriceArbi();
    const GMX_Avax = await getGMXpriceAvax();
    const [min_amt, exec_price] = await trader();

    const price_diff = Number(GMX_Arbi) - Number(GMX_Avax);

    const eth_price = await getETHprice();
    const bond_price_ETH = (Number(await OhmProContract.trueBondPrice()) / 10**7).toFixed(5);
    const bond_price = (Number(await OhmProContract.trueBondPrice()) * Number(eth_price) / 10**7).toFixed(5);
    const maxpayout = (Number(await OhmProContract.maxPayout())/10**18).toFixed(5);
    const discount = (((Number(GMX_Arbi) - (Number(await OhmProContract.trueBondPrice()) * Number(eth_price) / 10**7)) / Number(GMX_Arbi)) * 100).toFixed(5);

    if (price_diff < 0) {
        const percentage = (-1 * price_diff/ Number(GMX_Avax) * 100).toFixed(3);

        return bot.sendMessage('@GMXPrice','GMX price in Arbitrum: ' + GMX_Arbi + 
        '\nGMX price in Avax: ' + GMX_Avax + 
        '\nThere is a ' + percentage + '% discount on Arbitrum' +
        '\n\nA 10k USDC to GMX swap on TraderJoe with 0.5% slippage will give you a minimum of ' + 
        min_amt + ' GMX at an execution price of ' + 
        exec_price + ' USDC' +
        '\n\nOHM PRO Bonding:' +
        '\nCurrent Bond price is ' + bond_price_ETH + ' WETH' + 
        ' or ' + bond_price + ' USDC' +
        '\nBond discount is ' + discount + '%' +
        '\nYou can bond for a max of ' + maxpayout + ' GMX'
        )
        .catch(error => console.log('Error:', error));
    } else if (price_diff > 0) {
        const percentage = (price_diff/ Number(GMX_Arbi) * 100).toFixed(3);

        return bot.sendMessage('@GMXPrice','GMX price in Arbitrum: ' + GMX_Arbi + 
        '\nGMX price in Avax: ' + GMX_Avax + 
        '\nThere is a ' + percentage + '% discount on Avax' +
        '\n\n 10k USDC to GMX swap on TraderJoe with 0.5% slippage will give you a minimum of ' + 
        min_amt + ' GMX at an execution price of ' + 
        exec_price + ' USDC' +
        '\n\nOHM PRO Bonding:' +
        '\nCurrent Bond price is ' + bond_price_ETH + ' WETH' + 
        ' or ' + bond_price + ' USDC' +
        '\nBond discount is ' + discount + '%' +
        '\nYou can bond for a max of ' + maxpayout + ' GMX'
        )
        .catch(error => console.log('Error:', error));
    } else {
        return bot.sendMessage('@GMXPrice', 'GMX price in Arbitrum: ' + GMX_Arbi + 
        '\nGMX price in Avax: ' + GMX_Avax + 
        '\nThere is no price difference' + 
        '\n\nA 10k USDC to GMX swap on TraderJoe with 0.5% slippage will give you a minimum of ' + 
        min_amt + ' GMX at an execution price of ' + 
        exec_price + ' USDC' +
        '\n\nOHM PRO Bonding:' +
        '\nCurrent Bond price is ' + bond_price_ETH + ' WETH' + 
        ' or ' + bond_price + ' USDC' +
        '\nBond discount is ' + discount + '%' +
        '\nYou can bond for a max of ' + maxpayout + ' GMX'
        )
        .catch(error => console.log('Error:', error));
    }
  }
  catch(err) {
    return;
  }

}

//Get Execution price of a 10k swap
async function trader() {
  const WAVAXUSDCPair = await Fetcher.fetchPairData(WAVAX, USDC, providerAVAX);

  const WAVAXGMXPair = await Fetcher.fetchPairData(WAVAX, GMX, providerAVAX);

  const route = new Route([WAVAXUSDCPair, WAVAXGMXPair], USDC);

  const amountIn = "10000000000"; // 10k USDC

  const trade = new Trade(
    route,
    new TokenAmount(USDC, amountIn),
    TradeType.EXACT_INPUT,
    43114
  );
  const slippageTolerance = new Percent("50", "10000");
  var min_amt = (Number((trade.minimumAmountOut(slippageTolerance).raw).toString())/10**18).toFixed(3);
  var exec_price = (1/Number(trade.executionPrice.toSignificant(6))).toFixed(3);
  return [min_amt, exec_price];
}

//Listen for swaps
async function listen() {
  var lasttxn = 0;
  GMX_LP_AVAX.on("Swap", async (amount0In, amount0Out, log) => {
    console.log('amount0In: ' + amount0In);
    console.log('amount0Out: ' + amount0Out);
    console.log('transactionHash: ' + log.transactionHash);
    var GMX_price = Number(await getGMXpriceAvax());
    var txn_avax = await providerAVAX.getTransaction((log.transactionHash).toString());
    if (lasttxn == log.transactionHash) {
      return;
    }
    lasttxn = log.transactionHash;
    var decodedLogs = abiDecoder.decodeMethod(txn_avax.data);
    var URL_txn = 'https://snowtrace.io/tx/' + ((log.transactionHash).toString());
    if (txn_avax.to == '0x60aE616a2155Ee3d9A68541Ba4544862310933d4') {
      if (amount0In == 0) {  //swapping for GMX
        if (decodedLogs.name == 'swapAVAXForExactTokens' || 
            decodedLogs.name == 'swapExactAVAXForTokens' || 
            decodedLogs.name == 'swapExactAVAXForTokensSupportingFeeOnTransferTokens') {
          var USD_value = (Number(amount0Out)/ (10**18) * GMX_price).toFixed(3);
          if (Number(USD_value) > 8888) {
            var token1 = new ethers.Contract(decodedLogs.params[1].value[0], token_abi, providerAVAX);
            var token_symbol = await token1.symbol();
            return bot.sendMessage('@GMXPrice',`${USD_value} USD of ${token_symbol} is swapped for GMX\n${URL_txn}`);
          }
        } else {
          var USD_value = (Number(amount0Out)/ (10**18) * GMX_price).toFixed(3);
          if (Number(USD_value) > 8888) {
            var token1 = new ethers.Contract(decodedLogs.params[2].value[0], token_abi, providerAVAX);
            var token_symbol = await token1.symbol();
            return bot.sendMessage('@GMXPrice',`${USD_value} USD of ${token_symbol} is swapped for GMX\n${URL_txn}`);
          }
        }
      } else {
        if (decodedLogs.name == 'swapAVAXForExactTokens' || 
            decodedLogs.name == 'swapExactAVAXForTokens' || 
            decodedLogs.name == 'swapExactAVAXForTokensSupportingFeeOnTransferTokens') {
        var USD_value = (Number(amount0In)/ (10**18) * GMX_price).toFixed(3);
          if (Number(USD_value) > 8888) {
            var token1 = new ethers.Contract(decodedLogs.params[1].value[(decodedLogs.params[2].value).length - 1], token_abi, providerAVAX);
            var token_symbol = await token1.symbol();
            return bot.sendMessage('@GMXPrice', `${USD_value} USD of GMX is swapped for ${token_symbol}\n${URL_txn}`);;
          }
        } else {
        var USD_value = (Number(amount0In)/ (10**18) * GMX_price).toFixed(3);
          if (Number(USD_value) > 8888) {
            var token1 = new ethers.Contract(decodedLogs.params[2].value[(decodedLogs.params[2].value).length - 1], token_abi, providerAVAX);
            var token_symbol = await token1.symbol();
            return bot.sendMessage('@GMXPrice', `${USD_value} USD of GMX is swapped for ${token_symbol}\n${URL_txn}`);
          }
        }
      }
    }
  });
}

const bot = new TeleBot(<BOT_TOKEN>);

bot.on('/start', (msg) => {
  priceDiff();
  const timer = setInterval(() => {
    priceDiff()
  }, 180000); 
  listen();
});

bot.start();
