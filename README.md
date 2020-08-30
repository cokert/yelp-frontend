# adp-likes-ice-cream

Initialized from https://github.com/cokert/simple-react-full-stack (which is a fork of https://github.com/crsandeep/simple-react-full-stack with extra changes from https://github.com/Mirarsoft/simple-react-full-stack).

## Running locally

You can run with `npm run dev`.  The app will crash and exit immediately if there is not an environment variable named `API_KEY` available to the `node` process.  You can set it via `export API_KEY=<your Yelp api key>` then run `npm run dev` or specify it in line with `API_KEY=<your Yelp api key> npm run dev`.

## Running as a docker image

The built container is available as a docker image as well at `cokert/icecream`.  To run that version, just run this command: 
```
docker run -it -p 80:8080 --rm --env API_KEY=<your Yelp apy key> cokert/icecream
```
Then browse to http://localhost/.  Use `Ctrl+C` to exit the running process.


## Live version

The container is also running on a Digital Ocean VM and the site is viewable at http://icecream.timtom.wtf/.

## Http/https and geolocation

The geolocation API requires requests to come over `https`, so in the live version, the "use corrent location" link doesn't work.  This is functional when running locally, either as a docker container or from source.