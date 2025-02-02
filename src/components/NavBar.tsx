import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  account: any;
  setAccount: any;
  provider: any;
}

const SELLER_ADDRESS = "0xEe9a477BDb9791FFd0D135d3e6E31d968f90dC4F" 
const INSPECTOR_ADDRESS = "0x5cAa009dDb1f1ad8200C1E18F609b142f46a7Dd7" 
const LENDER_ADDRESS = "0x43CAdE407dAa07F1b7eb388C7DD613f3C52E7Cee"
   

export default function NavBar({ provider, account, setAccount }: NavBarProps) {
  const navigate = useNavigate()

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

  const handleAddProperty = () => {
    navigate("/add-property")
  }

  const handleApproval = () => {
    navigate("/approval")
  }
  const handleHome = () => {
    navigate("/")
  }

  return (
    <nav className="fixed top-0 w-full bg-accent shadow-lg z-50 p-2">
      <div className="flex justify-between">
        <div className='font-bold text-xl mt-2' onClick={handleHome}>Real Estate Dapp</div>
        <div className="flex justify-end">
          {account === SELLER_ADDRESS || account === INSPECTOR_ADDRESS || account === LENDER_ADDRESS ? <div className='ml-3'><button className='bg-secondary p-2 font-bold text-background rounded-full' onClick={handleApproval}>Approval</button></div> : null}
          <div className='ml-3'><button className='bg-secondary p-2 font-bold text-background rounded-full' onClick={handleAddProperty}>Add Property</button></div>
          <div className='ml-3'><button onClick={connectWallet} className='bg-secondary p-2 font-semibold text-background rounded-full'>{account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}</button></div>
        </div>
      </div>
    </nav>
  )
}
