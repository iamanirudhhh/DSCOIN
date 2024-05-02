import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Web3 from 'web3'; // Make sure to install web3 via npm

// Import your ABI files
import Contract from './Contract.json';
import TokenSale from './TokenSale.json';

export function SignInThree() {
  const [dsCoinQuantity, setDsCoinQuantity] = useState('');
  const [ethToPay, setEthToPay] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [tokenSaleContract, setTokenSaleContract] = useState(null);

  useEffect(() => {
    // Initialize web3 and set the provider
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
      window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }, []);

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

  const handleBuyNow = async () => {
    if (!tokenSaleContract ||!web3) return;

    try {
      const accounts = await web3.eth.getAccounts();
      const numberOfTokens = web3.utils.toWei(dsCoinQuantity.toString(), 'ether'); // Convert to Wei
      const tx = await tokenSaleContract.methods.buy(accounts[0]).send({ from: accounts[0], value: web3.utils.toWei(ethToPay.toString(), 'ether') });
      console.log(tx);
      alert('Transaction successful!');
    } catch (error) {
      console.error(error);
      alert('Transaction failed!');
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
                  onClick={handleBuyNow}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  BUY NOW <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}

export default SignInThree;
