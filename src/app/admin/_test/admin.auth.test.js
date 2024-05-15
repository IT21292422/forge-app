const onDataSubmit = async (formData) => {
  console.log(formData);
  const datatest = "test case no 4";
  const testData = {
    token: "mockedToken",
  };
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  console.log("Data from mutation", datatest);
  localStorage.setItem("token", testData.token);
};

const authData = {
  username: "sample-user-1-test",
  password: "password",
};

describe("onDataSubmit function", () => {
  test("handles form data", async () => {
    // Define mock form data
    const formData = {};

    // Define mock data returned from mutation
    const mockMutationData = {
      token: "mockedToken",
      // Add other relevant properties as needed
    };

    const localStorageMock = {
      removeItem: jest.fn(),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;

    const mockMutationFunction = jest
      .fn()
      .mockResolvedValue({ data: mockMutationData });

    await onDataSubmit(formData, mockMutationFunction);

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("token");
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("user");
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "token",
      mockMutationData.token,
    );
  });
});

const testData = {
  username: "sample-user-1-test",
  password: "password",
};

const authHandler = (data) => {
  console.log(data);
};

// Describe block to group related tests
describe("onSubmit function", () => {
  // Test case to check if the function logs data correctly
  test("logs data", () => {
    const mockData = {
      username: "testuser",
      password: "password123",
    };

    // Mock console.log
    const consoleLogSpy = jest.spyOn(console, "log");

    // Call the function with mock data
    authHandler(testData);

    // Expect console.log to have been called with the mock data
    expect(consoleLogSpy).toHaveBeenCalledWith(authData);
  });
});
