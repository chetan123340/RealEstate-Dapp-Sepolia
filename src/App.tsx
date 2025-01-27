import { useEffect, useState } from 'react';
import escrowABI from './abis/Escrow.json'
import realEstateABI from './abis/RealEstate.json'
import { ethers } from 'ethers'
import Hero from './pages/Hero';
import Listing from './pages/Listing';
import NavBar from './components/NavBar';


function App() {
  const [provider, setProvider] = useState<any>(null)
  const [account, setAccount] = useState<any>(null)
  const [escrow, setEscrow] = useState<any>(null)
  const [homes, setHomes] = useState<any[]>([]); // Ensure `homes` can hold metadata objects

  
  const realEstateAddress = '0x22Bb2A4b68FEfCdF0A5A555514A70a0d996cC83a'
  const escrowAddress = '0x8D2424CDE9f39C70EFF88e20D085e1E366DcFDa1' 
  
  
  useEffect(() => {
    const fetchBlockchainData = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider)
      
      const signer = await provider.getSigner()

      const realEstateContract = new ethers.Contract(realEstateAddress, realEstateABI, signer)
      const escrowContract = new ethers.Contract(escrowAddress, escrowABI, signer)
      setEscrow(escrowContract)

      const fetchedHomes: any[] = []; // Temporary array to collect metadata
      for (let index = 1; index <= 3; index++) {
        try {
          // Fetch the token URI
          const tokenURI = await realEstateContract.tokenURI(index);

          // Fetch metadata from the Token URI
          const response = await fetch(tokenURI);
          const metadata = await response.json();
          
          if (metadata) {
            fetchedHomes.push(metadata)
            
          }
          
        } catch (error: any) {
          console.error("Error fetching NFT details:", error.message || error);
        }
      }
      setHomes(fetchedHomes); // Update state immutably

      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      });
    };

    fetchBlockchainData(); // Call the async function
  }, []);


  return (
    <div className='bg-background'>
      <NavBar account={account} setAccount={setAccount}/>
      <Hero />

      {homes && <Listing homes={homes}/>}
      {/* <Listing/> */}
    </div>
  )
}

export default App
