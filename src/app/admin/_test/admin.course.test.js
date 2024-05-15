let response = {
  status: 200,
};

const fetchEarthImage = async (lon, lat, date) => {
  const KEY = "DEMO_KEY"; // Define your NASA API key
  const defaultvalues = {
    lon: 80.63,
    lat: 7.29,
    date: "2018-01-01",
    dim: 0.1,
  };

  const apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${
    lon || defaultvalues.lon
  }&lat=${lat || defaultvalues.lat}&date=${
    date || defaultvalues.date
  }&dim=0.10&api_key=${KEY}`;

  try {
    console.log(apiUrl); // Log the API URL
    return response; // Return the mock response object
  } catch (error) {
    console.error("Error fetching Earth Image:", error);
    throw error;
  }
};

const consoleLogSpy2 = jest.spyOn(console, "log");

describe("fetchEarthImage function", () => {
  test("fetches earth image with default values when no arguments are provided", async () => {
    // Call the function with no arguments
    await fetchEarthImage();

    // Expect console.log to have been called with the correct URL using default values
    expect(consoleLogSpy2).toHaveBeenCalledWith(
      `https://api.nasa.gov/planetary/earth/imagery?lon=80.63&lat=7.29&date=2018-01-01&dim=0.10&api_key=DEMO_KEY`,
    );
  });

  test("fetches earth image with provided arguments", async () => {
    // Define mock arguments
    const lon = -95.33;
    const lat = 29.78;
    const date = "2018-01-01";

    // Call the function with mock arguments
    await fetchEarthImage(lon, lat, date);

    // Expect console.log to have been called with the correct URL using provided arguments
    expect(consoleLogSpy2).toHaveBeenCalledWith(
      `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&dim=0.10&api_key=DEMO_KEY`,
    );
  });
});
