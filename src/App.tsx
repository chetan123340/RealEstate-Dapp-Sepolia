import { useEffect, useState } from 'react';
import escrowABI from './abis/Escrow.json'
import realEstateABI from './abis/RealEstate.json'
import { ethers } from 'ethers'
import Hero from './pages/Hero';
import Listing from './pages/Listing';
import NavBar from './components/NavBar';
import AddProperty from './pages/AddProperty';
import Approval from './pages/Approval';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [provider, setProvider] = useState<any>(null)
  const [account, setAccount] = useState<any>(null)
  const [escrowContract, setEscrowContract] = useState<any>(null)
  const [realEstateContract, setRealEstateContract] = useState<any>(null)
  const [homes, setHomes] = useState<any[]>([]); // Ensure `homes` can hold metadata objects
  const [totalSupply, setTotalSupply] = useState<number>(0)


  const realEstateAddress = '0x22Bb2A4b68FEfCdF0A5A555514A70a0d996cC83a'
  const escrowAddress = '0x8D2424CDE9f39C70EFF88e20D085e1E366DcFDa1'


  useEffect(() => {
    const fetchBlockchainData = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider)

      const signer = await provider.getSigner()

      const realEstateContract = new ethers.Contract(realEstateAddress, realEstateABI, signer)
      setRealEstateContract(realEstateContract)

      const escrowContract = new ethers.Contract(escrowAddress, escrowABI, signer)
      setEscrowContract(escrowContract)

      const s = await realEstateContract.totalSupply()
      setTotalSupply(Number(s))
      
      const fetchedHomes: any[] = []; // Temporary array to collect metadata
      for (let index = 1; index <= Number(s); index++) {
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
        const addy = await signer.getAddress()
        setAccount(addy);
      });
    };

    fetchBlockchainData(); // Call the async function
  }, []);

  const Home = () => (
    <div>
      <Hero />
      {homes && <Listing homes={homes} account={account} provider={provider} escrow={escrowContract} />}
    </div>
  )
  
  return (
    <BrowserRouter>
    <div className='bg-background'>
      <NavBar account={account} provider={provider} setAccount={setAccount}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-property' element={<AddProperty totalSupply={totalSupply}/>} />
        <Route path='/approval' element={
          <Approval 
          account={account} 
          realEstateContract={realEstateContract} 
          escrowContract={escrowContract} 
          escrowAddress={escrowAddress} 
          realEstateAddress={realEstateAddress} 
          provider={provider}/>
          } />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
