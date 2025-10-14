
// Log message to console
console.log("Hello");

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

    fetch("https://api.open-meteo.com/v1/forecast?latitude=47.3769&longitude=8.5417&current_weather=true")
  .then(response => response.json())
  .then(data => {
    console.log("Full weather data:", data);
    const weatherCode = data.current_weather.weathercode;
    console.log("Weather code for Zurich:", weatherCode);
  })
  .catch(error => {
      console.error("Error fetching weather data:", error);
  });
  




