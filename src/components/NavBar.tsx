import { useState } from 'react'
import { ethers } from "ethers";
const { utils } = ethers as any;

interface NavBarProps {
  account: any;
  setAccount: any;
  provider: any;
}
export default function NavBar({ provider, account, setAccount }: NavBarProps) {

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Set the first connected account
        const signer = await provider.getSigner();
        setAccount(await signer.getAddress());

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
        <div className="flex justify-end">
          {account == "0xEe9a477BDb9791FFd0D135d3e6E31d968f90dC4F" ? <div className='ml-3'><button className='bg-secondary p-2 font-bold text-background rounded-full'>Seller Btn</button></div> : null}
          <div className='ml-3'><button className='bg-secondary p-2 font-bold text-background rounded-full'>Add Property</button></div>
          <div className='ml-3'><button onClick={connectWallet} className='bg-secondary p-2 font-semibold text-background rounded-full'>{account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}</button></div>
        </div>
      </div>
    </nav>
  )
}
