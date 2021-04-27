const axios = require("axios")

const geoLocation = (location, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.MB_API_KEY}&limit=1`;

    axios.get(url)
        .then(({ data }) => {
            if (data.features.length === 0) {
                // If features array is 0, then no information was gathered for
                // address specified.
                callback("Unable to find location. Try different search!", undefined);
            } else {
                callback(undefined, {
                    latitude: data.features[0].center[1],
                    longitude: data.features[0].center[0],
                    location: data.features[0].place_name,
                });
            }
        })
        .catch(({ isAxiosError }) => {
            if (isAxiosError) {
                callback("Unable to connect to GeoLocation Services!", undefined);
            }
        })
}

module.exports = geoLocation