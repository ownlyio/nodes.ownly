import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

function Home({connectWallet, address}) {
    const [showModalBlockedCountries, setShowModalBlockedCountries] = useState(false)

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
                                    <div className="col-md-10">
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
                                                            <input className="form-check-input tw-mt-[0px]"
                                                                   type="checkbox" value="" id="agreement" required/>
                                                            <label className="form-check-label neo-ultlight"
                                                                   htmlFor="agreement">I agree with the <span
                                                                className="neo-bold">OWNCHAIN Node Agreement</span>.</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input tw-mt-[0px]"
                                                                   type="checkbox" value="" id="nontransferable"
                                                                   required/>
                                                            <label className="form-check-label neo-ultlight"
                                                                   htmlFor="nontransferable">I understand OWNCHAIN Node
                                                                Keys are not <span
                                                                    className="neo-bold">transferable</span>.</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input tw-mt-[0px]"
                                                                   type="checkbox" value="" id="kyc" required/>
                                                            <label className="form-check-label neo-ultlight"
                                                                   htmlFor="kyc">I understand that I cannot claim
                                                                rewards until I pass KYC.<br/></label>
                                                        </div>

                                                        <div className="mt-3 neo-bold">
                                                            <span className="cursor-pointer"
                                                                  onClick={() => setShowModalBlockedCountries(true)}>
                                                                (SEE BLOCKED COUNTRIES)
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100">
                                                    <p className="">Connect Wallet and Mint</p>
                                                </li>
                                            </ol>

                                            <div className="text-center text-md-start mb-3 ">
                                                <button type="submit"
                                                        className="btn btn-custom-1 font-size-sm-120 tw-rounded-[15px] neo-regular tw-w-[100%] md:tw-w-[initial] px-5 py-3">Connect
                                                    Wallet and Sign In
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={showModalBlockedCountries} onHide={setShowModalBlockedCountries} size="lg" centered>
                    <div className="modal-body p-4 pt-5 p-sm-5 bg-color-1 text-white">
                        <p className="font-size-110 font-weight-500">The following countries will not be allowed to pass KYC in
                            accordance with local
                            regulations:</p>

                        <div className="d-block d-sm-none">
                            <div className="row mx-1">
                                <div className="col-12">
                                    <ul className="ps-0 mb-0">
                                        <li className="mx-2 text-[#A19F9F]">United
                                            States - United States
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Afghanistan
                                            - افغانستان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Belarus -
                                            Беларусь
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Bosnia and
                                            Herzegovina - Босна и Херцеговина
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Burundi -
                                            Uburundi
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Central
                                            African Republic - République centrafricaine
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Congo (DRC)
                                            - Jamhuri ya Kidemokrasia ya Kongo
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Cuba - Cuba
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Ethiopia -
                                            Ethiopia
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Guinea -
                                            Guinée
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Guinea-Bissau
                                            - Guiné Bissau
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Haiti -
                                            Haiti
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Iran -
                                            ایران‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Iraq -
                                            العراق‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Kosovo -
                                            Kosovo
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Lebanon -
                                            لبنان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Libya -
                                            ليبيا‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Mali - Mali
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Moldova -
                                            Republica Moldova
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Montenegro -
                                            Crna Gora
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Myanmar -
                                            Burma
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">North Korea
                                            - 조선 민주주의 인민 공화국
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Russia -
                                            Россия
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Serbia -
                                            Србија
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Somalia -
                                            Soomaaliya
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">South Sudan
                                            - جنوب السودان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Sudan -
                                            السودان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Syria -
                                            سوريا‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Tunisia -
                                            تونس‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Venezuela -
                                            Venezuela
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Yemen -
                                            اليمن‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Zimbabwe -
                                            Zimbabwe
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Nicaragua -
                                            Nicaragua
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="d-none d-sm-block d-lg-none">
                            <div className="row mx-1">
                                <div className="col-6 col-lg-4">
                                    <ul className="ps-0 mb-0">
                                        <li className="mx-2 text-[#A19F9F]">United
                                            States - United States
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Afghanistan
                                            - افغانستان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Belarus -
                                            Беларусь
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Bosnia and
                                            Herzegovina - Босна и Херцеговина
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Burundi -
                                            Uburundi
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Central
                                            African Republic - République centrafricaine
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Congo (DRC)
                                            - Jamhuri ya Kidemokrasia ya Kongo
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Cuba - Cuba
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Ethiopia -
                                            Ethiopia
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Guinea -
                                            Guinée
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Guinea-Bissau
                                            - Guiné Bissau
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Haiti -
                                            Haiti
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Iran -
                                            ایران‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Iraq -
                                            العراق‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Kosovo -
                                            Kosovo
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-6 col-lg-4">
                                    <ul className="ps-0 mb-0">

                                        <li className="mx-2 text-[#A19F9F]">Lebanon -
                                            لبنان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Libya -
                                            ليبيا‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Mali - Mali
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Moldova -
                                            Republica Moldova
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Montenegro -
                                            Crna Gora
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Myanmar -
                                            Burma
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">North Korea
                                            - 조선 민주주의 인민 공화국
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Russia -
                                            Россия
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Serbia -
                                            Србија
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Somalia -
                                            Soomaaliya
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">South Sudan
                                            - جنوب السودان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Sudan -
                                            السودان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Syria -
                                            سوريا‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Tunisia -
                                            تونس‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Venezuela -
                                            Venezuela
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Yemen -
                                            اليمن‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Zimbabwe -
                                            Zimbabwe
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Nicaragua -
                                            Nicaragua
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="d-none d-lg-block">
                            <div className="row mx-1">
                                <div className="col-6 col-lg-4">
                                    <ul className="ps-0 mb-0">
                                        <li className="mx-2 text-[#A19F9F]">United
                                            States - United States
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Afghanistan
                                            - افغانستان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Belarus -
                                            Беларусь
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Bosnia and
                                            Herzegovina - Босна и Херцеговина
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Burundi -
                                            Uburundi
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Central
                                            African Republic - République centrafricaine
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Congo (DRC)
                                            - Jamhuri ya Kidemokrasia ya Kongo
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Cuba - Cuba
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Ethiopia -
                                            Ethiopia
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Guinea -
                                            Guinée
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-6 col-lg-4">
                                    <ul className="ps-0 mb-0">
                                        <li className="mx-2 text-[#A19F9F]">Guinea-Bissau
                                            - Guiné Bissau
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Haiti -
                                            Haiti
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Iran -
                                            ایران‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Iraq -
                                            العراق‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Kosovo -
                                            Kosovo
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Lebanon -
                                            لبنان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Libya -
                                            ليبيا‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Mali - Mali
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Moldova -
                                            Republica Moldova
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Montenegro -
                                            Crna Gora
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Myanmar -
                                            Burma
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-6 col-lg-4">
                                    <ul className="ps-0 mb-0">
                                        <li className="mx-2 text-[#A19F9F]">North Korea
                                            - 조선 민주주의 인민 공화국
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Russia -
                                            Россия
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Serbia -
                                            Србија
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Somalia -
                                            Soomaaliya
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">South Sudan
                                            - جنوب السودان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Sudan -
                                            السودان‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Syria -
                                            سوريا‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Tunisia -
                                            تونس‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Venezuela -
                                            Venezuela
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Yemen -
                                            اليمن‎
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Zimbabwe -
                                            Zimbabwe
                                        </li>
                                        <li className="mx-2 text-[#A19F9F]">Nicaragua -
                                            Nicaragua
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer justify-content-center bg-color-1 text-white py-4">
                        <div className="d-flex">
                            <button className="btn btn-custom-1 px-5 py-2 font-size-100"
                                    onClick={() => setShowModalBlockedCountries(false)}>Close
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Home