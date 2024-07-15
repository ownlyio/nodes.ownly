import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import axios from 'axios';
import {useHistory, useLocation} from "react-router-dom";

// images

function MintNodeKeyNFT({nodeKeyBalance, mintLoadingMessage, preSaleTxnHash, testnetNodeKeyTxnHash, sendMintTransaction, checkVoucherCode, showRequestError, address}) {
    
    // add a function that fetches the price of the node key from the contract currentTier()
    const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_ARBITRUM_RPC);
    const abi = [{
        "inputs":[
            
        ],
        "name":"currentTier",
        "outputs":[
            {
                "internalType":"uint256",
                "name":"tierLevel",
                "type":"uint256"
            },
            {
                "internalType":"uint256",
                "name":"price",
                "type":"uint256"
            },
            {
                "internalType":"uint256",
                "name":"remainingItems",
                "type":"uint256"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    }];
    const contract = new ethers.Contract(process.env.REACT_APP_PRESALE_CONTRACT, abi, provider);
    

    const [currentTier, setCurrentTier] = useState("0");
    const [currentPrice, setCurrentPrice] = useState("0");
    const [remainingKeysAtCurrentTier, setRemainingKeysAtCurrentTier] = useState("0");

    useEffect(async () => {
        const data = await contract.currentTier();
        setCurrentTier(data[0].toString());
        setCurrentPrice(data[1].toString());
        setRemainingKeysAtCurrentTier(data[2].toString());

    }, [])


    const ONE_ETHER = new BigNumber(10 ** 18);
    const price = new BigNumber(currentPrice).div(ONE_ETHER);
    const [mintQuantity, setMintQuantity] = useState(new BigNumber(1));
    const history = useHistory();
    const [showPromoField, setShowPromoField] = useState(false);
    const [isPromoFieldDisabled, setIsPromoFieldDisabled] = useState(false);
    const [showPromoFieldMessage, setShowPromoFieldMessage] = useState('');
    const [isPromoMessageError, setIsPromoMessageError] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(new BigNumber(0));

    // Get the location object from React Router
    const location = useLocation();
    
    // Create a URLSearchParams instance from the location's search string
    const queryParams = new URLSearchParams(location.search);
    
    // Get the value of the 'code' query parameter
    const code = queryParams.get('code');
    
    useEffect(async () => {
        if (code) {
            setShowPromoField(true);
            setPromoCode(code);
            enterVoucherCode({}, code);
        }
    }, [code]);

    const decrement = () => {
        if(mintQuantity > 1) {
            setMintQuantity(mintQuantity.minus(new BigNumber(1)));
        }
    }

    const increment = () => {
        if (mintQuantity < Number(remainingKeysAtCurrentTier)) setMintQuantity(mintQuantity.plus(new BigNumber(1)));
    }

    const enterVoucherCode = async (e, bypass = '') => {
        setIsPromoMessageError(false);
        setShowPromoFieldMessage("");

        if (e.key === "Enter" || bypass != '') {
            try {
                let code = (bypass != '') ? bypass : promoCode;
                let res = await checkVoucherCode(code);
                if (res[0]) {
                    setIsPromoMessageError(false);

                    let _discount = new BigNumber(res[1].toString()).dividedBy(ONE_ETHER);
                    setDiscount(_discount);
                    setShowPromoFieldMessage("ENJOY " + (_discount.toNumber() * 100) + "% OFF with this promo code");
                    setIsPromoFieldDisabled(true);
                }
                else {
                    setIsPromoMessageError(true);
                    setShowPromoFieldMessage("Promo code is invalid");
                }
            }
            catch (err) {
                setIsPromoMessageError(true);
                setShowPromoFieldMessage("Something went wrong. Please try again");
            }
        }      
    }

    useEffect(() => {
        if (!address) {
            history.push('/');
        }
    }, [address]);

    return (
        <div>
            <div className="home background-image-cover tw-bg-[top_right_-36em] sm:tw-bg-[top_right_-34em] md:tw-bg-[top_right_-22em] lg:tw-bg-[top_right_-10em] xl:!tw-bg-[top_right_0]" style={{"backgroundImage":"url('/img/hero/bg-1.webp')"}}>
                {/* Hero Section */}
                <div className="container">
                    <div className="d-flex min-vh-100 justify-content-center align-items-center tw-pt-[15px]">
                        <div className="x py-5">
                            <div className="py-5">
                                <h1 className="text-center text-md-start text-white font-size-190 font-size-240 font-size-sm-340 font-size-md-360 font-size-lg-380 font-size-xl-400 line-height-90 mb-4">OWNCHAIN<br/> Node Key NFT Presale</h1>

                                <div className="">
                                    <div className="font-size-90 tw-border-[#6a81a2] tw-border-solid tw-border-[4px] tw-rounded-[24px] px-4 py-3 mb-4">
                                        <p className="text-white tw-leading-[18px] neo-bold mb-2">You are on the official OWNLY.io website.</p>
                                        <p className="text-white tw-leading-[18px] neo-ultlight mb-0">Purchases from OWNCHAIN will only ever occur on <span className="neo-bold">nodes.ownly.io</span>.</p>
                                        <p className="text-white tw-leading-[18px] neo-ultlight mb-0">Check that you are on <span className="neo-bold">nodes.ownly.io</span> whenever purchasing from OWNCHAIN.</p>
                                    </div>

                                    <div className="d-flex flex-col flex-sm-row justify-content-between mb-3">
                                        <div>
                                            <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">OWNCHAIN Node Key</p>
                                            <p className="text-white tw-leading-[18px] neo-ultlight mb-0">Key for submitting one claim to each<br/> Ownchain network challenge.</p>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <div className="">
                                                <button className="btn btn-custom-1 tw-rounded-l-[15px] tw-rounded-r-[0] px-3" onClick={decrement}>
                                                    <i className="fa-solid fa-minus"></i>
                                                </button>
                                            </div>
                                            <div className="d-flex align-items-center tw-bg-[#6a81a1] px-4 tw-h-[39.2px]">
                                                <div className="text-white font-size-110">{ mintQuantity.toString() }</div>
                                            </div>
                                            <div className="">
                                                <button className="btn btn-custom-1 tw-rounded-l-[0] tw-rounded-r-[15px] px-3" onClick={increment}>
                                                    <i className="fa-solid fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-100 tw-bg-[#6a81a1] tw-h-[1px] mb-3"></div>

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>
                                            <div className="tw-text-[0.78em]">
                                                <p className="font-size-130 neo font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">{ mintQuantity.toString() } x OWNCHAIN Node Key (Tier {currentTier} - {remainingKeysAtCurrentTier} keys left) </p>
                                            </div>
                                            <p className="text-white tw-leading-[18px] neo-ultlight mb-0">{ price.toString() } ETH per node key</p>
                                        </div>

                                        <div>
                                            <div className="tw-text-[0.78em]">
                                                <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">{ mintQuantity.multipliedBy(price).toString() } ETH</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-100 tw-bg-[#6a81a1] tw-h-[1px] mb-3"></div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="tw-text-[0.78em]" onClick={() => setShowPromoField(!showPromoField)}>
                                            <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">
                                            {showPromoField ? "- Hide promo code" : "+ Add promo code"}
                                            </p>
                                        </div>
                                    </div>

                                    {showPromoField && (
                                        <div className="justify-content-between align-items-center mb-3">
                                            <input
                                                disabled={isPromoFieldDisabled}
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                onKeyDown={(e) => {
                                                    enterVoucherCode(e);
                                                }}
                                                type="text"
                                                className={`form-control font-size-90 w-full ${
                                                    isPromoFieldDisabled ? "bg-gray-300 text-gray-600" : ""
                                                }`}
                                                placeholder="Enter promo code"
                                            />
                                            {showPromoFieldMessage !== "" && (
                                                <p className={`${isPromoMessageError ? 'text-danger' : 'text-success' } mt-2`}>{showPromoFieldMessage}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="w-100 tw-bg-[#6a81a1] tw-h-[1px] mb-3"></div>

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>
                                            <div className="tw-text-[0.78em]">
                                                <p className="font-size-130 neo font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">Your Total</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="tw-text-[0.78em]">
                                                <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">
                                                    {
                                                        discount.gt(0) ? `${(mintQuantity.multipliedBy(price.minus(discount.multipliedBy(price)))).toString()} ETH ` : ''
                                                    }
                                                    <span style={{ textDecoration: discount.gt(0) ? 'line-through' : 'none' }}>
                                                        {(mintQuantity.multipliedBy(new BigNumber(price))).toString()} ETH
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="font-size-90 tw-border-[#6a81a2] tw-border-solid tw-border-[4px] tw-rounded-[24px] px-4 py-3 mb-4">
                                        <div className="tw-text-[0.78em]">
                                            {
                                                (testnetNodeKeyTxnHash != '' && testnetNodeKeyTxnHash != '') ?
                                                    <>
                                                        <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-break line-height-100 mb-0">Please take note of your transaction receipt before leaving the page:</p>
                                                        <br />
                                                        <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-break line-height-100 mb-0"><b>Presale purchase transaction</b>: {process.env.REACT_APP_MAIN_EXPLORER_URL}tx/{ preSaleTxnHash }</p>
                                                        <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-break line-height-100 mb-0"><b>Testnet Nodekey mint transaction</b>: {process.env.REACT_APP_ARB_SEPOLIA_EXPLORER_URL}tx/{ testnetNodeKeyTxnHash }</p>
                                                    </>
                                                :
                                                    <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-break line-height-100 mb-0">Minting Address: { address }</p>
                                            }
                                        </div>
                                    </div>

                                    <div className="text-center text-md-start mb-3 ">
                                        {
                                            (mintLoadingMessage != '') ?
                                                <a className="btn btn-custom-1 font-size-sm-120 tw-rounded-[15px] neo-regular w-100 px-5 py-3">{mintLoadingMessage}</a>
                                                :
                                            (nodeKeyBalance == 0) ? 
                                                <a onClick={() => sendMintTransaction(price.toString(), mintQuantity, discount, promoCode)} className="btn btn-custom-1 font-size-sm-120 tw-rounded-[15px] neo-regular w-100 px-5 py-3">Mint { mintQuantity.toString() } Node Key NFT</a>
                                            : 
                                                <a className="btn btn-custom-1 font-size-sm-120 tw-rounded-[15px] neo-regular w-100 px-5 py-3">You already have { nodeKeyBalance.toString() } Node Key NFT</a>
                                        }
                                    </div>

                                    <div className="tw-text-[0.8em]">
                                        <p className="text-center text-white line-height-100 mb-0">Note: You can purchase multiple nodes but in running the nodes, recommend 1 node key NFT per wallet address.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MintNodeKeyNFT