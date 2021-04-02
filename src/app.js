const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoLocation = require("./utils/geo_location");
const forecast = require("./utils/forecast");

/*
__dirname: shows current working directory
__filename: shows absolute path of current working file

Using handlebars for dynamic templates. So, setting view engine to hbs.
view engine: The view engine is responsible for creating HTML from your views. 
             Views are usually some kind of mixup of HTML and a programming language.

res.render(): Renders a view and sends the rendered HTML string to the client.
partials: These files are part of bigger file, that is some repetitive part of file
          which can be reused by other files.

*/

const app = express();
// publicDirectoryPath points to the static files.
const publicDirectoryPath = path.join(__dirname, '../public');
// viewsPath points to the custom views folder that will be set to view engine.
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting handlebar engine.
app.set('view engine', 'hbs');
// Setting views location.
app.set('views', viewsPath);
// Setting partials location.
hbs.registerPartials(partialsPath);
// Setting up static directory.
app.use(express.static(publicDirectoryPath));

const name = 'Sumer Singh';

app.get('', (request, response, next) => {
    response.render('index', {
        title: 'Weather',
        name
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name
    })
})

app.get('/weather', (req, res) => {
    // Checking if URL provides query of address.
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address!'
        })
    }
    
    const address = req.query.address;
    geoLocation(address, (error, geoData) => {
        // First, getting latitude, longitude for specified location.
        if (error) {
            return res.send({
                error
            });
        }
        
        forecast(geoData.latitude, geoData.longitude, (error, data) => {
            // Then, get the weather information for the location.
            if (error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                forecast: data,
                location: geoData.location
            });
        });
    });
})

// The order matters here in the file.
// Such 404 page handler or wild character related link
// should be used carefully or else it might mess up.

// For specific route. '/help/*'
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sumer Singh',
        error: '404 - Help Page Not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        error: '404 - Page Not Found!'
    })
})

app.listen(3000, () => {
    console.log("Server is on port 3000");
})