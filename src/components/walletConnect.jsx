import React, { useState } from "react";
import Contract from "./Contract.json"; // Importing contract ABI and address

function ButtonDisplay() {
    const [connectedAddress, setConnectedAddress] = useState(null);
    const [tokenImported, setTokenImported] = useState(false); // State to track if token is imported

    const connectToMetaMask = async () => {
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                // MetaMask is connected, you can perform further actions here
                console.log("MetaMask connected!");
                setConnectedAddress(accounts[0]);
            } else {
                console.log("Please connect using MetaMask");
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    };

    const disconnectFromMetaMask = () => {
        setConnectedAddress(null);
        setTokenImported(false); // Reset tokenImported state
        console.log("Disconnected from MetaMask");
    };

    const handleButtonClick = () => {
        if (connectedAddress) {
            disconnectFromMetaMask();
        } else {
            connectToMetaMask();
        }
    };

    const addTokenToMetaMask = async () => {
        try {
            if (!connectedAddress) {
                console.log("Please connect to MetaMask first.");
                return;
            }
            
            if (!window.ethereum || !window.ethereum.isMetaMask) {
                console.log("MetaMask is not installed.");
                return;
            }

            // Request to add the token to MetaMask
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: Contract.Dscaddress, // Token contract address
                        symbol: Contract.symbol, // Token symbol
                        decimals: Contract.decimals, // Token decimals
                    }
                }
            });

            console.log("Token added to MetaMask successfully.");
            setTokenImported(true); // Set tokenImported state to true
        } catch (error) {
            console.error("Error adding token to MetaMask:", error);
        }
    };

    return (
        <>  
            <div className="flex justify-end space-x-6 lg:space-x-6 mr-40">
                <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={addTokenToMetaMask} 
                    disabled={tokenImported} // Disable button if token is imported
                >
                    {tokenImported ? "Token Imported Successfully" : "Add DSC To Wallet"}
                </button>
                <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={handleButtonClick}
                >
                    {connectedAddress ? ` ${connectedAddress.substring(0, 5)}...${connectedAddress.substring(connectedAddress.length - 5)}` : "Connect Wallet"}
                </button>
            </div>
        </>
    );
}

export default ButtonDisplay;
