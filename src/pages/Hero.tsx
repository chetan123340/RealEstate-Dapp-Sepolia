import hero from '../assets/hero.jpg'

export default function Hero() {
  const handleScroll = () => {
    const section = document.getElementById("listing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id='home'>
      <div className="flex items-center justify-center h-screen px-8">
        <div className="flex justify-between w-full max-w-7xl">
          {/* Text Section */}
          <div className="w-1/2 text-primary">
            <h1 className="text-[80px] font-bold mb-4">Decentralized Real Estate</h1>
            <p className="text-xl text-gray-600 mb-6">
              Revolutionize real estate with blockchain! Secure, transparent transactions powered by NFTs and Ethereum, simplifying ownership and reducing fraud.
            </p>
            <div className="flex flex-col">
              <div className="flex justify-between my-4">
                <a className='bg-accent text-2xl p-2 rounded-md border' target='_blank' href="https://sepolia.etherscan.io/address/0x22Bb2A4b68FEfCdF0A5A555514A70a0d996cC83a">View RealEstate Contract</a>
                <a className='bg-accent text-2xl p-2 rounded-md border' target='_blank' href="https://sepolia.etherscan.io/address/0x8D2424CDE9f39C70EFF88e20D085e1E366DcFDa1">View Escrow Contract</a>
              </div>
              <button onClick={handleScroll} className="px-6 py-3 text-white rounded-lg hover:bg-primary bg-secondary font-bold">
                Explore Properties!
              </button>
            </div>

          </div>

          {/* Image Section */}
          <div className="w-1/2 flex justify-end">
            <img
              src={hero}
              alt="Hero Image"
              className="rounded-lg shadow-lg h-[450px] w-[450px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
