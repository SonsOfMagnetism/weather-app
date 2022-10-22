// variable for API Key
const API_KEY = 'f0d09276d56504867a7c137548b6f4c9';

// variable for lat and lon values
const BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct?'

// variable for accurate weather
const ACC_URL = 'https://api.openweathermap.org/data/2.5/weather?'

// Cached Element Refrences 
const $location = $("#location")
const $temp = $("#temp")
const $feelsLike = $("#index")
const $desc = $("#desc")
const $form = $("form")
const $button = $("#button")

// Event Listeners
$form.submit((event) => {
    event.preventDefault()
    const textInput = $("input[type=text]").val()
    handleGetData(textInput)
})

// Functions
function capitalize(x)
{
    return x[0].toUpperCase() + x.slice(1);
}

function handleGetData(location) {
    $.ajax(BASE_URL + 'q=' + location + '&appid=' + API_KEY)
    .then((data) => {
        const LAT = data[0].lat
        const LON = data[0].lon
        const URL = `${ACC_URL}lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`
        $.ajax(URL)
        .then((data) => {
            let city = data.name
            let temp = data.main.temp
            let feelsLike = data.main.feels_like
            let desc = data.weather[0].description
            $(".appended").remove()
            $location.append(`<span class="appended">${city}</span>`)
            $temp.append(`<span class="appended">${Math.trunc(temp)}&#8457</span>`)
            $feelsLike.append(`<span class="appended">${Math.trunc(feelsLike)}&#8457</span>`)
            $desc.append(`<span class="appended">${capitalize(desc)}</span>`)
        })
    }) 
}



