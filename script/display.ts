class WeatherApp {
    constructor() {}
  
    getLocation(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
      } else {
        alert('Oops could not get your location');
      }
    }
  
    showPosition(positions: GeolocationPosition): void {
      const lat: number = positions.coords.latitude;
      const long: number = positions.coords.longitude;
      console.log(lat, long);
      this.fetchWeather(lat, long);
    }
  
    fetchWeather(latitude: number, longitude: number): void {
      const apiKey: string = "c0c96f6b560d532a74ad73b558a917eb";
      const first3rdAp: string = "https://api.openweathermap.org/data/2.5/weather?lat=";
      const second3rdAp: string = "&lon=";
      const thirdAp: string = "&units=metric&appid=";
      const fullApi: string = first3rdAp + latitude + second3rdAp + longitude + thirdAp + apiKey;
      this.displayWeather(fullApi);
    }
  
    async displayWeather(fullApi: string): Promise<void> {
      const apiData = await fetch(fullApi);
      const data = await apiData.json();
      console.log(data);
  
      const { main, wind, name, weather } = data;
  
      const cityElement = document.querySelector(".city") as HTMLElement;
      const iconElement = document.querySelector(".icon") as HTMLImageElement;
      const descriptionElement = document.querySelector(".description") as HTMLElement;
      const tempElement = document.querySelector(".temp") as HTMLElement;
      const humidityElement = document.querySelector(".humidity") as HTMLElement;
      const windElement = document.querySelector(".wind") as HTMLElement;
  
      cityElement.innerText = "Weather in " + name;
      iconElement.src = "https://openweathermap.org/img/wn/" + weather[0].icon + ".png";
      descriptionElement.innerText = weather[0].description;
      tempElement.innerText = main.temp + "°C";
      humidityElement.innerText = "Humidity: " + main.humidity + "%";
      windElement.innerText = "Wind speed: " + wind.speed + " km/h";
  
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    }
  
    initialize(): void {
      const geoLocButton = document.querySelector(".geoLoc") as HTMLElement;
      geoLocButton.addEventListener("click", () => {
        this.getLocation();
      });
    }
  }
  
  const weatherApp = new WeatherApp();
  weatherApp.initialize();