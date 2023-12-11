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
    res.render("index.ejs");
});
 

app.post("/submit", async(req, res) => {
    try {
        const geoLocation = await axios.post("http://api.openweathermap.org/geo/1.0/direct?q=Milan&limit=1&APPID=324418ca725ccc0709f41a5cd5d60782", req.body);
        const location = geoLocation.data[0];
        // console.log(location);
        const townLat = JSON.stringify(location.lat);
        const townLon = JSON.stringify(location.lon);
        console.log(req.body)

        const response = await axios.post(`https://api.openweathermap.org/data/3.0/onecall?lat=${townLat}&lon=${townLon}&APPID=163c27430cca35d834799f593ee00040`, req.body);
        const currentWeather = response.data.current.weather;
        console.log(currentWeather[0].main)
        res.render("index.ejs", { main: JSON.stringify(currentWeather[0].main) } )

    } catch(error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
});

