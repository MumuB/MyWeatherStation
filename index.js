import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.set('view engine', 'ejs');

const port = 3000;

const config1 = "APPID=324418ca725ccc0709f41a5cd5d60782"
const config2 = "APPID=163c27430cca35d834799f593ee00040"
app.use(bodyParser.urlencoded( { extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const today = new Date();
    let day = days[today.getDay()];
    let month = months[today.getMonth()]
    let year = today.getFullYear();
    let currentDate = `${day} ${month} ${year}`;

    res.render("index.ejs", {date: currentDate, day: day});
});
 

app.post("/submit", async(req, res) => {
    try {
        const city = req.body["place"];
        const time = req.body["time"];
        const geoLocation = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&APPID=324418ca725ccc0709f41a5cd5d60782`);
        const location = geoLocation.data[0];
        const townLat = JSON.stringify(location.lat);
        const townLon = JSON.stringify(location.lon);


        const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${townLat}&lon=${townLon}&APPID=163c27430cca35d834799f593ee00040&units=metric`);
        
        let weather = response.data;


        // Variables for current weather
        let currTemp = response.data.current.temp;
        let currFeelLike = response.data.current.feels_like;
        let currWeather = response.data.current.weather[0].main;
        let currWeatherDesc = response.data.current.weather[0].description;
        let currWeatherIcon = response.data.current.weather[0].icon;
        
        // Variables for next 48 hours
        let hourlyTemp1 = response.data.hourly[24].temp;
        let hourlyFeelLike1 = response.data.hourly[24].feels_like;
        let hourlyWeather1 = response.data.hourly[24].weather[0].main;
        let hourlyWeatherDesc1 = response.data.hourly[24].weather[0].description;
        let hourlyWeatherIcon1 = response.data.hourly[24].weather[0].icon;

        let hourlyTemp2 = response.data.hourly[47].temp;
        let hourlyFeelLike2 = response.data.hourly[47].feels_like;
        let hourlyWeather2 = response.data.hourly[47].weather[0].main;
        let hourlyWeatherDesc2 = response.data.hourly[47].weather[0].description;
        let hourlyWeatherIcon2 = response.data.hourly[47].weather[0].icon;

        // Variables for next 7 days
        let dailyTemp1 = response.data.daily[0].temp.day;
        let dailyFeelLike1 = response.data.daily[0].feels_like.day;
        let dailyWeather1 = response.data.daily[0].weather[0].main;
        let dailyWeatherDesc1 = response.data.daily[0].weather[0].description;
        let dailyWeatherIcon1 = response.data.daily[0].weather[0].icon;

        let dailyTemp2 = response.data.daily[1].temp.day;
        let dailyFeelLike2 = response.data.daily[1].feels_like.day;
        let dailyWeather2 = response.data.daily[1].weather[0].main;
        let dailyWeatherDesc2 = response.data.daily[1].weather[0].description;
        let dailyWeatherIcon2 = response.data.daily[1].weather[0].icon;

        let dailyTemp3 = response.data.daily[2].temp.day;
        let dailyFeelLike3 = response.data.daily[2].feels_like.day;
        let dailyWeather3 = response.data.daily[2].weather[0].main;
        let dailyWeatherDesc3 = response.data.daily[2].weather[0].description;
        let dailyWeatherIcon3 = response.data.daily[2].weather[0].icon;

        let dailyTemp4 = response.data.daily[3].temp.day;
        let dailyFeelLike4 = response.data.daily[3].feels_like.day;
        let dailyWeather4 = response.data.daily[3].weather[0].main;
        let dailyWeatherDesc4 = response.data.daily[3].weather[0].description;
        let dailyWeatherIcon4 = response.data.daily[3].weather[0].icon;

        let dailyTemp5 = response.data.daily[4].temp.day;
        let dailyFeelLike5 = response.data.daily[4].feels_like.day;
        let dailyWeather5 = response.data.daily[4].weather[0].main;
        let dailyWeatherDesc5 = response.data.daily[4].weather[0].description;
        let dailyWeatherIcon5 = response.data.daily[4].weather[0].icon;

        let dailyTemp6 = response.data.daily[5].temp.day;
        let dailyFeelLike6 = response.data.daily[5].feels_like.day;
        let dailyWeather6 = response.data.daily[5].weather[0].main;
        let dailyWeatherDesc6 = response.data.daily[5].weather[0].description;
        let dailyWeatherIcon6 = response.data.daily[5].weather[0].icon;

        let dailyTemp7 = response.data.daily[6].temp.day;
        let dailyFeelLike7 = response.data.daily[6].feels_like.day;
        let dailyWeather7 = response.data.daily[6].weather[0].main;
        let dailyWeatherDesc7 = response.data.daily[6].weather[0].description;
        let dailyWeatherIcon7 = response.data.daily[6].weather[0].icon;

        res.render("index.ejs", { 
            data: weather,
            currentTemp: JSON.stringify(currTemp), 
            currentFeel: JSON.stringify(currFeelLike), 
            currrentWeath: JSON.stringify(currWeather),
            currentDesc: JSON.stringify(currWeatherDesc),
            currentIcon: JSON.stringify(currWeatherIcon),

            hourTemp1: JSON.stringify(hourlyTemp1),
            hourFeelLike1: JSON.stringify(hourlyFeelLike1),
            hourWeather1: JSON.stringify(hourlyWeather1),
            hourWeatherDesc1: JSON.stringify(hourlyWeatherDesc1),
            hourWeatherIcon1: JSON.stringify(hourlyWeatherIcon1),
            
            hourTemp2: JSON.stringify(hourlyTemp2),
            hourFeelLike2: JSON.stringify(hourlyFeelLike2),
            hourWeather2: JSON.stringify(hourlyWeather2),
            hourWeatherDesc2: JSON.stringify(hourlyWeatherDesc2),
            hourWeatherIcon2: JSON.stringify(hourlyWeatherIcon2),

            dayTemp1: JSON.stringify(dailyTemp1),
            dayFeelLike1: JSON.stringify(dailyFeelLike1),
            dayWeather1: JSON.stringify(dailyWeather1),
            dayWeatherDesc1: JSON.stringify(dailyWeatherDesc1),
            dayWeatherIcon1: JSON.stringify(dailyWeatherIcon1),
    
            dayTemp2: JSON.stringify(dailyTemp2),
            dayFeelLike2: JSON.stringify(dailyFeelLike2),
            dayWeather2: JSON.stringify(dailyWeather2),
            dayWeatherDesc2: JSON.stringify(dailyWeatherDesc2),
            dayWeatherIcon2: JSON.stringify(dailyWeatherIcon2),

            dayTemp3: JSON.stringify(dailyTemp3),
            dayFeelLike3: JSON.stringify(dailyFeelLike3),
            dayWeather3: JSON.stringify(dailyWeather3),
            dayWeatherDesc3: JSON.stringify(dailyWeatherDesc3),
            dayWeatherIcon3: JSON.stringify(dailyWeatherIcon3),

            dayTemp4: JSON.stringify(dailyTemp4),
            dayFeelLike4: JSON.stringify(dailyFeelLike4),
            dayWeather4: JSON.stringify(dailyWeather4),
            dayWeatherDesc4: JSON.stringify(dailyWeatherDesc4),
            dayWeatherIcon4: JSON.stringify(dailyWeatherIcon4),

            dayTemp5: JSON.stringify(dailyTemp5),
            dayFeelLike5: JSON.stringify(dailyFeelLike5),
            dayWeather5: JSON.stringify(dailyWeather5),
            dayWeatherDesc5: JSON.stringify(dailyWeatherDesc5),
            dayWeatherIcon5: JSON.stringify(dailyWeatherIcon5),

            dayTemp6: JSON.stringify(dailyTemp6),
            dayFeelLike6: JSON.stringify(dailyFeelLike6),
            dayWeather6: JSON.stringify(dailyWeather6),
            dayWeatherDesc6: JSON.stringify(dailyWeatherDesc6),
            dayWeatherIcon6: JSON.stringify(dailyWeatherIcon6),

            dayTemp7: JSON.stringify(dailyTemp7),
            dayFeelLike7: JSON.stringify(dailyFeelLike7),
            dayWeather7: JSON.stringify(dailyWeather7),
            dayWeatherDesc7: JSON.stringify(dailyWeatherDesc7),
            dayWeatherIcon7: JSON.stringify(dailyWeatherIcon7),

            day: day,
            date: currentDate,

            city: req.body["place"], time: req.body["time"] } )


    } catch(error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
});

