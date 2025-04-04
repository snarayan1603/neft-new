import React, { useState } from "react";
import { X } from "lucide-react";

export const CreateNFTForm = ({ onClose, createNFT, loading }) => {
  const [formData, setFormData] = useState({
    tokenUri: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Create New NFT</h2>

        <div className="space-y-6">
          {/* Token URI field */}
          <div>
            <label className="block text-gray-300 mb-2">Token URI</label>
            <input
              type="text"
              name="tokenUri"
              value={formData.tokenUri}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter the Token URI"
            />
          </div>

          {/* Price in ETH field */}
          <div>
            <label className="block text-gray-300 mb-2">Price (in ETH)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter the price in ETH"
            />
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors"
            onClick={() =>
              createNFT({ tokenURI: formData.tokenUri, price: formData.price })
            }
            disabled={loading}
          >
            {loading ? "Creating..." : "Create NFT"}
          </button>
        </div>
      </div>
    </div>
  );
};
