import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from 'axios';
import BigNumber from 'bignumber.js';
import {useHistory} from "react-router-dom";

// images

function MintNodeKeyNFT({showRequestError, address}) {
    const price = 0.05;
    const [mintQuantity, setMintQuantity] = useState(new BigNumber(1));
    const history = useHistory();

    const decrement = () => {
        if(mintQuantity > 1) {
            setMintQuantity(mintQuantity.minus(new BigNumber(1)));
        }
    }

    const increment = () => {
        setMintQuantity(mintQuantity.plus(new BigNumber(1)));
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
                                                <p className="font-size-130 neo font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">{ mintQuantity.toString() } x OWNCHAIN Node Key</p>
                                            </div>
                                            <p className="text-white tw-leading-[18px] neo-ultlight mb-0">{ price } ETH per node key</p>
                                        </div>

                                        <div>
                                            <div className="tw-text-[0.78em]">
                                                <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">{ (mintQuantity.multipliedBy(0.05)).toString() } ETH</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-100 tw-bg-[#6a81a1] tw-h-[1px] mb-3"></div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="tw-text-[0.78em]">
                                            <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">+ Add promo code</p>
                                        </div>
                                    </div>

                                    <div className="w-100 tw-bg-[#6a81a1] tw-h-[1px] mb-3"></div>

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>
                                            <div className="tw-text-[0.78em]">
                                                <p className="font-size-130 neo font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">Your Total</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="tw-text-[0.78em]">
                                                <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-0">{ (mintQuantity.multipliedBy(0.05)).toString() } ETH</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="font-size-90 tw-border-[#6a81a2] tw-border-solid tw-border-[4px] tw-rounded-[24px] px-4 py-3 mb-4">
                                        <div className="tw-text-[0.78em]">
                                            <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-break line-height-100 mb-0">Minting Address: { address }</p>
                                        </div>
                                    </div>

                                    <div className="text-center text-md-start mb-3 ">
                                        <a href="javascript:void(0);" className="btn btn-custom-1 font-size-sm-120 tw-rounded-[15px] neo-regular w-100 px-5 py-3">Mint { mintQuantity.toString() } Node Key NFT</a>
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