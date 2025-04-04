import { useState, useEffect } from "react";
import { ethers } from "ethers";
import NFTMarketplace from "../contracts/NFTMarketplace.json";
import contractAddress from "../contracts/contract-address.json";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NFTGrid } from "@/components/NFTGrid";
import { CreateNFTForm } from "@/components/CreateNFTForm";
import { ErrorMessage } from "@/components/ErrorMessage";
import { MyNft } from "@/components/MyNft";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createNftLoading, setCreateNftLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const [mynft, setMyNft] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tab, setTab] = useState("marketplace");

  function resolveIPFS(uri) {
    if (!uri) return "";
    return uri.replace(/^ipfs:\/\//, "https://nftstorage.link/ipfs/");
  }

  async function loadNFTs() {
    if (!window.ethereum) {
      setError("Please install MetaMask to use this dApp");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Ensure ABI is properly structured
      const contractABI = Array.isArray(NFTMarketplace)
        ? NFTMarketplace
        : NFTMarketplace.abi;

      const contract = new ethers.Contract(
        contractAddress.address,
        contractABI,
        signer
      );

      const data = await contract.fetchMarketItems();
      console.log("Market Items:", data);
      const items = await Promise.all(
        data.map(async (i) => {
          const tokenUri = await contract.tokenURI(i.tokenId);

          let tokenData = {};

          try {
            const resolvedUri = resolveIPFS(tokenUri);
            console.log("Resolved URI:", resolvedUri, tokenUri);

            const response = await fetch(resolvedUri);
            console.log("Response:", response);
            if (response.ok) tokenData = await response.json();
          } catch (error) {
            console.error("Error fetching metadata:", error);
          }

          return {
            tokenId: i.tokenId.toString(),
            seller: i.seller,
            owner: i.owner,
            price: ethers.formatEther(i.price),
            name: tokenData.name,
            description: tokenData.description,
            image: tokenData.image,
            tokenUri,
          };
        })
      );
      setNfts(items);
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setError(`Failed to load NFTs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function loadMyNFTs() {
    try {
      console.log("Loading My NFTs...");
      if (!window.ethereum) return alert("Please install MetaMask");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // Ensure ABI is properly structured
      const contractABI = Array.isArray(NFTMarketplace)
        ? NFTMarketplace
        : NFTMarketplace.abi;

      const contract = new ethers.Contract(
        contractAddress.address,
        contractABI,
        signer
      );

      const items = await contract.fetchMyNFTs();
      console.log("My NFTs:", items);

      const nftDetails = await Promise.all(
        items.map(async (item) => {
          console.log("Item:", item);
          const tokenUri = await contract.tokenURI(item.tokenId);
          let tokenData = {};

          try {
            const resolvedUri = resolveIPFS(tokenUri);
            console.log("Resolved URI:", resolvedUri, tokenUri);

            const response = await fetch(resolvedUri);
            console.log("Response:", response);
            if (response.ok) tokenData = await response.json();
          } catch (error) {
            console.error("Error fetching metadata:", error);
          }

          return {
            tokenId: i.tokenId.toString(),
            seller: i.seller,
            owner: i.owner,
            price: ethers.formatEther(i.price),
            name: tokenData.name,
            description: tokenData.description,
            image: tokenData.image,
            tokenUri,
          };
        })
      );

      console.log("NFT Details:", nftDetails);

      setMyNft(nftDetails);
    } catch (err) {
      console.error("Failed to load NFTs:", err);
    } finally {
      setLoading(false);
    }
  }

  async function buyNft(nft) {
    if (!window.ethereum) {
      setError("Please install MetaMask");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractABI = Array.isArray(NFTMarketplace)
        ? NFTMarketplace
        : NFTMarketplace.abi;
      const contract = new ethers.Contract(
        contractAddress.address,
        contractABI,
        signer
      );

      const price = ethers.parseEther(nft.price.toString());
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
      await loadNFTs();
    } catch (error) {
      console.error("Error buying NFT:", error);

      // Handle specific error cases
      if (error.code === "INSUFFICIENT_FUNDS") {
        setError(
          "Insufficient funds to complete this transaction. Please add more ETH to your wallet."
        );
      } else if (error.code === "ACTION_REJECTED") {
        setError("Transaction was rejected by user");
      } else if (error.reason) {
        // Handle contract revert reasons
        setError(`Transaction failed: ${error.reason}`);
      } else if (error.message.includes("insufficient funds")) {
        setError("Insufficient funds for transaction (including gas fees)");
      } else {
        setError(`Failed to buy NFT: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function createNFT({ tokenURI, price }) {
    console.log(tokenURI, price);
    if (!tokenURI || !price) {
      setError("Please fill all fields");
      return;
    }

    if (!window.ethereum) {
      setError("Please install MetaMask");
      return;
    }

    try {
      setCreateNftLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Use the same ABI handling pattern as in loadNFTs
      const contractABI = Array.isArray(NFTMarketplace)
        ? NFTMarketplace
        : NFTMarketplace.abi;

      const contract = new ethers.Contract(
        contractAddress.address,
        contractABI,
        signer
      );

      const priceInWei = ethers.parseEther(price);
      const transaction = await contract.mintToken(tokenURI, priceInWei);
      await transaction.wait();
      await loadNFTs();
    } catch (error) {
      console.error("Error creating NFT:", error);
      setError(`Failed to create NFT: ${error.message}`);
    } finally {
      setCreateNftLoading(false);
			setIsCreateModalOpen(false)
    }
  }

  async function connectWallet() {
    if (!window.ethereum) {
      setError("Please install MetaMask");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setError("");
      await loadNFTs();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError("Failed to connect wallet. See console for details.");
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || "");
        loadNFTs();
      });
    }

    if (tab === "mynft") {
      loadMyNFTs();
    } else {
      loadNFTs();
    }
  }, [tab]);

  return (
    <div>
      <div className="min-h-screen bg-gray-900">
        <Header
          onCreateClick={() => setIsCreateModalOpen(true)}
          connectWallet={connectWallet}
          account={account}
          setTab={setTab}
        />
        <Hero />
        {tab === "mynft" && <MyNft mynft={mynft} />}
        {tab === "marketplace" && <NFTGrid nfts={nfts} buyNft={buyNft} />}
        {isCreateModalOpen && (
          <CreateNFTForm
            onClose={() => setIsCreateModalOpen(false)}
            createNFT={createNFT}
            loading={createNftLoading}
          />
        )}
      </div>

      {error && <ErrorMessage message={error}></ErrorMessage>}
    </div>
  );
}
