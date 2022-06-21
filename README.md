yelp front end

Initialized from https://github.com/cokert/simple-react-full-stack (which is a fork of https://github.com/crsandeep/simple-react-full-stack with extra changes from https://github.com/Mirarsoft/simple-react-full-stack).

## Running locally

After cloning this repo, you need to run `npm install`.  You can then run with `npm run dev`, at which point the app/node server will likely crash.  It looks for an `API_KEY` variable in the node process's environment and exits immediately if its not there or is blank.  You can set it via `export API_KEY=<your Yelp api key>` then run `npm run dev` or specify it in line with `API_KEY=<your Yelp api key> npm run dev`.

## Running as a docker image

The built container is available as a docker image as well at `cokert/yelp`.  To run that version, just run this command:
```
docker run -it -p 80:8080 --rm --env API_KEY=<your Yelp apy key> cokert/yelp
```
Then browse to http://localhost/.  Use `Ctrl+C` to exit the running process.


## Live version

The container is also running on a Digital Ocean VM and the site is viewable at http://yelp.timtom.wtf/.

The full command (minus the api key) to start the docker image on the server is:
```
docker run -d --restart unless-stopped -p 443:443 --name yelp -p 80:8080 --env SITE_NAME=<site name> --env API_KEY=<Yelp api key> -v /etc/letsencrypt/:/certs:ro cokert/yelp
```
The site name is used to load the proper cert from let's encrypt/certbot's store (a previous version of this repo mounted the letsencrypt folder in a way that broke the symlinks which is now fixed).  For auto-renewal to work you need to put scripts in /etc/letsencrypt/rewnewal-hooks/pre and /etc/letsencrypt/renewal-hooks/post to stop/start the container.  They can just contain `docker stop yelp` and `docker start yelp`.  The names don't really matter, but they must be executable to be run.

## Http/https and geolocation

~~The geolocation API requires requests to come over `https`, so in the live version, the "use corrent location" link doesn't work.  This is functional when running locally, either as a docker container or from source.~~
The server is now configured with a Let's Encrypt cert and middleware is in place to redirect to https when the certs are found.
