import { useState } from 'react'
import { ethers } from "ethers";

export default function NavBar({account, setAccount}) {

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Set the first connected account
        setAccount(accounts[0]);

      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };
  return (
    <nav className="fixed top-0 w-full bg-accent shadow-lg z-50 p-2">
        <div className="flex justify-between">
            <div className='font-bold text-xl mt-2'>Real Estate Dapp</div>
            <div className='ml-3'><button onClick={connectWallet} className='bg-secondary p-2 font-semibold text-background rounded-full'>{account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}</button></div>
        </div>
        </nav>
  )
}
