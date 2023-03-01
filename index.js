const input = document.getElementById("input");
const btn = document.getElementById("button");

function getWeather () {
    const country = input.value;

const getInfo = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&APPID=f04a9ad6de818a0435fb8d067c259bf0&units=metric`);

getInfo
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(error))

}
btn.addEventListener("click", getWeather)
// api: f04a9ad6de818a0435fb8d067c259bf0