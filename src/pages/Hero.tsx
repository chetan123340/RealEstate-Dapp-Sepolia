import React from 'react'
import hero from '../assets/hero.jpg'

export default function Hero() {
  const handleScroll = () => {
    const section = document.getElementById("listing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-8">
  <div className="flex justify-between w-full max-w-7xl">
    {/* Text Section */}
    <div className="w-1/2 text-primary">
      <h1 className="text-[80px] font-bold mb-4">Decentralized Real Estate</h1>
      <p className="text-xl text-gray-600 mb-6">
      Revolutionize real estate with blockchain! Secure, transparent transactions powered by NFTs and Ethereum, simplifying ownership and reducing fraud.
      </p>
      <button onClick={handleScroll} className="px-6 py-3 text-accent rounded-lg hover:bg-primary bg-secondary">
        Explore Properties!
      </button>
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
  )
}
