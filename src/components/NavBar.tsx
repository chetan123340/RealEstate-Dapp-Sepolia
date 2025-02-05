import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  account: any;
  setAccount: any;
  provider: any;
  seller: any;
  lender: any;
  inspector: any;
}

export default function NavBar({ provider, account, setAccount, seller, inspector, lender }: NavBarProps) {
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
    <nav className="group fixed top-0 w-full bg-accent shadow-lg z-50 p-2">
      <div className="flex justify-between">
        <div className='font-bold text-xl mt-2 group-hover:cursor-pointer' onClick={handleHome}>Real Estate Dapp</div>
        <div className="flex justify-end">
          {account === seller ? <div className='ml-3'><button className='bg-secondary p-2 font-bold text-background rounded-full group-hover:cursor-pointer' onClick={handleApproval}>Approval</button></div> : null}
          {account === inspector || account === lender || account === seller ? <div className='ml-3'><button className='bg-secondary p-2 font-bold text-background rounded-full group-hover:cursor-pointer' onClick={handleAddProperty}>Add Property</button></div> : null}
          <div className='ml-3'><button onClick={connectWallet} className='bg-secondary p-2 font-semibold text-background rounded-full group-hover:cursor-pointer'>{account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}</button></div>
        </div>
      </div>
    </nav>
  )
}
