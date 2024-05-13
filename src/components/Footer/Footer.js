import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from 'axios';

// images
import ownly from '../../img/ownly.webp';

function Footer({ inputsValues, setInputsValues, showRequestError, handleInputChange }) {
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
        </div>
    )
}

export default Footer