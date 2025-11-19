# Credit Card Encryption Implementation

## Overview
Credit card numbers are now automatically encrypted before saving to the database and decrypted when reading from the database.

## How It Works

### 1. **EncryptionService** (`security/EncryptionService.java`)
- Uses AES (Advanced Encryption Standard) 128-bit encryption
- Encrypts data to Base64-encoded strings for database storage
- Configurable encryption key via `application.properties`

### 2. **CreditCardEncryptor** (`security/CreditCardEncryptor.java`)
- JPA AttributeConverter that automatically handles encryption/decryption
- Applied to the `cardNum` field in `UserDetailsNode`
- Transparent to the rest of the application

### 3. **UserDetailsNode** (Updated)
```java
@Convert(converter = CreditCardEncryptor.class)
@Column(length = 500)
private String cardNum;
```

## Security Features

✅ **Automatic Encryption**: Credit cards are encrypted before database writes
✅ **Automatic Decryption**: Encrypted values are decrypted when reading from DB
✅ **Transparent**: No changes needed to existing code - works automatically
✅ **Configurable Key**: Encryption key stored in `application.properties`
✅ **Backward Compatible**: Handles null/-1 values without encryption

## Configuration

Edit `application.properties`:
```properties
encryption.secret.key=MySecureEncryptionKey2025ForCreditCards!
```

**⚠️ IMPORTANT FOR PRODUCTION:**
1. Change the encryption key to a strong, unique value
2. Store the key in environment variables or a secure vault (not in code)
3. Never commit the real encryption key to version control
4. Consider using Spring Cloud Config or AWS Secrets Manager for key management

## How to Use

No code changes needed! The encryption happens automatically:

```java
// Saving - credit card is automatically encrypted
UserDetailsNode node = new UserDetailsNode(..., "1234567890123456", ...);
repository.save(node); // Stores encrypted value in database

// Reading - credit card is automatically decrypted
UserDetailsNode retrieved = repository.findById(id);
String cardNum = retrieved.getCardNum(); // Returns decrypted "1234567890123456"
```

## Database Impact

- The `CARD_NUM` column now stores encrypted Base64 strings (longer than plain text)
- Column size increased to 500 characters to accommodate encrypted data
- Existing plain-text credit cards will fail decryption (delete DB or re-enter cards)

## Testing

1. Restart the backend server
2. Add a new address with a credit card number
3. Check the H2 console at `http://localhost:8080/h2-console`
4. View the `USER_DETAILS_NODE` table - `CARD_NUM` will show encrypted Base64 strings
5. In the application, the credit card displays as the original number (decrypted automatically)

## Migration from Plain Text

If you have existing credit card data:
1. **Option 1**: Delete the database and start fresh (recommended for testing)
2. **Option 2**: Write a migration script to encrypt existing values
3. **Option 3**: Ask users to re-enter their credit card information

## Additional Security Recommendations

For production systems, also consider:
- **PCI DSS Compliance**: If storing real credit cards, follow PCI DSS requirements
- **Tokenization**: Use a payment gateway (Stripe, PayPal) instead of storing cards
- **Field-level Encryption**: Current implementation provides basic encryption
- **Key Rotation**: Implement periodic encryption key rotation
- **Audit Logging**: Log access to encrypted credit card data
- **TLS/SSL**: Always use HTTPS for data transmission
