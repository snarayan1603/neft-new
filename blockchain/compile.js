const fs = require("fs");
const path = require("path");
const solc = require("solc");

const contractFile = "NFTMarketplace.sol";
const contractPath = path.join(__dirname, contractFile);
const buildPath = path.join(__dirname, "build");

// Ensure build directory exists
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}

const source = fs.readFileSync(contractPath, "utf8");

// Import callback specifically for OpenZeppelin 4.9
function findImports(importPath) {
  if (importPath.startsWith("@openzeppelin/contracts")) {
    const fullPath = path.join(
      __dirname,
      "node_modules",
      "@openzeppelin",
      "contracts",
      importPath.substring("@openzeppelin/contracts/".length)
    );
    return { contents: fs.readFileSync(fullPath, "utf8") };
  }
  return { error: `File not found: ${importPath}` };
}

const input = {
  language: "Solidity",
  sources: {
    [contractFile]: { content: source },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

// Error handling
if (output.errors) {
  output.errors.forEach(err => {
    console[err.severity === 'error' ? 'error' : 'warn'](err.formattedMessage);
  });
  if (output.errors.some(err => err.severity === 'error')) {
    process.exit(1);
  }
}

// Write separate ABI and BIN files
for (const contractName in output.contracts[contractFile]) {
  const contract = output.contracts[contractFile][contractName];
  
  // Write ABI to file
  fs.writeFileSync(
    path.join(buildPath, `${contractName}.abi`),
    JSON.stringify(contract.abi, null, 2)
  );
  
  // Write bytecode to file
  fs.writeFileSync(
    path.join(buildPath, `${contractName}.bin`),
    contract.evm.bytecode.object
  );
  
  console.log(`✅ Compiled ${contractName} successfully!`);
  console.log(`- ABI saved to: ${path.join(buildPath, `${contractName}.abi`)}`);
  console.log(`- Bytecode saved to: ${path.join(buildPath, `${contractName}.bin`)}`);
}
