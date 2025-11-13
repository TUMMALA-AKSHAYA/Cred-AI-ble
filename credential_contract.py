from algopy import ARC4Contract, arc4, Box, UInt64, String, Address, Bool, Global

class Credential(arc4.Struct):
    subject: Address
    issuer: Address
    assessment_type: String
    issued_at: UInt64
    valid: Bool


class CredentialVerificationSystem(ARC4Contract):

    # Global admin who can issue or revoke credentials
    admin: Address

    def __init__(self):
        self.admin = Global.creator_address

    @arc4.abimethod
    def issue_credential(
        self,
        subject: Address,
        credential_id: String,
        assessment_type: String
    ):
        """
        Admin issues a credential.
        Box key format: "{subject}:{credential_id}"
        """
        assert Global.sender == self.admin, "Only admin can issue credentials"

        key = subject.bytes + b":" + credential_id.bytes
        assert not Box.exists(key), "Credential already exists"

        credential = Credential(
            subject=subject,
            issuer=self.admin,
            assessment_type=assessment_type,
            issued_at=Global.latest_timestamp,
            valid=True
        )

        Box.put(key, arc4.encode(credential))

    @arc4.abimethod
    def verify_credential(self, subject: Address, credential_id: String) -> Bool:
        """
        Returns True if credential exists and is valid.
        """
        key = subject.bytes + b":" + credential_id.bytes

        if not Box.exists(key):
            return Bool(False)

        raw = Box.get(key)
        cred = arc4.decode(Credential, raw)

        return cred.valid

    @arc4.abimethod
    def revoke_credential(self, subject: Address, credential_id: String):
        """
        Admin revokes a credential by marking valid=False.
        """
        assert Global.sender == self.admin, "Only admin can revoke credentials"

        key = subject.bytes + b":" + credential_id.bytes
        assert Box.exists(key), "Credential does not exist"

        raw = Box.get(key)
        cred = arc4.decode(Credential, raw)

        updated = Credential(
            subject=cred.subject,
            issuer=cred.issuer,
            assessment_type=cred.assessment_type,
            issued_at=cred.issued_at,
            valid=False
        )

        Box.put(key, arc4.encode(updated))

    @arc4.abimethod
    def delete_credential(self, subject: Address, credential_id: String):
        """
        Hard delete the credential record.
        """
        assert Global.sender == self.admin, "Only admin can delete credentials"

        key = subject.bytes + b":" + credential_id.bytes
        assert Box.exists(key), "Credential does not exist"

        Box.delete(key)
