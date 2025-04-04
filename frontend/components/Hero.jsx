import React from "react";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          Amazing Creatures NFTs
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Mint a NFT to get unlimited ownership forever!
        </p>
      </div>
    </div>
  );
};
