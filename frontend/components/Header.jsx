import React from "react";
import { PlusCircle } from "lucide-react";

export const Header = ({ onCreateClick, connectWallet, account, setTab }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <div className="flex items-center gap-4">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => setTab("marketplace")}
        >
          NFTMarketplace
        </h1>

        <h2
          className="text-xl semi-bold cursor-pointer"
          onClick={() => setTab("mynft")}
        >
          My NFT
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          Create
        </button>

        {account ? (
          <p>
            Connected: {account.substring(0, 6)}...{account.substring(38)}
          </p>
        ) : (
          <button
            onClick={connectWallet}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};
