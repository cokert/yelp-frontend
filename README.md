# adp-likes-ice-cream

Initialized from https://github.com/cokert/simple-react-full-stack (which is a fork of https://github.com/crsandeep/simple-react-full-stack with extra changes from https://github.com/Mirarsoft/simple-react-full-stack).

## Running locally

After cloning this repo, you need to run `npm install`.  You can then run with `npm run dev`, at which point the app/node server will likely crash.  It looks for an `API_KEY` variable in the node process's environment and exits immediately if its not there or is blank.  You can set it via `export API_KEY=<your Yelp api key>` then run `npm run dev` or specify it in line with `API_KEY=<your Yelp api key> npm run dev`.

## Running as a docker image

The built container is available as a docker image as well at `cokert/icecream`.  To run that version, just run this command: 
```
docker run -it -p 80:8080 --rm --env API_KEY=<your Yelp apy key> cokert/icecream
```
Then browse to http://localhost/.  Use `Ctrl+C` to exit the running process.


## Live version

The container is also running on a Digital Ocean VM and the site is viewable at http://icecream.timtom.wtf/.

The full command (minus the api key) to start the docker image on the server is:
```
docker run -d --restart unless-stopped -p 443:443 --name icecream -p 80:8080 --env API_KEY=<Yelp api key> -v /etc/letsencrypt/archive/icecream.timtom.wtf:/certs:ro cokert/icecream
```
The documentation for Let's Encrypt/Cerbot says the certs live at /etc/letsencrypt/live/icecream.timtom.wtf, but the files there are symlinks -- they actually live in the folder listed in the volume parameter above.  Mounting a folder with symlinks causes the container to get file not found errors.  Hence, mounting the folder where they actually live and using their real names in `server.js` to read them.

## Http/https and geolocation

~~The geolocation API requires requests to come over `https`, so in the live version, the "use corrent location" link doesn't work.  This is functional when running locally, either as a docker container or from source.~~
The server is now configured with a Let's Encrypt cert and middleware is in place to redirect to https when the certs are found.
