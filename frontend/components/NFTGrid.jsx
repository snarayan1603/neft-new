import React, { useState } from "react";

// Sample styles (you can use Tailwind CSS or your custom styles here)
const styles = {
  nftCard:
    "bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300",
  nftImage: "w-full h-64 object-cover",
  nftDetails: "p-6",
  buyButton:
    "flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white transition-colors",
};

export const NFTGrid = ({ nfts, buyNft }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      {nfts.length === 0 ? (
        <p className="text-white text-lg text-center">
          No NFTs listed for sale.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft, i) => (
            <NFTCard key={i} nft={nft} buyNft={buyNft} />
          ))}
        </div>
      )}
    </div>
  );
};

const NFTCard = ({ nft, buyNft }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.nftCard}>
      <img src={nft.tokenUri} alt={nft.name} className={styles.nftImage} />
      <div className={styles.nftDetails}>
        <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
        <p className="text-gray-400 mb-4">{nft.description}</p>
        <p className="text-indigo-400 font-semibold mb-4">
          Price: {nft.price} ETH
        </p>
        <p className="text-gray-400 mb-4">
          Seller: {nft.seller.substring(0, 6)}...{nft.seller.substring(38)}
        </p>
        <button
          onClick={() => {
            setLoading(true);
            buyNft(nft).finally(() => setLoading(false));
          }}
          className={styles.buyButton}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
};
