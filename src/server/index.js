const express = require('express'),
      bent = require('bent'),
      fs  = require('fs'),
      https = require('https');


const app = express();

let certOptions = undefined;

try {
    certOptions = {
        key: fs.readFileSync('/certs/privkey1.pem').toString(),
        cert: fs.readFileSync('/certs/cert1.pem').toString()
    }
} catch (e) {
    console.log('https certs not found in /certs (or load error), https will be unavailable:', e.message);
}

const APIKEY = process.env.API_KEY;

if (!APIKEY) {
    console.log("API_KEY not set.  Set as environment var or start with `API_KEY=<value> npm run dev`. Exiting...");
    process.exit(1);
}
const headers = {
    'Authorization': 'Bearer ' + APIKEY,
};
const getStream = bent('https://api.yelp.com', headers);

app.use((req, res, next) => {
    if (certOptions) {
        //redirect to secure if https is available
        console.log('middle ware triggered!');
        if (!req.secure ) {
            res.redirect (301, `https://${req.hostname}:443${req.originalUrl}`);
        } else {
            next();
        }
    } else {
        next();
    }
});
app.use(express.static('dist'));

app.get('/api/search', async (req, res) => {
    const {term, location, limit} = req.query;
    try {
        let url = `/v3/businesses/search?term=${term}&sort_by=rating&limit=${limit}`
        if (location.startsWith('coords')) {
            const lat = location.split(' ')[1];
            const long = location.split(' ')[2];
            url += `&latitude=${lat}&longitude=${long}`;
        } else {
            url += `&location=${location}`;
        }
        let stream = await getStream(url, null, headers);
        const obj = await stream.json();
        res.send(obj);
    } catch (error) {
        console.log('api request error', error);
        if (error.statusCode) {
            res.statusCode = error.statusCode;
        } else {
            res.statusCode = 500;
        }
        res.send({error: error});
    }    
});
const port = process.env.PORT || 8080;

if (certOptions) {
    https.createServer(certOptions, app).listen(443, () => console.log(`HTTPS listening on port 443!`));
}

app.listen(port, () => console.log(`Listening on port ${port}!`));
