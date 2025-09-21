// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertifyChain {
    struct Certificate {
        address issuer;
        address recipient;
        uint256 issueDate;
        bool revoked;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateIssued(bytes32 indexed certHash, address indexed issuer, address indexed recipient);
    event CertificateRevoked(bytes32 indexed certHash);

    // Issue a new certificate
    function issueCertificate(bytes32 certHash, address recipient) public {
        require(certificates[certHash].issuer == address(0), "Certificate already exists");

        certificates[certHash] = Certificate({
            issuer: msg.sender,
            recipient: recipient,
            issueDate: block.timestamp,
            revoked: false
        });

        emit CertificateIssued(certHash, msg.sender, recipient);
    }

    // Verify if a certificate is valid
    function verifyCertificate(bytes32 certHash) public view returns (
        bool isValid,
        address recipient,
        uint256 issueDate,
        bool revoked
    ) {
        Certificate memory cert = certificates[certHash];
        if (cert.issuer == address(0)) {
            return (false, address(0), 0, false); // Not found
        }
        return (!cert.revoked, cert.recipient, cert.issueDate, cert.revoked);
    }

    // Revoke a certificate
    function revokeCertificate(bytes32 certHash) public {
        require(certificates[certHash].issuer == msg.sender, "Only issuer can revoke");
        require(!certificates[certHash].revoked, "Already revoked");

        certificates[certHash].revoked = true;
        emit CertificateRevoked(certHash);
    }
}
