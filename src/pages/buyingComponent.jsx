import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; 
import { useNavigate, Link } from 'react-router-dom';

import Contract from '../components/Contract.json';
import TokenSale from '../components/TokenSale.json';
import TransactionTable from './transactionComponent';

export function SignInThree() {
  const navigate = useNavigate(); 
  const [dsCoinQuantity, setDsCoinQuantity] = useState('');
  const [ethToPay, setEthToPay] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [tokenSaleContract, setTokenSaleContract] = useState(null);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [transactionDetails, setTransactionDetails] = useState({});
  const [showProcessingPopup, setShowProcessingPopup] = useState(false);

    const handleGoToTransactions = () => {
    navigate('/transactionToken');
  };


  useEffect(() => {
    if (window.ethereum && !web3) {
      setWeb3(new Web3(window.ethereum));
    }
  }, [web3]);

  useEffect(() => {
    if (web3 && dsCoinQuantity) {
      const contract = new web3.eth.Contract(TokenSale.abi, '0x26ab13AC34D5E04E647107302054bcf8276bEeD6');
      setTokenSaleContract(contract);
    }
  }, [web3, dsCoinQuantity]);

  const handleDsCoinChange = (event) => {
    const value = event.target.value;
    setDsCoinQuantity(value);
    setEthToPay(value * 0.0005);
  };

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error("User denied account access", error);
    }
  };

  const handleBuyNow = async () => {
    if (!tokenSaleContract || !web3) return;

    try {
      setShowProcessingPopup(true);
      const accounts = await web3.eth.getAccounts();
      const numberOfTokens = web3.utils.toWei(dsCoinQuantity.toString(), 'ether'); 
      const tx = await tokenSaleContract.methods.buy(accounts[0]).send({ from: accounts[0], value: web3.utils.toWei(ethToPay.toString(), 'ether') });
      console.log(tx);
      alert('Transaction successful!');

     navigate('/transactionToken', { state: { transactionDetails: {
        from: accounts[0],
        to: tokenSaleContract.options.address,
        transactionHash: tx.transactionHash,
        amount: `${ethToPay} ETH`
      } }});
      
      setTransactionDetails({
        from: accounts[0],
        to: tokenSaleContract.options.address,
        transactionHash: tx.transactionHash,
        amount: `${ethToPay} ETH`
        
      });
  
      setTransactionSuccess(true);
      setDsCoinQuantity('');
      setEthToPay(0);
    } catch (error) {
      console.error(error);
      alert('Transaction failed!');
      setDsCoinQuantity('');
      setEthToPay(0);
    } finally {
      setShowProcessingPopup(false); 
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            BUY OUR DSC TOKEN 
          </h2><br/>
          <div className="space-y-5">
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                {' '}
                DS COIN{' '}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Quantity" type="number" value={dsCoinQuantity} onChange={handleDsCoinChange}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  ETH You Have To Pay:
                </label>
                <p className="text-sm font-bold text-black ">
                  1 DSC at just 0.0005 ether
                </p>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Price in ETH" type="number" value={ethToPay} readOnly
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={web3 ? handleBuyNow : handleConnectWallet}
                disabled={transactionSuccess || loading} 
                className={`inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 ${
                  web3 ? '' : 'cursor-pointer'
                }`}
              >
                {loading ? ( 
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : web3 ? (
                  <>
                    BUY NOW 
                  </>
                ) : (
                  'Connect to Wallet'
                )}
              </button>
              <button
                type="button"
                onClick={handleGoToTransactions}
                className=" mt-4 relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                Go To Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
      {showProcessingPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="h-8 w-8 border-t-2 border-b-2 border-black rounded-full animate-spin mb-4"></div>
            <p className="text-center">Processing The Transaction</p>
          </div>
        </div>
      </div>
      
      )}
      {transactionSuccess && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold">Transaction Details</h3>
          <ul className="list-disc list-inside mt-2">
            <li>From: {transactionDetails.from}</li>
            <li>To: {transactionDetails.to}</li>
            <li>Transaction Hash: {transactionDetails.transactionHash}</li>
            <li>Amount: {transactionDetails.amount} ETH</li>
          </ul>
        </div>
      )}
      
    </section>
  );
}

export default SignInThree;
