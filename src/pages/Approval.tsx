import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import SellerCard from '../components/SellerCard'
import { ethers } from 'ethers';

interface ApprovalProps {
  account: string;
  realEstateContract: any;
  escrowContract: any;
  escrowAddress: string;
  provider: any;
  seller: any;
}
export default function Approval({
  account,
  realEstateContract,
  escrowContract,
  escrowAddress,
  provider,
  seller }: ApprovalProps) {
  if (account === seller) {
    const [steps, setSteps] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<any[]>([])
    const stepsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Scroll to the bottom of the container when new steps are added
      if (stepsContainerRef.current) {
        stepsContainerRef.current.scrollTop = stepsContainerRef.current.scrollHeight;
      }
    }, [steps]); // Runs whenever steps array changes

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:3000/data")
          setData(res.data)
        } catch (error) {
          console.log("Error in fetching data");
        }
      }
      fetchData()
    }, [data])

    const handleListing = async (IpfsHash: string, idListing: string, tokenId: number, value: number) => {
      setIsOpen(true); 
      try {
        const approveAndList = async () => {
          const valEther = (String(value))
          
          setSteps(["⏳ Initializing transaction..."]);

          const purchasePrice = ethers.parseEther(valEther);
          const escrowAmount = ethers.parseEther("0.01");

          // Mint Property
          setSteps(prev => [...prev, "🔨 Minting property..."]);
          const tokenURI = `https://red-official-urial-988.mypinata.cloud/ipfs/${IpfsHash}`;
          const mintTx = await realEstateContract.mint(tokenURI);
          await mintTx.wait();
          setSteps(prev => [...prev, `✅ Minted Property! TX: mintTx.hash 0x06c67a5e7e54fe7c6a94a0bd3b48a7de205fcc5ca2adf875b47d3a8caa36adff`]);

          // Approve Escrow Contract
          setSteps(prev => [...prev, "🔄 Approving Escrow contract..."]);
          const approveTx = await realEstateContract.approve(escrowAddress, tokenId);
          await approveTx.wait();
          setSteps(prev => [...prev, `✅ Approved Escrow! TX: approveTx.hash 0x06c67a5e7e54fe7c6a94a0bd3b48a7de205fcc5ca2adf875b47d3a8caa36adff`]);

          // Initialize Escrow
          setSteps(prev => [...prev, "🔄 Initializing Escrow..."]);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const inspectorAddress = "0x5cAa009dDb1f1ad8200C1E18F609b142f46a7Dd7";
          const lenderAddress = "0x43CAdE407dAa07F1b7eb388C7DD613f3C52E7Cee";
          const initTx = await escrowContract.setInitals(realEstateContract.target, address, inspectorAddress, lenderAddress);
          await initTx.wait();
          setSteps(prev => [...prev, `✅ Escrow Initialized! TX: initTx.hash 0x06c67a5e7e54fe7c6a94a0bd3b48a7de205fcc5ca2adf875b47d3a8caa36adff`]);

          // List Property
          setSteps(prev => [...prev, "📢 Listing property..."]);
          const buyerAddress = "0xE6Cd832d8052f08e29c4FeAfd27fc084c0ae5279";
          const listTx = await escrowContract.list(tokenId, buyerAddress, purchasePrice, escrowAmount, { value: escrowAmount });
          await listTx.wait();
          setSteps(prev => [...prev, `✅ Property Listed! TX: listTx.hash 0x06c67a5e7e54fe7c6a94a0bd3b48a7de205fcc5ca2adf875b47d3a8caa36adff`]);

          setSteps(prev => [...prev, "🎉 Property Successfully Minted & Listed!"]);
          dbUpdate()
        }

        const dbUpdate = async () => {
          const res = await axios.get("http://localhost:3000/data/" + idListing)
          const data = res.data

          await axios.put("http://localhost:3000/data/" + idListing, {
            IpfsHash: data.IpfsHash,
            isListed: true,
            id: data.id
          })
          setSteps(prev => [...prev, `✅ Database Updated`]);
        }

        approveAndList()
      } catch (error) {
        if (error instanceof Error) {
          setSteps(prev => [...prev, `❌ Error: ${error.message}`]);
        } else {
          setSteps(prev => [...prev, "❌ An unknown error occurred"]);
        }
      }
    }

    return (
      <div className='p-24 bg-background'>
        <div className='flex flex-col-reverse'>

          {data.map((d, index) => (
            <div key={index}>
              <SellerCard
                IpfsHash={d.IpfsHash}
                idListing={d.id}
                isListed={d.isListed}
                handleListing={handleListing} />
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white p-5 rounded-lg shadow-lg w-[900px]">
              <h2 className="text-xl font-semibold">Transaction Progress</h2>
              <div className="mt-4 space-y-2 max-h-72 overflow-auto " ref={stepsContainerRef}>
                {steps.map((step, index) => (
                  <div key={index} className="p-2 border rounded bg-gray-100 text-sm">
                    {step}
                  </div>
                ))}
              </div>
              <button onClick={() => setIsOpen(false)} className="mt-4 w-full py-2 bg-red-500 text-white rounded">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className=' bg-background text-7xl font-bold'>
        <div className=' flex items-center justify-center h-screen'>
          Not Authorized
        </div>
      </div>
    )
  }
}
