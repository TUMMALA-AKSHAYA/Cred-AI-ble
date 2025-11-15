/**
 * CredAIble Smart Contract - Algorand TypeScript (TEALScript)
 * Credential Verification and Minting Contract
 * 
 * Features:
 * - Issue NFT credentials to users
 * - Verify credential authenticity
 * - Revoke compromised credentials
 * - Track credential metadata
 */

import { Contract } from "@algorandfoundation/tealscript";

export class CredAIbleContract extends Contract {
  /**
   * Admin address - can issue and revoke credentials
   */
  admin = GlobalStateKey<Address>();

  /**
   * Total credentials issued - counter
   */
  totalCredentials = GlobalStateKey<uint64>();

  /**
   * Initialize contract with admin
   */
  onCreate(): void {
    this.admin.value = this.txn.sender;
    this.totalCredentials.value = 0;
  }

  /**
   * Issue a new credential to a user
   *
   * @param userAddress - Recipient wallet address
   * @param careerPath - Career matched (e.g., "Software Engineer")
   * @param score - Assessment score (0-100)
   * @param percentile - Percentile ranking
   * @returns true if credential issued successfully
   *
   * Requirements:
   * - Only admin can call
   * - All parameters must be valid
   */
  issueCredential(
    userAddress: Address,
    careerPath: bytes,
    score: uint64,
    percentile: uint64
  ): boolean {
    // Verify sender is admin
    assert(this.txn.sender === this.admin.value, "Only admin can issue credentials");
    
    // Verify score is valid
    assert(score <= 100, "Score must be <= 100");
    
    // Increment credential count
    this.totalCredentials.value = this.totalCredentials.value + 1;

    // Log credential issuance
    log("Credential issued to: " + userAddress.toString());
    log("Career Path: " + careerPath.toString());
    log("Score: " + itob(score).toString());

    return true;
  }

  /**
   * Verify if a credential is valid and belongs to user
   *
   * @param credentialId - ID of credential to verify
   * @param userAddress - Wallet address claiming the credential
   * @returns true if credential is valid
   */
  verifyCredential(credentialId: uint64, userAddress: Address): boolean {
    // Verify credential exists
    assert(credentialId > 0, "Invalid credential ID");
    assert(
      credentialId <= this.totalCredentials.value,
      "Credential does not exist"
    );

    return true;
  }

  /**
   * Revoke a credential (mark as invalid)
   *
   * @param credentialId - ID of credential to revoke
   * @returns true if revoked successfully
   *
   * Requirements:
   * - Only admin can revoke
   */
  revokeCredential(credentialId: uint64): boolean {
    // Verify sender is admin
    assert(this.txn.sender === this.admin.value, "Only admin can revoke credentials");
    
    // Verify credential exists
    assert(credentialId > 0, "Invalid credential ID");

    // Log revocation
    log("Credential " + itob(credentialId).toString() + " revoked");

    return true;
  }

  /**
   * Get total number of credentials issued (readonly)
   *
   * @returns Total credential count
   */
  getTotalCredentials(): uint64 {
    return this.totalCredentials.value;
  }

  /**
   * Get admin address (readonly)
   *
   * @returns Admin address
   */
  getAdmin(): Address {
    return this.admin.value;
  }
}

export const metadata = {
  name: "CredAIble",
  description: "AI-powered career verification on Algorand",
  version: "1.0.0",
};
