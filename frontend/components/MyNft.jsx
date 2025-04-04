import React from "react";

const styles = {
  nftCard:
    "bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300",
  nftImage: "w-full h-64 object-cover",
  nftDetails: "p-6",
  buyButton:
    "flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white transition-colors",
};

export function MyNft({ mynft }) {
  return (
    <div className="container mx-auto px-4 py-12">
      {mynft.length === 0 ? (
        <p className="text-white text-lg text-center">
          You don't own any NFTs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mynft.map((nft, i) => (
            <div key={i} className={styles.nftCard}>
              <img
                src={nft.tokenUri}
                alt={nft.name}
                className={styles.nftImage}
              />
              <div className={styles.nftDetails}>
                <h3 className="text-xl font-bold text-white mb-2">
                  {nft.name}
                </h3>
                <p className="text-gray-400 mb-4">{nft.description}</p>
                <p className="text-indigo-400 font-semibold mb-4">
                  Price: {nft.price} ETH
                </p>
                <p className="text-gray-400 mb-4">
                  Seller: {nft.seller.substring(0, 6)}...
                  {nft.seller.substring(38)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
