# Unit Testing Guide for Cookie-Backend

## 🚀 Getting Started

This guide provides a comprehensive overview of unit testing in the cookie-backend Spring Boot application.

## 📁 Test Structure

```
src/test/java/
├── com/rest/webservices/restfulwebservices/
│   ├── RestfulWebServicesApplicationTest.java    # Application context test
│   ├── testutil/
│   │   └── TestDataFactory.java                  # Test data creation utilities
│   └── todo/
│       ├── TodoTest.java                         # Unit tests for Todo entity
│       ├── TodoJpaResourceUnitTest.java          # Unit tests for REST controller
│       ├── TodoJpaResourceTest.java              # Integration tests (with security)
│       └── TodoJpaRepositoryTest.java            # Repository integration tests
└── resources/
    └── application-test.properties               # Test configuration
```

## 🧪 Types of Tests Included

### 1. **Unit Tests** (Fast, Isolated)
- **TodoTest.java**: Tests the Todo entity class
- **TodoJpaResourceUnitTest.java**: Tests the REST controller with mocked dependencies

### 2. **Integration Tests** (Slower, Real Components)
- **TodoJpaRepositoryTest.java**: Tests repository with real database
- **TodoJpaResourceTest.java**: Tests REST endpoints with Spring context
- **RestfulWebServicesApplicationTest.java**: Tests application startup

## 🏃‍♂️ Running Tests

### Run All Tests
```bash
mvn test
```

### Run Specific Test Class
```bash
mvn test -Dtest=TodoTest
mvn test -Dtest=TodoJpaResourceUnitTest
```

### Run Tests with Coverage
```bash
mvn test jacoco:report
```

### Run Tests in IDE
- Right-click test class → "Run Tests"
- Use JUnit 5 runner built into your IDE

## 📊 Test Coverage

### Current Test Coverage:
- ✅ **Todo Entity**: 100% method coverage
- ✅ **TodoJpaResource**: ~90% coverage
- ✅ **TodoJpaRepository**: Integration tested
- ⏳ **Security Components**: Partially tested
- ⏳ **JWT Components**: Not yet covered

## 🛠️ Testing Tools & Frameworks

Your project uses:
- **JUnit 5**: Test framework
- **Mockito**: Mocking framework  
- **AssertJ**: Fluent assertions
- **Spring Boot Test**: Integration testing
- **H2 Database**: In-memory database for tests
- **Spring Security Test**: Security testing support

## 📝 Writing New Tests

### 1. Unit Test Template
```java
@ExtendWith(MockitoExtension.class)
@DisplayName("YourClass Unit Tests")
class YourClassTest {

    @Mock
    private Dependency mockDependency;

    @InjectMocks
    private YourClass yourClass;

    @Test
    @DisplayName("Should do something when condition met")
    void shouldDoSomethingWhenConditionMet() {
        // Given
        when(mockDependency.method()).thenReturn(expectedValue);

        // When
        Result result = yourClass.methodToTest();

        // Then
        assertThat(result).isNotNull();
        verify(mockDependency).method();
    }
}
```

### 2. Integration Test Template
```java
@SpringBootTest
@ActiveProfiles("test")
@DisplayName("YourClass Integration Tests")
class YourClassIntegrationTest {

    @Autowired
    private YourService yourService;

    @Test
    @DisplayName("Should integrate with real dependencies")
    void shouldIntegrateWithRealDependencies() {
        // Given, When, Then
    }
}
```

### 3. Repository Test Template
```java
@DataJpaTest
@DisplayName("YourRepository Tests")
class YourRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private YourRepository repository;

    @Test
    @DisplayName("Should find entities by criteria")
    void shouldFindEntitiesByCriteria() {
        // Given, When, Then
    }
}
```

## 🎯 Next Steps for Testing

### Immediate priorities:
1. **Add User/JWT tests**: Test user authentication and JWT token handling
2. **Add Item/Cart tests**: Test shopping cart functionality
3. **Add Security tests**: Test endpoint security and authorization
4. **Add validation tests**: Test input validation and error handling

### Sample test to add next:
```java
// UserResourceTest.java
// ItemNodeJpaResourceTest.java  
// CartItemResourceTest.java
// JwtTokenUtilTest.java
```

## 🔧 Best Practices

1. **Use descriptive test names**: `shouldReturnUserWhenValidUsernameProvided()`
2. **Follow AAA pattern**: Arrange, Act, Assert (Given, When, Then)
3. **Test edge cases**: null values, empty collections, invalid input
4. **Use test data factories**: Keep test data creation consistent
5. **Mock external dependencies**: Don't rely on external services
6. **Test behavior, not implementation**: Focus on what the code should do

## 📈 Measuring Success

- **Coverage**: Aim for 80%+ line coverage on business logic
- **Speed**: Unit tests should run in milliseconds
- **Reliability**: Tests should be deterministic and not flaky
- **Maintainability**: Tests should be easy to read and update

## 🐛 Common Testing Issues & Solutions

### Issue: Tests fail due to security
**Solution**: Use `@WithMockUser` or disable security for tests

### Issue: Database state conflicts between tests  
**Solution**: Use `@Transactional` or `@DirtiesContext`

### Issue: Tests are too slow
**Solution**: Use more unit tests with mocks, fewer integration tests

### Issue: Flaky tests
**Solution**: Avoid time-dependent logic, use deterministic test data

---

Happy Testing! 🎉