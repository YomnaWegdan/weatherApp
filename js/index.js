//  https://ipgeolocation.abstractapi.com/v1?ip_adress=156.197.17.137
//     https://api.weatherapi.com/v1/forecast.json?key=b3ef5e12168144d1ab6104833233012&q=cairo&days=3



function getDayNameByDate(dateString) {
    const date = new Date(dateString);
    const dayIndex = date.getDay();
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    return daysOfWeek[dayIndex];
  }

async function getData(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b3ef5e12168144d1ab6104833233012&q=${city}&days=3`);
    let finalData = await response.json();
    console.log(finalData);

    let box = '';
    for (const element of finalData.forecast.forecastday) {
      console.log(element);
      console.log(element.day.condition.text);

      box += `
      <div class=" col-xl-4 col-lg-6 col-md-12 ">
        <div class="card w-100 m-auto text-card text-center p-5 rounded-4  shadow-lg bg-card border border-1 border-white">
        <div class = 'd-flex justify-content-between bg-item py-2 px-5'>
            <h5>${element.date}</h5>
            <h5>${getDayNameByDate(element.date)}</h5>
        </div>
          <div class="weather">
          <h2 class="city fs-1 mt-3">${finalData.location.name}</h2>
            <img src="${element.day.condition.icon}" alt="rain-img" class="weather-icon w-20" />
            <p class="condition-text bg-item py-3 w-auto ">${element.day.condition.text}</p>
            <h1 class="temp fs-70 ">${Math.round(element.day.avgtemp_c)}°C</h1>
            <div class='d-flex'></div>
            <span class="temp fs-70 ">Max: ${Math.round(element.day.maxtemp_c)}°C , </span>
            <span class="temp fs-70 "> Min: ${Math.round(element.day.mintemp_c)}°C</span>
            </div>
            <div class="details mt-5 d-flex justify-content-between align-items-center">
              <div class="col-lg-6 d-flex align-items-center justify-content-center bg-item pt-3 ">
                <img src="./images/icon-umberella@2x.png" alt="humidity-img" class="w-25" />
                <div class="ms-2">
                  <p class="humidity">${element.day.avghumidity} %</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center justify-content-center bg-item ms-2 pt-3">
                <img src="./images/icon-wind@2x.png" alt="wind-img" class="w-25" />
                <div class=" ms-2">
                  <p class="wind">${element.day.maxwind_kph} Km/h</p> 
                  <p>Wind Speed</p> 
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        `;
    }
  
    document.querySelector('.Row').innerHTML = box;
  }
  
  let search = document.getElementById('search-input');
  let searchBtn = document.getElementById('searchBtn');
  
  searchBtn.addEventListener('click', function (e) {
    getData(search.value);
    clearSearch();
  });

  const clearSearch = () =>{
    search.value='';
  }


  async function getLocation() {
    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=c9f8c8f04bca494489255bee4dda2533&ip_address=156.197.17.137`);
    let finalLocation = await response.json();
    let city = finalLocation.city;
    console.log('finalLocation' ,city);
    getData(city)
  }
getLocation()


