const express = require('express');
const bent = require('bent');
const app = express();

const APIKEY = process.env.API_KEY;

if (!APIKEY) {
    console.log("APIKEY not set.  Set as environment var or start with `APIKEY=<value> npm run dev`. Exiting...");
    process.exit(1);
}
const headers = {
    'Authorization': 'Bearer ' + APIKEY,
};

app.use(express.static('dist'));

const getStream = bent('https://api.yelp.com', headers);

app.get('/api/search', async (req, res) => {
    const {term, location, limit} = req.query;
    try {
        let url = `/v3/businesses/search?term=${term}&sort_by=rating&limit=${limit}`
        if (location.startsWith('coords')) {
            const lat = location.split(' ')[1];
            const long = location.split(' ')[2];
            url += `&latitude=${lat}&longitude=${long}`
        } else {
            url += `&location=${location}`
        }
        let stream = await getStream(url, null, headers);
        const obj = await stream.json();
        res.send(obj);
    } catch (error) {
        console.log(error)
        res.statusCode = error.statusCode;
        res.send({error: error});
    }    
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
