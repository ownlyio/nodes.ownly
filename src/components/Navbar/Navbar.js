import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from 'axios';

// images
import ownly from '../../img/ownly.webp';

function Navbar() {
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

    return (
        <nav className={`navbar fixed-top navbar-expand-lg navbar-dark ${navbarHasBGColor || scrolled ? 'bg-color-1' : ''}`} style={{transition:'0.5s'}}>
            <div className="container">
                <a className="navbar-brand" href="/">
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
    )
}

export default Navbar