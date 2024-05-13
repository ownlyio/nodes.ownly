import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

function Home({connectWallet, address}) {
    const handleSubmit = (e) => {
        e.preventDefault();

        connectWallet();
    };

    const history = useHistory();

    useEffect(() => {
        if (address) {
            history.push('/mint-node-key-nft');
        }
    }, [address, history]);

    return (
        <div>
            <div className="home background-image-cover tw-bg-[top_right_-36em] sm:tw-bg-[top_right_-34em] md:tw-bg-[top_right_-22em] lg:tw-bg-[top_right_-10em] xl:!tw-bg-[top_right_0]" style={{"backgroundImage":"url('/img/hero/bg-2.webp')"}}>
                {/* Hero Section */}
                <div className="container">
                    <div className="row min-vh-100 align-items-center tw-pt-[15px]">
                        <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-7 py-5">
                            <div className="py-5">
                                <h1 className="text-center text-md-start text-white font-size-190 font-size-240 font-size-sm-340 font-size-md-360 font-size-lg-380 font-size-xl-400 line-height-90 mb-4">OWNCHAIN<br/> Node Key NFT Presale</h1>

                                <div className="row justify-content-center justify-content-md-start">
                                    <div className="col-10">
                                        <form onSubmit={handleSubmit}>
                                            <div className="font-size-90 tw-border-[#6a81a2] tw-border-solid tw-border-[4px] tw-rounded-[24px] px-4 py-3 mb-4">
                                                <p className="text-white tw-leading-[18px] neo-bold mb-2">You are on the official OWNLY.io website.</p>
                                                <p className="text-white tw-leading-[18px] neo-ultlight mb-0">Purchases from OWNCHAIN will only ever occur on <span className="neo-bold">nodes.ownly.io</span>.</p>
                                                <p className="text-white tw-leading-[18px] neo-ultlight mb-0">Check that you are on <span className="neo-bold">nodes.ownly.io</span> whenever purchasing from OWNCHAIN.</p>
                                            </div>

                                            <ol className="font-size-80 mb-4">
                                                <li className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100 mb-3 pb-1">
                                                    <p className="">Agree to Terms and Conditions</p>

                                                    <div className="font-size-90">
                                                        <div className="form-check">
                                                            <input className="form-check-input tw-mt-[0px]" type="checkbox" value="" id="agreement" required />
                                                            <label className="form-check-label neo-ultlight" htmlFor="agreement">I agree with the <span className="neo-bold">OWNCHAIN Node Agreement</span>.</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input tw-mt-[0px]" type="checkbox" value="" id="nontransferable" required />
                                                            <label className="form-check-label neo-ultlight" htmlFor="nontransferable">I understand OWNCHAIN Node Keys are not <span className="neo-bold">transferable</span>.</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input tw-mt-[0px]" type="checkbox" value="" id="kyc" required />
                                                            <label className="form-check-label neo-ultlight" htmlFor="kyc">I understand that I cannot claim rewards until I pass KYC.<br/><span className="neo-bold">(SEE BLOCKED COUNTRIES)</span></label>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100">
                                                    <p className="">Connect Wallet and Mint</p>
                                                </li>
                                            </ol>

                                            <div className="text-center text-md-start mb-3 ">
                                                <button type="submit" className="btn btn-custom-1 font-size-sm-120 tw-rounded-[15px] neo-regular tw-w-[100%] md:tw-w-[initial] px-5 py-3">Connect Wallet and Sign In</button>
                                            </div>
                                        </form>
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

export default Home