# Real Estate DApp

## Overview
This decentralized application (DApp) enables seamless real estate transactions using smart contracts on the Ethereum blockchain. The platform represents real estate as NFTs and employs an escrow mechanism to ensure secure transactions among buyers, sellers, lenders, and inspectors.

## Features
- **Real Estate NFTs**: Properties are tokenized as NFTs for verifiable ownership.
- **Escrow Contract**: Ensures fair transactions by holding funds until conditions are met.
- **Role-Based Access**:
  - **Buyer**: Can deposit funds and finalize property purchase.
  - **Seller**: Lists properties and approves transactions.
  - **Lender**: Provides loans and verifies payments.
  - **Inspector**: Confirms property conditions before transactions proceed.
- **IPFS Integration**: Stores property metadata on IPFS via Pinata.
- **JSON Server**: Stores property details after being added.
- **Listing & Approval Process**:
  - Once a new property is added, only the seller can list it.
  - Property details are stored on the JSON server.
  - After listing and approval, the property is minted as an NFT.
- **Dynamic UI**: Role-based button texts and interactions based on the logged-in account.

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Smart Contracts**: Solidity (Hardhat, OpenZeppelin)
- **Blockchain**: Ethereum Sepolia Testnet
- **Storage**: IPFS (Pinata), JSON Server
- **Backend**: JSON Server (for storing IPFS hash, uploader address, and listing status)
- **Libraries**: Ethers.js

## Deployment
- **Smart Contract**: Deployed on Sepolia Testnet

## Installation
### Prerequisites
- Node.js & npm/yarn
- Ethers.js
- Metamask wallet configured for Sepolia

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/real-estate-dapp.git
   cd real-estate-dapp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your Pinata API credentials.
4. Start the json server:
   ```sh
   npx json-server db.json
   ```
5. Start the frontend:
   ```sh
   npm run dev
   ```


## Usage
1. Connect Metamask to the Sepolia Testnet.
2. Log in as a seller to upload property metadata to IPFS.
3. Add Property details to the form.
4. The seller lists the property, and after approval, the property is minted as an NFT.
5. Buyers browse and purchase available properties via escrow.
6. Lenders and inspectors verify transactions.
7. The seller does the final approval and the property is sold

## Smart Contract Addresses
- **Real Estate Contract**: `0x22Bb2A4b68FEfCdF0A5A555514A70a0d996cC83a`
- **Escrow Contract**: `0x8D2424CDE9f39C70EFF88e20D085e1E366DcFDa1`

## Future Improvements
- Multi-chain support (Polygon, Base)
- On-chain loan approval process

## License
MIT License

