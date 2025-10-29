# JWT WeakKeyException Fix Guide

## 🚨 Problem Description

The `io.jsonwebtoken.security.WeakKeyException` occurs when using JWT (JSON Web Token) with JJWT library when the signing key is too short or weak for the HMAC-SHA algorithm.

### **Error Message**
```
io.jsonwebtoken.security.WeakKeyException: The specified key byte array is 64 bits which is not secure enough for any JWT HMAC-SHA algorithm. The JWT JWA Specification (RFC 7518, Section 3.2) states that keys used with HMAC-SHA algorithms MUST have a size >= 256 bits (the key size must be greater than or equal to the hash output size).
```

## 🔧 Root Cause Analysis

### **Why This Happens**
1. **Short Key Length**: The JWT signing key `mySecret` (8 characters = 64 bits) is too short
2. **Security Requirements**: HMAC-SHA algorithms require minimum 256 bits (32 characters) for security
3. **JJWT Library Enforcement**: Modern JJWT versions enforce RFC 7518 security standards

### **Key Length Requirements**
- **HS256 (HMAC-SHA256)**: Minimum 256 bits (32 bytes/characters)
- **HS384 (HMAC-SHA384)**: Minimum 384 bits (48 bytes/characters)  
- **HS512 (HMAC-SHA512)**: Minimum 512 bits (64 bytes/characters)

## ✅ Solution Implementation

### **Step 1: Generate a Secure JWT Key**

Replace the weak key with a secure one that meets the minimum length requirement:

#### **Before (❌ Insecure)**
```properties
jwt.signing.key.secret=mySecret
```

#### **After (✅ Secure)**
```properties
jwt.signing.key.secret=ThisIsAVerySecureSecretKeyForJWTTokenSigningThatMeetsTheMinimumLengthRequirement123456789
```

### **Step 2: Update Configuration Files**

Update both main and test configuration files:

#### **File: `src/main/resources/application.properties`**
```properties
logging.level.org.springframework = info

jwt.signing.key.secret=ThisIsAVerySecureSecretKeyForJWTTokenSigningThatMeetsTheMinimumLengthRequirement123456789
jwt.get.token.uri=/authenticate
jwt.refresh.token.uri=/refresh
jwt.http.request.header=Authorization
jwt.token.expiration.in.seconds=604800

spring.application.name=cookie-backend
# ... other properties
```

#### **File: `src/test/resources/application-test.properties`**
```properties
# JWT Configuration for tests (using same values as main for consistency)
jwt.signing.key.secret=ThisIsAVerySecureSecretKeyForJWTTokenSigningThatMeetsTheMinimumLengthRequirement123456789
jwt.get.token.uri=/authenticate
jwt.refresh.token.uri=/refresh
jwt.http.request.header=Authorization
jwt.token.expiration.in.seconds=604800
```

### **Step 3: Verify the Fix**

1. **Run Tests**
   ```bash
   mvn test
   ```

2. **Start Application**
   ```bash
   mvn spring-boot:run
   ```

3. **Check for Errors**
   - No WeakKeyException should occur
   - Application should start successfully
   - JWT functionality should work properly

## 🔐 Best Practices for JWT Key Security

### **1. Key Generation Methods**

#### **Option A: Use JJWT Built-in Key Generator**
```java
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

// Generate a secure key for HS256
SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
String base64Key = Encoders.BASE64.encode(key.getEncoded());
```

#### **Option B: Generate Random Secure Key**
```bash
# Generate a random 32-byte key (for HS256)
openssl rand -base64 32

# Or using Java
SecureRandom.getInstanceStrong().nextBytes(new byte[32])
```

#### **Option C: Use a Long Passphrase**
```properties
# Use a long, complex passphrase (minimum 32 characters)
jwt.signing.key.secret=MyVeryLongAndSecurePassphraseForJWTSigning2024!@#$
```

### **2. Environment-Specific Keys**

#### **Use Different Keys Per Environment**
```properties
# Development
jwt.signing.key.secret=${JWT_SECRET:DevSecretKeyThatIsLongEnoughForJWTSigning123456789}

# Production (use environment variable)
jwt.signing.key.secret=${JWT_SECRET}
```

#### **Environment Variables**
```bash
# Set in production environment
export JWT_SECRET="YourProductionSecretKeyThatIsVeryLongAndSecure123456789"
```

### **3. Security Considerations**

- **Never commit real secrets to version control**
- **Use different keys for different environments**
- **Rotate keys periodically**
- **Store keys in secure vaults in production**
- **Use at least 256 bits (32 characters) for HS256**

## 🧪 Testing the Fix

### **Test JWT Token Generation**
```java
@Test
public void testJWTTokenGeneration() {
    // This should not throw WeakKeyException anymore
    String token = jwtTokenUtil.generateToken(userDetails);
    assertThat(token).isNotNull();
    assertThat(token).isNotEmpty();
}
```

### **Verify Key Length**
```java
@Test
public void testJWTSecretKeyLength() {
    String secret = "YourSecretKey";
    byte[] keyBytes = secret.getBytes();
    
    // Should be at least 32 bytes for HS256
    assertThat(keyBytes.length).isGreaterThanOrEqualTo(32);
}
```

## 📋 Troubleshooting Checklist

- [ ] JWT secret key is at least 32 characters (256 bits)
- [ ] Both main and test configurations are updated
- [ ] Application restarts successfully without errors
- [ ] Tests pass without WeakKeyException
- [ ] JWT token generation works properly
- [ ] JWT token validation works properly

## 🔍 Related JWT Configuration

### **Complete JWT Configuration Example**
```properties
# JWT Security Configuration
jwt.signing.key.secret=ThisIsAVerySecureSecretKeyForJWTTokenSigningThatMeetsTheMinimumLengthRequirement123456789
jwt.get.token.uri=/authenticate
jwt.refresh.token.uri=/refresh
jwt.http.request.header=Authorization
jwt.token.expiration.in.seconds=604800

# Additional JWT Settings (Optional)
jwt.issuer=cookie-backend-app
jwt.audience=cookie-web-users
```

### **JwtTokenUtil Configuration Verification**
```java
@Component
public class JwtTokenUtil {
    @Value("${jwt.signing.key.secret}")
    private String secret;
    
    @PostConstruct
    public void validateConfiguration() {
        if (secret.getBytes().length < 32) {
            throw new IllegalArgumentException(
                "JWT secret must be at least 32 characters (256 bits) long"
            );
        }
    }
}
```

## ✅ Success Verification

After implementing the fix:

1. **✅ Application Starts**: No WeakKeyException on startup
2. **✅ Tests Pass**: All JWT-related tests execute successfully  
3. **✅ Token Generation**: JWT tokens can be created without errors
4. **✅ Token Validation**: JWT tokens can be validated properly
5. **✅ Security Compliance**: Meets RFC 7518 security standards

---

**Status**: ✅ **RESOLVED** - JWT WeakKeyException fixed with secure 256-bit key
**Security**: ✅ **COMPLIANT** - Meets HMAC-SHA algorithm security requirements
**Testing**: ✅ **VERIFIED** - All tests passing, application running successfully