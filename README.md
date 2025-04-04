# 🧩 NFT Marketplace

A full-stack decentralized NFT Marketplace where users can mint, list, buy, and resell NFTs — powered by Ethereum smart contracts and IPFS-based metadata.

---

## 🚀 Features

- 🖼️ Mint NFTs using `tokenURI` (with IPFS metadata)
- 🛒 List NFTs for sale
- 💰 Buy listed NFTs
- 🔁 Resell owned NFTs
- 📦 Fetch NFTs owned or listed by user
- ⚙️ Uses ERC721 + OpenZeppelin Standards

---

## 🛠️ Tech Stack

- **Smart Contract**: Solidity (ERC721), OpenZeppelin, Hardhat/Remix
- **Frontend**: React.js, Ethers.js
- **Storage**: NFT.Storage / IPFS for metadata & images

---

## 📦 Smart Contract Overview

```solidity
contract NFTMarketplace is ERC721URIStorage, Ownable {
    function mintToken(string memory _tokenURI, uint256 price) public;
    function createMarketSale(uint256 tokenId) public payable;
    function resellToken(uint256 tokenId, uint256 price) public payable;
    function fetchMarketItems() public view returns (MarketItem[]);
    function fetchMyNFTs() public view returns (MarketItem[]);
}
```

All NFTs are minted and listed for sale in a single transaction. Metadata and media are stored off-chain using IPFS.

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git https://github.com/clusterprotocol/nft-marketplace-template
cd nft-marketplace-template
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Compile and Deploy the Smart Contract (Hardhat)

```bash
cd blockchain
npm install
node compile
```

> Make sure to update the contract address in your frontend after deployment.

### 4. Start the Frontend

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 🌐 IPFS Metadata Example

```json
{
  "name": "Cluster Genesis NFT",
  "description": "A sample NFT from Cluster Protocol",
  "image": "ipfs://bafybeihd5o3xg6o2o2zd44kzvcmpidukmcqgfvnfn3d3ovjwzj22tmgkxu/image.png"
}
```

Convert `ipfs://...` to an HTTP gateway:
- `https://nftstorage.link/ipfs/...`
- `https://ipfs.io/ipfs/...`

---

## 🔐 Notes

- NFTs are transferred to the contract when listed, and transferred to the buyer on purchase.
- Only metadata URIs (not raw files) are stored on-chain to optimize gas usage.

---

## 🧪 TODOs & Improvements

- [ ] Add royalties support (ERC2981)
- [ ] Add filter & search functionality
- [ ] Support auctions and timed listings
