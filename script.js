import { contractAddress, contractABI } from "./contractABI.js";

let provider, signer, contract;

// Wallet connection
async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        const address = await signer.getAddress();
        document.getElementById("walletText").innerText = "Wallet Connected";
        document.getElementById("walletAddress").classList.remove("hidden");
        document.getElementById("addressText").innerText = address;
    } else {
        alert("Install MetaMask first!");
    }
}
document.getElementById("connectWallet").addEventListener("click", connectWallet);

// File hash generator
async function generateFileHash(file) {
    const buffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(buffer);
    return "0x" + CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
}

// Verify Certificate
async function verifyCertificate(file) {
    const certHash = await generateFileHash(file);
    const result = await contract.verifyCertificate(certHash);

    const [isValid, recipient, issueDate, revoked] = result;

    if (isValid && !revoked) {
        alert(`✅ Valid Certificate\nRecipient: ${recipient}\nIssued: ${new Date(issueDate * 1000)}`);
    } else if (revoked) {
        alert("⚠️ This certificate is revoked.");
    } else {
        alert("❌ Certificate not found.");
    }
}

// Issue Certificate
async function issueCertificate(file, recipientAddress) {
    const certHash = await generateFileHash(file);
    const tx = await contract.issueCertificate(certHash, recipientAddress);
    await tx.wait();
    alert("✅ Certificate issued successfully!");
}

// Revoke Certificate
async function revokeCertificate(file) {
    const certHash = await generateFileHash(file);
    const tx = await contract.revokeCertificate(certHash);
    await tx.wait();
    alert("⚠️ Certificate revoked!");
}
