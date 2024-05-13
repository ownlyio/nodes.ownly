import './App.css';
import './css/tailwind.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home'
import MintNodeKeyNFT from "./components/MintNodeKeyNFT/MintNodeKeyNFT";
import Footer from "./components/Footer/Footer";
import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import { ethers } from 'ethers';

function App() {
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

    let showRequestError = (error) => {
        let content = '';

        if(error.response) {
            if(error.response.data) {
                content = error.response.data.message;
            }
        }

        setInputsValues({ ...inputsValues, showModalError: true, modalErrorMessage: content });
    };

    const correctNetworkId = 56; // 56 or 97
    const [address, setAddress] = useState(null);

    let connectWallet = async function() {
        await checkNetwork();
        await connectAccount();
    };

    let connectAccount = async function() {
        try {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const accounts = await window.ethereum.request({ method: 'eth_accounts' });

                if (accounts && accounts.length > 0) {
                    setAddress(accounts[0]);
                }
            } else {
                setInputsValues({ ...inputsValues, showModalError: true, modalErrorMessage: 'MetaMask not installed.<br/> Please install MetaMask from <a href=\'https://metamask.io\' class=\'text-color-2\'>https://metamask.io</a> to proceed.' });
            }
        } catch (error) {
            showRequestError(error);
        }
    };

    const checkNetwork = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const network = await provider.getNetwork();

            if (network.chainId !== correctNetworkId) {
                await switchToCorrectNetwork(correctNetworkId);
            }
        } catch (error) {
            console.error('Error checking network:', error.message);
        }
    };

    const switchToCorrectNetwork = async (targetNetworkId) => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${targetNetworkId.toString(16)}` }], // Convert to hex
            });
        } catch (error) {
            console.error('Error switching network:', error.message);
            // Handle the error, for example, show a message to the user
        }
    };

    useEffect(() => {
        const handleAccountsChanged = (accounts) => {
            setAddress(accounts[0]);
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, [setAddress]);

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="app h-100" style={{"backgroundColor": "rgb(244, 246, 248)"}}>
                <Navbar />

                <Switch>
                    <Route exact path="/" render={
                        (props) =>
                            <Home {...props}
                                inputsValues={inputsValues}
                                setInputsValues={setInputsValues}
                                showRequestError={showRequestError}
                                connectWallet={connectWallet}
                                address={address}
                            />
                    } />

                    <Route exact path="/mint-node-key-nft" render={
                        (props) =>
                            <MintNodeKeyNFT {...props}
                                showRequestError={showRequestError}
                                address={address}
                            />
                    } />
                </Switch>

                <Footer
                    inputsValues={inputsValues}
                    setInputsValues={setInputsValues}
                    showRequestError={showRequestError}
                    handleInputChange={handleInputChange}
                />

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
            </div>
        </Router>
    );
}

export default App;
