import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from 'axios';

// images
import ownly from '../../img/ownly.webp';

function Home(props) {
    const [inputsValues, setInputsValues] = useState({
        email: '',
        showModalSuccess: false,
        showModalError: false,
        modalSuccessMessage: '',
        modalErrorMessage: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputsValues({ ...inputsValues, [name]: value });
    }

    const [navbarHasBGColor, setNavbarHasBGColor] = useState(false)
    const toggleNavbarDropdown = () => {
        if(document.querySelectorAll(".navbar-toggler")[0].classList.contains("collapsed")) {
            setNavbarHasBGColor(false)
        } else {
            setNavbarHasBGColor(true)
        }
    }

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY || window.pageYOffset;
            setScrolled(currentPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let showRequestError = (error) => {
        let content = '';

        if(error.response) {
            if(error.response.data) {
                content = error.response.data.message;
            }
        }

        setInputsValues({ ...inputsValues, showModalError: true, modalErrorMessage: content });
    };

    let subscribe = (event) => {
        let button = event.target;
        button.disabled = true;

        let url = "https://ownly.world/api/email-subscriptions";
        let data = {
            email: inputsValues.email,
        };

        axios.post(url, data)
            .then((response) => {
                setInputsValues({ ...inputsValues, email: '', showModalSuccess: true, modalSuccessMessage: 'Thank you for subscribing to our newsletter; we\'re excited to share our latest updates and stories with you!' });
            })
            .catch(error => {
                console.log(error)
                showRequestError(error);
            })
            .then((response) => {
                button.disabled = false;
            });
    };

    return (
        <div>
            <div className="home background-image-cover tw-bg-[top_right_-36em] sm:tw-bg-[top_right_-34em] md:tw-bg-[top_right_-22em] lg:tw-bg-[top_right_-10em] xl:!tw-bg-[top_right_0]" style={{"backgroundImage":"url('/img/hero/bg-2.webp')"}}>
                <nav className={`navbar fixed-top navbar-expand-lg navbar-dark ${navbarHasBGColor || scrolled ? 'bg-color-1' : ''}`} style={{transition:'0.5s'}}>
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <img src={ownly} className="d-inline-block align-text-top tw-h-[44px]" alt="Ownly" />
                        </a>

                        <button className="navbar-toggler" onClick={toggleNavbarDropdown} type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 font-size-110 align-items-center">
                                <li className="nav-item px-2">
                                    <a className="nav-link neo-ultlight font-size-130 text-white" href="https://t.me/ownlyio" target="_blank" rel="noreferrer">
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </a>
                                </li>
                                <li className="nav-item px-2">
                                    <a className="nav-link neo-ultlight font-size-130 text-white" href="https://twitter.com/ownlyio" target="_blank" rel="noreferrer">
                                        <i className="fa-brands fa-x-twitter"></i>
                                    </a>
                                </li>
                                <li className="nav-item px-2 dropdown">
                                    <a className="nav-link dropdown-toggle neo-ultlight text-white text-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Get involved
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">
                                                <div>Run a node</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">
                                                <div>Build with us</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://t.me/ownlyio" target="_blank" rel="noreferrer">
                                                <div className="pe-3">Join community</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item ps-2 dropdown">
                                    <a className="nav-link dropdown-toggle neo-ultlight text-white text-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Learn
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://twitter.com/ownlyio/status/1774617875975979388" target="_blank" rel="noreferrer">
                                                <div className="pe-3">Node key NFT presale</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly/ownchain/intro" target="_blank" rel="noreferrer">
                                                <div className="pe-3">About Ownchain</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">
                                                <div className="pe-3">About Ownly</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly/all-about-ownly/ecosystem" target="_blank" rel="noreferrer">
                                                <div className="pe-3">Ownly Ecosystem</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="container">
                    <div className="row min-vh-100 align-items-center tw-pt-[15px]">
                        <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-7 py-5">
                            <div className="py-5">
                                <h1 className="text-center text-md-start text-white font-size-190 font-size-240 font-size-sm-340 font-size-md-360 font-size-lg-380 font-size-xl-400 line-height-90 mb-4">OWNCHAIN<br/> Node Key NFT Presale</h1>

                                <div className="row justify-content-center justify-content-md-start">
                                    <div className="col-10">
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
                                                        <input className="form-check-input tw-mt-[0px]" type="checkbox" value="" id="agreement" />
                                                        <label className="form-check-label neo-ultlight" htmlFor="agreement">I agree with the <span className="neo-bold">OWNCHAIN Node Agreement</span>.</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input tw-mt-[0px]" type="checkbox" value="" id="nontransferable" />
                                                        <label className="form-check-label neo-ultlight" htmlFor="nontransferable">I understand OWNCHAIN Node Keys are not <span className="neo-bold">transferable</span>.</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input tw-mt-[0px]" type="checkbox" value="" id="kyc" />
                                                        <label className="form-check-label neo-ultlight" htmlFor="kyc">I understand that I cannot claim rewards until I pass KYC.<br/><span className="neo-bold">(SEE BLOCKED COUNTRIES)</span></label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="font-size-130 font-size-sm-140 font-size-lg-170 text-white line-height-100">
                                                <p className="">Connect Wallet and Mint</p>
                                            </li>
                                        </ol>

                                        <div className="text-center text-md-start mb-3 ">
                                            <a href="javascript:void(0);" className="btn btn-custom-1 font-size-sm-120 tw-rounded-[15px] neo-regular tw-w-[100%] md:tw-w-[initial] px-5 py-3">Connect Wallet and Sign In</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-color-1 py-5">
                <div className="container py-3">
                    <div className="row justify-content-center align-items-center mb-4">
                        <div className="col-7 col-sm-5 col-md-3 mb-5 mb-md-0">
                            <div className="d-flex justify-content-center">
                                <div className="mb-4 mb-lg-5 text-center">
                                    <a href="#" className="text-decoration-none">
                                        <img src={ownly} className="tw-w-[100%] lg:tw-w-[80%] xl:tw-w-[70%]" alt="Ownly" />
                                    </a>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center flex-wrap font-size-130 font-size-md-110 font-size-lg-140">
                                <div className="px-3">
                                    <a href="https://t.me/ownlyio" target="_blank" rel="noreferrer"
                                       className="text-white text-decoration-none">
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </a>
                                </div>

                                <div className="px-3">
                                    <a href="https://twitter.com/ownlyio" target="_blank" rel="noreferrer" className="text-white text-decoration-none">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                </div>

                                <div className="px-3">
                                    <a href="https://twitter.com/ownlyio" target="_blank" rel="noreferrer"
                                       className="text-white text-decoration-none">
                                        <i className="fa-brands fa-x-twitter"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 px-lg-5">
                            <div className="text-white font-size-110 font-size-lg-120 text-center mb-5 mb-md-0">
                                <div className="mb-4">
                                    <a href="mailto:support@ownly.io" target="_blank" rel="noreferrer" className="d-flex justify-content-center justify-content-md-start text-decoration-none text-white mb-4">
                                        <div className="tw-min-w-[23px] text-center">
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <div className="ps-4">
                                            support@ownly.io
                                        </div>
                                    </a>
                                </div>

                                <div className="">
                                    <div className="d-flex mb-2">
                                        <div className="flex-fill">
                                            <input className="form-control px-3 py-md-3 tw-h-[60px]" name="email" value={ inputsValues.email } onChange={handleInputChange} placeholder="Enter your email address" style={{borderRadius:'.25rem 0px 0px .25rem'}} />
                                        </div>
                                        <div>
                                            <button className="btn btn-custom-1 px-3 py-md-3 tw-h-[60px]" onClick={subscribe} style={{borderRadius:'0px .25rem .25rem 0px'}}>Subscribe</button>
                                        </div>
                                    </div>
                                    <p className="text-white text-center text-md-start font-size-80">By joining our Ownly VIP list, you agree to receive news and updates from Ownly via our monthly newsletter.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="d-flex justify-content-center">
                                <div className="">
                                    <div className="d-flex flex-column justify-content-center align-items-center align-items-md-start flex-wrap font-size-110 font-size-lg-120 mb-4 mb-lg-0">
                                        <div className="px-2 mb-2">
                                            <a className="text-decoration-none text-white" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">Run a Node</a>
                                        </div>

                                        <div className="px-2 mb-2">
                                            <a className="text-decoration-none text-white" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">Build With Us</a>
                                        </div>

                                        <div className="px-2 mb-2">
                                            <a className="text-decoration-none text-white" href="https://t.me/ownlyio" target="_blank" rel="noreferrer">Join Community</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-white font-size-110 font-size-lg-120">
                            © 2024 Ownly.<br className="d-block d-lg-none" /> All rights reserved
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={ inputsValues.showModalError } onHide={handleInputChange} className="" centered>
                <div className="modal-body p-4 py-5 p-sm-5">
                    <div className="text-center">
                        <i className="fas fa-times-circle font-size-400 text-color-1 mb-3"></i>
                        <p className="mb-0 font-size-110 mb-4 pb-2">{ inputsValues.modalErrorMessage }</p>

                        <button className="btn btn-custom-1 px-5 py-2 font-size-110 mx-1" onClick={ () => setInputsValues({ ...inputsValues, showModalError: false }) }>Close</button>
                    </div>
                </div>
            </Modal>

            <Modal show={ inputsValues.showModalSuccess } onHide={handleInputChange} className="" centered>
                <div className="modal-body p-4 py-5 p-sm-5 border-0">
                    <div className="text-center">
                        <i className="fas fa-check-circle font-size-400 text-color-1 mb-3"></i>
                        <p className="mb-0 font-size-110 mb-4 pb-2">{ inputsValues.modalSuccessMessage }</p>

                        <button className="btn btn-custom-1 px-5 py-2 font-size-110 mx-1" onClick={ () => setInputsValues({ ...inputsValues, showModalSuccess: false }) }>Okay</button>
                    </div>
                </div>
            </Modal>

            {/*<div className="pe-md-5">*/}
            {/*    <div className="d-flex mb-2">*/}
            {/*        <div className="flex-fill">*/}
            {/*            <input className="form-control font-size-90 font-size-sm-120 px-4 py-md-3" name="emailAddress" placeholder="Enter Your Email Address Here" value={ inputsValues.emailAddress } onChange={handleInputChange} style={{"borderRadius":"15px 0 0 15px"}} />*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <button className="btn btn-custom-1 font-size-90 font-size-sm-120 px-4 py-md-3" onClick={subscribe} style={{"borderRadius":"0 15px 15px 0"}}>SUBSCRIBE <span className="d-none d-sm-inline-block">NOW</span></button>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <p className="text-white line-height-110 font-size-90 font-size-xl-100">By joining our Ownly VIP list, you agree to receive news and updates from Ownly via our monthly newsletter. You can opt out of our marketing emails anytime..</p>*/}
            {/*</div>*/}

            {/*<div className="row align-items-end py-5">*/}
            {/*    <div className="col-6 col-md-5 col-lg-3">*/}
            {/*        <p className="text-white font-size-130 mb-0">#OwnlyGaming</p>*/}
            {/*    </div>*/}

            {/*    <div className="col-6">*/}
            {/*        <p className="text-white font-size-100 mb-1">Connect with us:</p>*/}

            {/*        <div className="d-flex">*/}
            {/*            <div className="me-4">*/}
            {/*                <a href="https://facebook.com/ownly.io" target="_blank" rel="noreferrer" className="text-decoration-none">*/}
            {/*                    <i className="fa-brands fa-facebook-f text-white font-size-130"></i>*/}
            {/*                </a>*/}
            {/*            </div>*/}

            {/*            <div className="me-4">*/}
            {/*                <a href="https://twitter.com/ownlyio" target="_blank" rel="noreferrer" className="text-decoration-none">*/}
            {/*                    <i className="fa-brands fa-twitter text-white font-size-130"></i>*/}
            {/*                </a>*/}
            {/*            </div>*/}

            {/*            <div className="me-4">*/}
            {/*                <a href="https://www.instagram.com/ownly.io" target="_blank" rel="noreferrer" className="text-decoration-none">*/}
            {/*                    <i className="fa-brands fa-instagram text-white font-size-130"></i>*/}
            {/*                </a>*/}
            {/*            </div>*/}

            {/*            <div className="me-4">*/}
            {/*                <a href="https://www.linkedin.com/company/ownlyio" target="_blank" rel="noreferrer" className="text-decoration-none">*/}
            {/*                    <i className="fa-brands fa-linkedin-in text-white font-size-130"></i>*/}
            {/*                </a>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default Home