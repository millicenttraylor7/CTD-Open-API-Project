// Run code after the DOM is fully loaded
// Run code after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display coffee menu
  fetchCoffeeMenu();
  
  // Fetch and display weather
  fetchWeather();
  
  // Setup temperature toggle button
  setupTemperatureToggle();
});

// Function to fetch and display coffee menu
async function fetchCoffeeMenu() {
  const menuList = document.getElementById("menuList");
  
  try {
    const response = await fetch("https://api.sampleapis.com/coffee/hot");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("Coffee data:", data);
    
    
    // const cleanedData = data.filter(item => item.title = "title"); 
    delete data[3];
    // console.log("Filtered coffee data:", cleanedData);
    console.log("Coffee data after deletion:", data);

    // Clear any existing items
    menuList.innerHTML = "";
    
    // Filter out items with missing or broken data
    data.forEach(item => {
      // Skip items that don't have proper data
      if (!item.title || !item.description || !item.image) {
        return;
      }
      
      const listItem = document.createElement("li");
      listItem.className = "coffee-card";
      
      // Create the card content with title, description, and image
      listItem.innerHTML = `
        <div class="card-image">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Coffee'">
        </div>
        <div class="card-content">
          <h3 class="card-title">${item.title}</h3>
          <p class="card-description">${item.description}</p>
        </div>
      `;
      
      // Append the card to the menu list
      menuList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching Coffee data:", error);
    menuList.innerHTML = "<p style='text-align: center; color: #666;'>Error fetching menu data. Please try again later.</p>";
  }
}

// Function to fetch and display weather
async function fetchWeather() {
  const container = document.getElementById("weather-container");

  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=47.3769&longitude=8.5417&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weathercode&timezone=Europe/Zurich"
    );
    
    if (!response.ok) {
      throw new Error("Weather request failed");
    }
    
    const data = await response.json();
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
      0: "☀️",   // Clear sky
      1: "🌤️",  // Mainly clear
      2: "⛅",   // Partly cloudy
      3: "☁️",   // Overcast
      45: "🌫️", // Fog
      48: "🌫️", // Depositing rime fog
      51: "🌦️", // Light drizzle
      53: "🌧️", // Moderate drizzle
      55: "🌧️", // Dense drizzle
      61: "🌦️", // Slight rain
      63: "🌧️", // Moderate rain
      65: "🌧️", // Heavy rain
      71: "❄️",  // Slight snow
      73: "🌨️", // Moderate snow
      75: "❄️",  // Heavy snow
      80: "🌦️", // Rain showers
      81: "🌧️", // Heavy rain showers
      82: "⛈️",  // Thunderstorm
      95: "⛈️",  // Thunderstorm
      99: "🌩️"   // Severe thunderstorm
    };

    const weatherEmoji = weatherIcons[weatherCode] || "🌈";

    // Store temperatures for toggle functionality
    window.weatherData = {
      maxTemp: maxTemp,
      minTemp: minTemp,
      sunrise: sunrise,
      sunset: sunset,
      weatherEmoji: weatherEmoji,
      date: today
    };

    // Display weather
    displayWeather();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    container.innerHTML = "<p style='color: #666;'>Error fetching weather data. Please try again later.</p>";
  }
}

// Function to display weather with current unit preference
function displayWeather() {
  const container = document.getElementById("weather-container");
  
  if (!window.weatherData) {
    return;
  }

  const { maxTemp, minTemp, sunrise, sunset, weatherEmoji, date } = window.weatherData;
  const isCelsius = window.isCelsius !== false; // Default to Celsius
  
  // Convert temperatures if needed
  const displayMaxTemp = isCelsius ? maxTemp : (maxTemp * 9/5) + 32;
  const displayMinTemp = isCelsius ? minTemp : (minTemp * 9/5) + 32;
  const unit = isCelsius ? "°C" : "°F";

  // Create card
  const card = document.createElement("div");
  card.classList.add("weather-card");
  card.innerHTML = `
    <h3>${new Date(date).toLocaleDateString("en-GB", { weekday: "long", month: "short", day: "numeric" })}</h3>
    <span class="weather-icon">${weatherEmoji}</span>
    <p><strong>High:</strong> ${displayMaxTemp.toFixed(1)}${unit}</p>
    <p><strong>Low:</strong> ${displayMinTemp.toFixed(1)}${unit}</p>
    <p><strong>Sunrise:</strong> ${new Date(sunrise).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
    <p><strong>Sunset:</strong> ${new Date(sunset).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
  `;
  
  container.innerHTML = "";
  container.appendChild(card);
}

// Setup temperature toggle functionality
function setupTemperatureToggle() {
  const toggleBtn = document.getElementById("toggle-btn");
  const weatherContainer = document.getElementById("weather-container");
  
  window.isCelsius = true; // Default to Celsius
  
  toggleBtn.addEventListener("click", () => {
    // Start fade-out
    weatherContainer.classList.add("fade-out");

    // Wait for fade-out to finish before updating
    setTimeout(() => {
      window.isCelsius = !window.isCelsius;
      toggleBtn.textContent = window.isCelsius ? "Switch to °F" : "Switch to °C";
      displayWeather();

      // Fade back in
      weatherContainer.classList.remove("fade-out");
    }, 600); // Match the CSS transition time
  });
}