const input = document.getElementById("input");
const form = document.querySelector("form");
const btn = document.getElementById("button");
const main = document.getElementById("main-info");
const loading = document.getElementById("loading");

function getWeather() {
  if (input.value === "") {
    return
  }
  const city = input.value;
  const weatherContainer = document.querySelector(".weather-container");
  if (weatherContainer){
    weatherContainer.remove();
  }
  loading.classList.add("active");

  const getInfo = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=f04a9ad6de818a0435fb8d067c259bf0&units=metric`
  );

  getInfo
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      fetch(`https://openweathermap.org/img/wn/${res.weather[0].icon}@4x.png`)
        .then(res => console.log(res))
      createDom(res);
    })
    .catch((err) => {
      console.log(err)
      loading.classList.remove("active");
      const weather = document.createElement('div');
      const msg = document.createElement("h1");
      msg.textContent = "Please select a valid city";
      msg.classList.add("error-msg");
      weather.classList.add("weather-container");
  
      weather.appendChild(msg);
      main.appendChild(weather);});
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13 && input.value != "") {
    getWeather();
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
})

btn.addEventListener("click", getWeather);


function createDom(obj) {

  loading.classList.remove("active");
  console.log(obj.cod)

  if (obj.cod >= "400") {
    console.log("NOOOOOOOOOO");
    const weather = document.createElement('div');
    const msg = document.createElement("h1");
    msg.textContent = obj.message;
    weather.classList.add("weather-container");

    weather.appendChild(msg);
    main.appendChild(weather);
    return
  }

  const title = document.createElement("div");
  const name = document.createElement("h1");
  console.log(obj.name + ", " + countryList[obj.sys.country]); //logs country name + city

  // create html elements
  const weather = document.createElement('div');

  const weatherInfoDiv = document.createElement("div");
    const description = document.createElement('p');
    const weatherMain = document.createElement('p');
    // const weatherIcon = document.createElement('img');

  const tempDiv = document.createElement("div");
  const tempInfoDiv = document.createElement('div');
  const tempIconDiv = document.createElement('div');
    // const tempTitle = document.createElement('h2');    
    const temp = document.createElement('h2');
    // const tempFeel = document.createElement('p');
    const tempMinMax = document.createElement('p');
    const tempIcon = document.createElement('i');
    

  const windDiv = document.createElement('div');
  const windIconDiv = document.createElement('div');
  const windInfoDiv = document.createElement('div');
    const wind = document.createElement('h2');
    const windIcon = document.createElement('i');

  // add classes
  weather.classList.add("weather-container");
  title.classList.add("title-container");
  weatherInfoDiv.classList.add("info-container");
  tempDiv.classList.add("temp-container");
  tempInfoDiv.classList.add("temp-info-div");
  tempIconDiv.classList.add("temp-icon-div");
  windInfoDiv.classList.add("wind-info-div");
  windIconDiv.classList.add("wind-icon-div");
  tempIcon.className = "bi bi-thermometer-half";
  windIcon.className = "bi bi-wind";
  windDiv.classList.add("wind-container");
  // add content
  // tempTitle.textContent = "Temp";
  // windTitle.textContent = "Wind";

  name.textContent = obj.name + ", " + countryList[obj.sys.country]; //logs country name + city

  description.textContent = obj.weather[0].description;
  // weatherMain.textContent = obj.weather[0].main;
  weatherInfoDiv.setAttribute( // add image to background by inline-css
    "style", `background: url('https://openweathermap.org/img/wn/${obj.weather[0].icon}@4x.png');
    background-repeat: no-repeat;
    background-size: cover;`);

  temp.textContent = obj.main.temp + "°";
  tempMinMax.textContent = `${obj.main.temp_min}°/${obj.main.temp_max}°`;
  // tempFeel.textContent = obj.main.feels_like + "°";
  // tempMin.textContent = obj.main.temp_min + "°";
  // tempMax.textContent = obj.main.temp_max + "°";

  wind.textContent = obj.wind.speed + "m/h";
  // windDeg.textContent = obj.wind.deg;
  // create dom and append to #main
  // title
  title.appendChild(name);
  // info
  weatherInfoDiv.appendChild(description);
  // weatherInfoDiv.appendChild(weatherMain);
  // weatherInfoDiv.appendChild(weatherIcon);
  // temp
  tempInfoDiv.appendChild(temp);
  tempInfoDiv.appendChild(tempMinMax);
  tempIconDiv.appendChild(tempIcon);
  tempDiv.appendChild(tempInfoDiv);
  tempDiv.appendChild(tempIconDiv);
  // tempDiv.appendChild(tempTitle);
  // tempDiv.appendChild(temp);
  // tempDiv.appendChild(tempFeel);
  // tempDiv.appendChild(tempMin);
  // tempDiv.appendChild(tempMax);
  // wind
  windInfoDiv.appendChild(wind);
  windIconDiv.appendChild(windIcon);
  windDiv.appendChild(windInfoDiv);
  windDiv.appendChild(windIconDiv);
  // append to main
  weather.appendChild(title);
  weather.appendChild(weatherInfoDiv);
  weather.appendChild(tempDiv);
  weather.appendChild(windDiv);
  main.appendChild(weather);
}

function noCity (obj) {
  if (obj.cod == "404") {
    console.log("We have an error");
    return true
  } else {
    console.log("No problems found");
    return false
  }
}

// api: f04a9ad6de818a0435fb8d067c259bf0
const countryList = {
  // from https://gist.github.com/incredimike/1469814
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas (the)",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia (Plurinational State of)",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory (the)",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  CV: "Cabo Verde",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  KY: "Cayman Islands (the)",
  CF: "Central African Republic (the)",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands (the)",
  CO: "Colombia",
  KM: "Comoros (the)",
  CD: "Congo (the Democratic Republic of the)",
  CG: "Congo (the)",
  CK: "Cook Islands (the)",
  CR: "Costa Rica",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Curaçao",
  CY: "Cyprus",
  CZ: "Czechia",
  CI: "Côte d'Ivoire",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic (the)",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  SZ: "Eswatini",
  ET: "Ethiopia",
  FK: "Falkland Islands (the) [Malvinas]",
  FO: "Faroe Islands (the)",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories (the)",
  GA: "Gabon",
  GM: "Gambia (the)",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island and McDonald Islands",
  VA: "Holy See (the)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran (Islamic Republic of)",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Korea (the Democratic People's Republic of)",
  KR: "Korea (the Republic of)",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic (the)",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands (the)",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia (Federated States of)",
  MD: "Moldova (the Republic of)",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands (the)",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger (the)",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands (the)",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestine, State of",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines (the)",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  MK: "Republic of North Macedonia",
  RO: "Romania",
  RU: "Russian Federation (the)",
  RW: "Rwanda",
  RE: "Réunion",
  BL: "Saint Barthélemy",
  SH: "Saint Helena, Ascension and Tristan da Cunha",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin (French part)",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and the Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten (Dutch part)",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan (the)",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania, United Republic of",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands (the)",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates (the)",
  GB: "United Kingdom of Great Britain and Northern Ireland (the)",
  UM: "United States Minor Outlying Islands (the)",
  US: "United States of America (the)",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela (Bolivarian Republic of)",
  VN: "Viet Nam",
  VG: "Virgin Islands (British)",
  VI: "Virgin Islands (U.S.)",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
  AX: "Åland Islands",
};
