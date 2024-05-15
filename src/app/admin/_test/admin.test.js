const onSubmit = (data) => {
  console.log(data);
};

// Describe block to group related tests
describe("onSubmit function", () => {
  // Test case to check if the function logs data correctly
  test("logs data", () => {
    // Define mock data
    const mockData = {
      username: "testuser",
      password: "password123",
    };

    // Mock console.log
    const consoleLogSpy = jest.spyOn(console, "log");

    // Call the function with mock data
    onSubmit(mockData);

    // Expect console.log to have been called with the mock data
    expect(consoleLogSpy).toHaveBeenCalledWith(mockData);
  });
});
