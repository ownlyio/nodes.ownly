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
import BigNumber from 'bignumber.js';
import axios from 'axios';

function App() {
    const ONE_ETHER = new BigNumber(10 ** 18);

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
        else {
            content = error.info.error.message
        }

        setInputsValues({ ...inputsValues, showModalError: true, modalErrorMessage: content });
    };

    const correctNetworkId = parseInt("42161"); // 56 or 97
    const [address, setAddress] = useState(null);
    const [nodeKeyBalance, setNodeKeyBalance] = useState(0);
    const [mintLoadingMessage, setMintLoadingMessage] = useState('');
    const [preSaleTxnHash, setPreSaleTxnHash] = useState('');
    const [testnetNodeKeyTxnHash, setTestnetNodeKeyTxnHash] = useState('');

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
                    checkPurchaseBalance(accounts[0]);
                }
            } else {
                setInputsValues({ ...inputsValues, showModalError: true, modalErrorMessage: 'MetaMask not installed.<br/> Please install MetaMask from <a href=\'https://metamask.io\' class=\'text-color-2\'>https://metamask.io</a> to proceed.' });
            }
        } catch (error) {
            showRequestError(error);
        }
    };

    const checkPurchaseBalance = async (address, refreshTxnHash = true) => {
        const abi = [{
            "inputs":[
                {
                    "internalType":"address",
                    "name":"buyer",
                    "type":"address"
                }
            ],
            "name":"getPurchasedKeys",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        }];

        const provider = new ethers.BrowserProvider(window.ethereum)
        const contract = new ethers.Contract("0xfa42c0ebd3a3112260dfc5d925065c0454b08f77", abi, provider);

        const data = await contract.getPurchasedKeys(address);
        setNodeKeyBalance(parseInt(data.toString()));
        if (refreshTxnHash){
            setPreSaleTxnHash('');
            setTestnetNodeKeyTxnHash('');
        }
    };

    const checkVoucherCode = async (voucher) => {
        const abi = [{
            "inputs":[
                {
                    "internalType":"string",
                    "name":"voucher",
                    "type":"string"
                }
            ],
            "name":"getVoucher",
            "outputs":[
                {
                    "internalType":"bool",
                    "name":"isActive",
                    "type":"bool"
                },
                {
                    "internalType":"uint256",
                    "name":"discount",
                    "type":"uint256"
                },
                {
                    "internalType":"bool",
                    "name":"isVoucherFromInfluencer",
                    "type":"bool"
                },
                {
                    "internalType":"address",
                    "name":"influencerReceiverWallet",
                    "type":"address"
                },
                {
                    "internalType":"uint256",
                    "name":"influencerPercentage",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        }];

        const provider = new ethers.BrowserProvider(window.ethereum)
        const contract = new ethers.Contract("0xfa42c0ebd3a3112260dfc5d925065c0454b08f77", abi, provider);

        const data = await contract.getVoucher(voucher);

        return data;
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

    const sendMintTransaction = async (price, amount, discount, voucherCode = '') => {
        setMintLoadingMessage('Approve transaction from your wallet...');

        let abi
        if (voucherCode == '') {
            abi = [{
                "inputs":[
                    {
                        "internalType":"uint256",
                        "name":"amount",
                        "type":"uint256"
                    }
                ],
                "name":"buyNodeKey",
                "outputs":[
                    
                ],
                "stateMutability":"payable",
                "type":"function"
            }];
        }
        else {
            abi = [{
                "inputs":[
                    {
                        "internalType":"uint256",
                        "name":"amount",
                        "type":"uint256"
                    },
                    {
                        "internalType":"string",
                        "name":"voucher",
                        "type":"string"
                    }
                ],
                "name":"buyNodeKey",
                "outputs":[
                    
                ],
                "stateMutability":"payable",
                "type":"function"
            }]
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            const contract = new ethers.Contract("0xfa42c0ebd3a3112260dfc5d925065c0454b08f77", abi, signer );
            
            let value = new BigNumber(price).multipliedBy(ONE_ETHER).multipliedBy(amount);
            let tx;

            if (voucherCode == '') {
                tx = await contract.buyNodeKey(amount.toString(), { value: value.toString() });
            }
            else {
                value = value.minus(value.multipliedBy(discount));
                tx = await contract.buyNodeKey(amount.toString(), voucherCode, { value: value.toString() });
            }
            
            setMintLoadingMessage('Purchasing key...');
            await tx.wait();
            setPreSaleTxnHash(tx.hash);
            
            setMintLoadingMessage('Minting NodeKey on testnet...');
            
            // call POST api town-faucet-backend.vercel.app with x-api-key header
            let apiData
            apiData = await axios.post("https://town-faucet-backend.vercel.app/api/mint-testnet/" + address, {}, {
                headers: {
                  'x-api-key': "dfebkoxddwbw"
                }
            });

            setInputsValues({ ...inputsValues, showModalSuccess: true, modalSuccessMessage: 'Purchase of presale key and mint of testnet key successfully! Please take note of your transaction receipt after closing this message'});
            setTestnetNodeKeyTxnHash(apiData.data.txnHash);
            setMintLoadingMessage('');
            checkPurchaseBalance(address, false);
        } catch (error) {
            setMintLoadingMessage('');
            showRequestError(error);
        }
    };

    useEffect(() => {
        const handleAccountsChanged = (accounts) => {
            setAddress(accounts[0]);
            checkPurchaseBalance(accounts[0]);
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
                                nodeKeyBalance={nodeKeyBalance}
                                mintLoadingMessage={mintLoadingMessage}
                                preSaleTxnHash={preSaleTxnHash}
                                testnetNodeKeyTxnHash={testnetNodeKeyTxnHash}
                                sendMintTransaction={sendMintTransaction}
                                checkVoucherCode={checkVoucherCode}
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
