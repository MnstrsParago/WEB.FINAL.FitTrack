document.addEventListener("DOMContentLoaded", () => {
  const weatherDiv = document.getElementById("weatherInfo");

  // Ensure the div exists
  if (!weatherDiv) return;

  if (!navigator.geolocation) {
    weatherDiv.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = "d87aaed761f65e8277c3ea1d3aa91382"; // My own API key from https://home.openweathermap.org/api_keys

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error("Weather data not available.");
        }

        const data = await response.json();
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const city = data.name;
        const icon = data.weather[0].icon;

        weatherDiv.innerHTML = `
          <i class="fas fa-map-marker-alt"></i> <strong>${city}</strong> — 
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" style="vertical-align: middle;" />
          <strong>${temp}°C</strong>, ${desc}
        `;
      } catch (error) {
        weatherDiv.classList.replace("alert-info", "alert-danger");
        weatherDiv.textContent = `Error fetching weather: ${error.message}`;
      }
    },
    (error) => {
      weatherDiv.classList.replace("alert-info", "alert-warning");
      weatherDiv.textContent = "Unable to get your location.";
    }
  );
});

const weatherDiv = document.getElementById("weatherDetails"); // updated selector

// ... then later in the code ...
weatherDiv.innerHTML = `
  <strong>${city}</strong>
  <span>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" style="vertical-align: middle;" />
    <strong>${temp}°C</strong>, ${desc}
  </span>
`;
