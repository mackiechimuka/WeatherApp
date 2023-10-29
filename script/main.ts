class Weather {
    apiKey: string;
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
    }
  
    async fetchWeather(city: string): Promise<void> {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
        );
  
        if (!response.ok) {
          throw new Error("No weather found.");
        }
  
        const data = await response.json();
        this.displayWeather(data);
      } catch (error) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
    }
  
    displayWeather(data: any): void {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
  
      const cityElement = document.querySelector(".city");
      if (cityElement instanceof HTMLElement) {
        cityElement.innerText = `Weather for ${name}`;
      }
  
      const iconElement = document.querySelector(".icon") as HTMLImageElement;
      if (iconElement !== null) {
        iconElement.src = `https://openweathermap.org/img/wn/${icon}.png`;
      }
  
      const descriptionElement = document.querySelector(".description");
      if (descriptionElement instanceof HTMLElement) {
        descriptionElement.innerText = description;
      }
  
      const tempElement = document.querySelector(".temp");
      if (tempElement instanceof HTMLElement) {
        tempElement.innerText = `${temp}°C`;
      }
  
      const humidityElement = document.querySelector(".humidity");
      if (humidityElement instanceof HTMLElement) {
        humidityElement.innerText = `Humidity: ${humidity}%`;
      }
  
      const windElement = document.querySelector(".wind");
      if (windElement instanceof HTMLElement) {
        windElement.innerText = `Wind speed: ${speed} km/h`;
      }
  
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    }
  
    search(): void {
      const searchBar = document.querySelector(".search-bar") as HTMLInputElement;
      this.fetchWeather(searchBar.value);
    }
  }
  
  const apiKey = "c0c96f6b560d532a74ad73b558a917eb";
  const weather = new Weather(apiKey);
  
  const searchButton = document.querySelector(".search button");
  if (searchButton instanceof HTMLElement) {
    searchButton.addEventListener("click", function () {
      weather.search();
    });
  }
  
  const searchBar = document.querySelector(".search-bar");
  if (searchBar instanceof HTMLElement) {
    searchBar.addEventListener("keyup", function (event) {
      if ((event as KeyboardEvent).key === "Enter") {
        weather.search();
      }
    });
  }