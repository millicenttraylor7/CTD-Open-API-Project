// Run code after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const menuList = document.getElementById("menuList");

  // Function to fetch data
  async function getData() {
    try {
      const response = await fetch("https://api.sampleapis.com/coffee/hot");

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log("Coffee data:", data);
      data.pop();

      // Clear any existing items
       menuList.innerHTML = "";
      data.forEach(item => {
        
        const listItem = document.createElement("li");
       listItem.className = "coffee-card";
        
        // Create the card content with title, description, and image
        listItem.innerHTML = `
          <div class="card-image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="card-content">
            <h3 class="card-title">${item.title}</h3>
            <p class="card-description">${item.description}</p>
          </div>
        `;
        
        // Append the card to the menu list
        menuList.appendChild(listItem);

      })

      //     dataContainer.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
          console.error("Error fetching Coffee data:", error);
          dataContainer.textContent = "Error fetching data: " + error.message;
         }
    }

  // Call the async function
    getData();
  });
 
   document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("weather-container");

  fetch("https://api.open-meteo.com/v1/forecast?latitude=47.3769&longitude=8.5417&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weathercode&timezone=Europe/Zurich")
    .then(response => response.json())
    .then(data => {
      console.log("Full daily weather data:", data);

      // Get today's data
      const today = data.daily.time[0];
      const maxTemp = data.daily.temperature_2m_max[0];
      const minTemp = data.daily.temperature_2m_min[0];
      const sunrise = data.daily.sunrise[0];
      const sunset = data.daily.sunset[0];
      const weatherCode = data.daily.weathercode[0];

      // Map weather codes to icons
      const weatherIcons = {
        0: "☀️", // Clear sky
        1: "🌤️", // Mainly clear
        2: "⛅", // Partly cloudy
        3: "☁️", // Overcast
        45: "🌫️", // Fog
        48: "🌫️", // Depositing rime fog
        51: "🌦️", // Light drizzle
        53: "🌧️", // Moderate drizzle
        55: "🌧️", // Dense drizzle
        61: "🌦️", // Slight rain
        63: "🌧️", // Moderate rain
        65: "🌧️", // Heavy rain
        71: "❄️", // Slight snow
        73: "🌨️", // Moderate snow
        75: "❄️", // Heavy snow
        80: "🌦️", // Rain showers
        81: "🌧️", // Heavy rain showers
        82: "⛈️", // Thunderstorm
        95: "⛈️", // Thunderstorm
        99: "🌩️"  // Severe thunderstorm
      };

      const weatherEmoji = weatherIcons[weatherCode] || "🌈";

      // Create card
      const card = document.createElement("div");
      card.classList.add("weather-card");
      card.innerHTML = `
        <h3>${new Date(today).toLocaleDateString("en-GB", { weekday: "long", month: "short", day: "numeric" })}</h3>
        <span class="weather-icon">${weatherEmoji}</span>
        <p><strong>High:</strong> ${maxTemp}°C</p>
        <p><strong>Low:</strong> ${minTemp}°C</p>
        <p><strong>Sunrise:</strong> ${new Date(sunrise).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
        <p><strong>Sunset:</strong> ${new Date(sunset).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
      `;
      container.appendChild(card);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
});
 



