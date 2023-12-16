import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import moment from "moment";

const app = express();
app.set('view engine', 'ejs');

const port = 3000;

const config1 = "***"
const config2 = "****"
app.use(bodyParser.urlencoded( { extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const today = new Date();
    let day = days[today.getDay()];
    let dayNum = today.getDate();
    let month = months[today.getMonth()]
    let year = today.getFullYear();
    let currentDate = `${day} ${dayNum} ${month} ${year}`;

    res.render("index.ejs", {date: currentDate});
});
 

app.post("/submit", async(req, res) => {
    try {

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const today = new Date();
        let day = days[today.getDay()];
        let dayNum = today.getDate();
        let month = months[today.getMonth()]
        let year = today.getFullYear();
        let currentDate = `${day} ${dayNum} ${month} ${year}`;


        const city = req.body["place"];
        const time = req.body["time"];
        const geoLocation = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&APPID=${config1}`);
        const location = geoLocation.data[0];
        const townLat = JSON.stringify(location.lat);
        const townLon = JSON.stringify(location.lon);


        const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${townLat}&lon=${townLon}&APPID=${config2}&units=metric`);
           
        
        let weather = response.data;
        console.log(weather);
        


        // Variables for current weather
        let currTemp = weather.current.temp;
        let currFeelLike = weather.current.feels_like;
        let currWeather = weather.current.weather[0].main;
        let currWeatherDesc = weather.current.weather[0].description;
        let currHumidity = weather.current.humidity;
        let currClouds = weather.current.clouds;
        let currWeatherIcon = weather.current.weather[0].icon;
        
        // Variables for next 48 hours
        let hourlyTemp1 = weather.hourly[24].temp;
        let hourlyFeelLike1 = weather.hourly[24].feels_like;
        let hourlyWeather1 = weather.hourly[24].weather[0].main;
        let hourlyWeatherDesc1 = weather.hourly[24].weather[0].description;
        let hourlyWeatherHumidity1 = weather.hourly[24].humidity;
        let hourlyWeatherClouds1 = weather.hourly[24].clouds;
        let hourlyWeatherIcon1 = weather.hourly[24].weather[0].icon;
        let timestamp1 = weather.hourly[24].dt;
        let hourlyTime1 = (timestamp1 * 1000);
        let formattedHourlyTime1 = moment(hourlyTime1).format('dddd Do MMMM');

        let hourlyTemp2 = weather.hourly[47].temp;
        let hourlyFeelLike2 = weather.hourly[47].feels_like;
        let hourlyWeather2 = weather.hourly[47].weather[0].main;
        let hourlyWeatherDesc2 = weather.hourly[47].weather[0].description;
        let hourlyWeatherHumidity2 = weather.hourly[47].humidity;
        let hourlyWeatherClouds2 = weather.hourly[47].clouds;
        let hourlyWeatherIcon2 = weather.hourly[47].weather[0].icon;
        let timestamp2 = weather.hourly[47].dt;
        let hourlyTime2 = (timestamp2 * 1000);
        let formattedHourlyTime2 = moment(hourlyTime2).format('dddd Do MMMM');


        // Variables for next 7 days
        let dailyTemp1 = weather.daily[0].temp.day;
        let dailyFeelLike1 = weather.daily[0].feels_like.day;
        let dailyWeather1 = weather.daily[0].weather[0].main;
        let dailyWeatherDesc1 = weather.daily[0].weather[0].description;
        let dailySum1 = weather.daily[0].summary;
        let dailyHum1 = weather.daily[0].humidity;
        let dailyClouds1 = weather.daily[0].clouds;
        let dailyWeatherIcon1 = weather.daily[0].weather[0].icon;
        let timestampDay1 = weather.daily[0].dt;
        let dailyTime1 = (timestampDay1 * 1000);
        let formatteddailyTime1 = moment(dailyTime1).format('dddd Do MMMM');

        let dailyTemp2 = weather.daily[1].temp.day;
        let dailyFeelLike2 = weather.daily[1].feels_like.day;
        let dailyWeather2 = weather.daily[1].weather[0].main;
        let dailyWeatherDesc2 = weather.daily[1].weather[0].description;
        let dailySum2 = weather.daily[1].summary;
        let dailyHum2 = weather.daily[1].humidity;
        let dailyClouds2 = weather.daily[1].clouds;
        let dailyWeatherIcon2 = weather.daily[1].weather[0].icon;
        let timestampDay2 = weather.daily[1].dt;
        let dailyTime2 = (timestampDay2 * 1000);
        let formatteddailyTime2 = moment(dailyTime2).format('dddd Do MMMM');


        let dailyTemp3 = weather.daily[2].temp.day;
        let dailyFeelLike3 = weather.daily[2].feels_like.day;
        let dailyWeather3 = weather.daily[2].weather[0].main;
        let dailyWeatherDesc3 = weather.daily[2].weather[0].description;
        let dailySum3 = weather.daily[2].summary;
        let dailyHum3 = weather.daily[2].humidity;
        let dailyClouds3 = weather.daily[2].clouds;
        let dailyWeatherIcon3 = weather.daily[2].weather[0].icon;
        let timestampDay3 = weather.daily[2].dt;
        let dailyTime3 = (timestampDay3 * 1000);
        let formatteddailyTime3 = moment(dailyTime3).format('dddd Do MMMM');


        let dailyTemp4 = weather.daily[3].temp.day;
        let dailyFeelLike4 = weather.daily[3].feels_like.day;
        let dailyWeather4 = weather.daily[3].weather[0].main;
        let dailyWeatherDesc4 = weather.daily[3].weather[0].description;
        let dailySum4 = weather.daily[3].summary;
        let dailyHum4 = weather.daily[3].humidity;
        let dailyClouds4 = weather.daily[3].clouds;
        let dailyWeatherIcon4 = weather.daily[3].weather[0].icon;
        let timestampDay4 = weather.daily[3].dt;
        let dailyTime4 = (timestampDay4 * 1000);
        let formatteddailyTime4 = moment(dailyTime4).format('dddd Do MMMM');


        let dailyTemp5 = weather.daily[4].temp.day;
        let dailyFeelLike5 = weather.daily[4].feels_like.day;
        let dailyWeather5 = weather.daily[4].weather[0].main;
        let dailyWeatherDesc5 = weather.daily[4].weather[0].description;
        let dailySum5 = weather.daily[4].summary;
        let dailyHum5 = weather.daily[4].humidity;
        let dailyClouds5 = weather.daily[4].clouds;
        let dailyWeatherIcon5 = weather.daily[4].weather[0].icon;
        let timestampDay5 = weather.daily[4].dt;
        let dailyTime5 = (timestampDay5 * 1000);
        let formatteddailyTime5 = moment(dailyTime5).format('dddd Do MMMM');


        let dailyTemp6 = weather.daily[5].temp.day;
        let dailyFeelLike6 = weather.daily[5].feels_like.day;
        let dailyWeather6 = weather.daily[5].weather[0].main;
        let dailyWeatherDesc6 = weather.daily[5].weather[0].description;
        let dailySum6 = weather.daily[5].summary;
        let dailyHum6 = weather.daily[5].humidity;
        let dailyClouds6 = weather.daily[5].clouds;
        let dailyWeatherIcon6 = weather.daily[5].weather[0].icon;
        let timestampDay6 = weather.daily[5].dt;
        let dailyTime6 = (timestampDay6 * 1000);
        let formatteddailyTime6 = moment(dailyTime6).format('dddd Do MMMM');


        let dailyTemp7 = weather.daily[6].temp.day;
        let dailyFeelLike7 = weather.daily[6].feels_like.day;
        let dailyWeather7 = weather.daily[6].weather[0].main;
        let dailyWeatherDesc7 = weather.daily[6].weather[0].description;
        let dailySum7 = weather.daily[6].summary;
        let dailyHum7 = weather.daily[6].humidity;
        let dailyClouds7 = weather.daily[6].clouds;
        let dailyWeatherIcon7 = weather.daily[6].weather[0].icon;
        let timestampDay7 = weather.daily[6].dt;
        let dailyTime7 = (timestampDay7 * 1000);
        let formatteddailyTime7 = moment(dailyTime7).format('dddd Do MMMM');


        res.render("index.ejs", { 
            data: weather,
            currentTemp: JSON.stringify(currTemp), 
            currentFeel: JSON.stringify(currFeelLike), 
            currrentWeath: JSON.stringify(currWeather),
            currentDesc: JSON.stringify(currWeatherDesc),
            currentHum: JSON.stringify(currHumidity),
            currentClouds: JSON.stringify(currClouds),
            currentIcon: JSON.stringify(currWeatherIcon),

            hourTemp1: JSON.stringify(hourlyTemp1),
            hourFeelLike1: JSON.stringify(hourlyFeelLike1),
            hourWeather1: JSON.stringify(hourlyWeather1),
            hourWeatherDesc1: JSON.stringify(hourlyWeatherDesc1),
            hourWeatherHum1: JSON.stringify(hourlyWeatherHumidity1),
            hourWeatherClouds1: JSON.stringify(hourlyWeatherClouds1),
            hourWeatherIcon1: JSON.stringify(hourlyWeatherIcon1),
            formattedHourTime1: JSON.stringify(formattedHourlyTime1),
            
            hourTemp2: JSON.stringify(hourlyTemp2),
            hourFeelLike2: JSON.stringify(hourlyFeelLike2),
            hourWeather2: JSON.stringify(hourlyWeather2),
            hourWeatherDesc2: JSON.stringify(hourlyWeatherDesc2),
            hourWeatherHum2: JSON.stringify(hourlyWeatherHumidity2),
            hourWeatherClouds2: JSON.stringify(hourlyWeatherClouds2),
            hourWeatherIcon2: JSON.stringify(hourlyWeatherIcon2),
            formattedHourTime2: JSON.stringify(formattedHourlyTime2),


            dayTemp1: JSON.stringify(dailyTemp1),
            dayFeelLike1: JSON.stringify(dailyFeelLike1),
            dayWeather1: JSON.stringify(dailyWeather1),
            dayWeatherDesc1: JSON.stringify(dailyWeatherDesc1),
            daySum1: JSON.stringify(dailySum1),
            dayHum1: JSON.stringify(dailyHum1),
            dayClouds1: JSON.stringify(dailyClouds1),
            dayWeatherIcon1: JSON.stringify(dailyWeatherIcon1),
            formatteddayTime1: JSON.stringify(formatteddailyTime1),

    
            dayTemp2: JSON.stringify(dailyTemp2),
            dayFeelLike2: JSON.stringify(dailyFeelLike2),
            dayWeather2: JSON.stringify(dailyWeather2),
            dayWeatherDesc2: JSON.stringify(dailyWeatherDesc2),
            daySum2: JSON.stringify(dailySum2),
            dayHum2: JSON.stringify(dailyHum2),
            dayClouds2: JSON.stringify(dailyClouds2),
            dayWeatherIcon2: JSON.stringify(dailyWeatherIcon2),
            formatteddayTime2: JSON.stringify(formatteddailyTime2),

            dayTemp3: JSON.stringify(dailyTemp3),
            dayFeelLike3: JSON.stringify(dailyFeelLike3),
            dayWeather3: JSON.stringify(dailyWeather3),
            dayWeatherDesc3: JSON.stringify(dailyWeatherDesc3),
            daySum3: JSON.stringify(dailySum3),
            dayHum3: JSON.stringify(dailyHum3),
            dayClouds3: JSON.stringify(dailyClouds3),
            dayWeatherIcon3: JSON.stringify(dailyWeatherIcon3),
            formatteddayTime3: JSON.stringify(formatteddailyTime3),


            dayTemp4: JSON.stringify(dailyTemp4),
            dayFeelLike4: JSON.stringify(dailyFeelLike4),
            dayWeather4: JSON.stringify(dailyWeather4),
            dayWeatherDesc4: JSON.stringify(dailyWeatherDesc4),
            daySum4: JSON.stringify(dailySum4),
            dayHum4: JSON.stringify(dailyHum4),
            dayClouds4: JSON.stringify(dailyClouds4),
            dayWeatherIcon4: JSON.stringify(dailyWeatherIcon4),
            formatteddayTime4: JSON.stringify(formatteddailyTime4),


            dayTemp5: JSON.stringify(dailyTemp5),
            dayFeelLike5: JSON.stringify(dailyFeelLike5),
            dayWeather5: JSON.stringify(dailyWeather5),
            dayWeatherDesc5: JSON.stringify(dailyWeatherDesc5),
            daySum5: JSON.stringify(dailySum5),
            dayHum5: JSON.stringify(dailyHum5),
            dayClouds5: JSON.stringify(dailyClouds5),
            dayWeatherIcon5: JSON.stringify(dailyWeatherIcon5),
            formatteddayTime5: JSON.stringify(formatteddailyTime5),


            dayTemp6: JSON.stringify(dailyTemp6),
            dayFeelLike6: JSON.stringify(dailyFeelLike6),
            dayWeather6: JSON.stringify(dailyWeather6),
            dayWeatherDesc6: JSON.stringify(dailyWeatherDesc6),
            daySum6: JSON.stringify(dailySum6),
            dayHum6: JSON.stringify(dailyHum6),
            dayClouds6: JSON.stringify(dailyClouds6),
            dayWeatherIcon6: JSON.stringify(dailyWeatherIcon6),
            formatteddayTime6: JSON.stringify(formatteddailyTime6),


            dayTemp7: JSON.stringify(dailyTemp7),
            dayFeelLike7: JSON.stringify(dailyFeelLike7),
            dayWeather7: JSON.stringify(dailyWeather7),
            dayWeatherDesc7: JSON.stringify(dailyWeatherDesc7),
            daySum7: JSON.stringify(dailySum7),
            dayHum7: JSON.stringify(dailyHum7),
            dayClouds7: JSON.stringify(dailyClouds7),
            dayWeatherIcon7: JSON.stringify(dailyWeatherIcon7),
            formatteddayTime7: JSON.stringify(formatteddailyTime7),

            date: currentDate,

            city: req.body["place"], time: req.body["time"] } )


    } catch(error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
});

