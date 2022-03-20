import React, { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import publicIp from "public-ip";

// bootstrap things
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Form,
  FormLabel,
} from "react-bootstrap";

//custom components
import Display from "./components/display.js";
import Error from "./components/error.js";
import "./app.css";
import locateIcon from "./location.png";

const debounceTimeout = 500;

async function doSearch(searchParams) {
  const { term, location, limit } = searchParams;

  try {
    let res = await fetch(
      `/api/search?term=${term}&location=${location}&limit=${limit}`
    );
    let data = await res.json();
    return { data: data };
  } catch (e) {
    return {};
  }
}

const logerr = (err, msg) => {
  if (!!msg) {
    console.error(msg, err);
  } else {
    console.error(err);
  }
};

export default function App() {
  const [data, setData] = useState({});
  const [searchParams, setSearchParams] = useState({
    term: "Burger",
    location: undefined,
    limit: 5,
  });
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch(`https://ipapi.co/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("geores", data);
        const location = `${data?.city}, ${data?.region}`;
        setSearchParams({
          ...searchParams,
          location,
        });
        locateMe();
      })
      .catch(logerr);
  }, []);

  useEffect(() => {
    if (!!searchParams.location) {
      const params = { ...searchParams };
      if (!!location) {
        params.location = location;
      }
      doSearch(params).then((res) => setData(res.data));
    }
  }, [searchParams, location]);

  //this function sets the search parameter specified in name and perists the others.  since search data is one object
  //with one set function, they have to be set together.  this function also allows us to perform some validation,
  //like limiting the number of rows returned to 50 to avoid a 400 from the yelp API and also set the data to null
  //so "Loading.." is shown while the search is performed.
  function setValue(name, value) {
    let vals = {
      term: searchParams.term,
      location: searchParams.location,
      limit: searchParams.limit,
    };
    vals[name] = value;
    setData(null);
    if (name === "limit" && value > 51) {
      //api has limit of 50
      vals["limit"] = 50;
    }
    if (name === "location") {
      setLocation(undefined);
    }
    setSearchParams(vals);
  }

  const updateLocation = (location) => {
    setLocation(location);
    setSearchParams({
      ...searchParams,
      location: "Your Current Location",
    });
  };

  function locateMe() {
    console.log("locating...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        let location =
          "coords: " +
          position.coords.latitude +
          " " +
          position.coords.longitude;
        updateLocation(location);
      },
      (error) => console.log(`error getting location: ${error}`)
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="pageHeader">Yelp Results</h1>
        </Col>
      </Row>
      <Form>
        <Row className="mb-3">
          <Col>
            <FormLabel>Search</FormLabel>
            <DebounceInput
              className="form-control"
              debounceTimeout={debounceTimeout}
              value={searchParams.term}
              onChange={(e) => setValue("term", e.target.value)}
            ></DebounceInput>
          </Col>
          <Col>
            <FormLabel>
              Location
              <a onClick={locateMe}>
                <img
                  src={locateIcon}
                  className="img-fluid"
                  style={{ height: "20px" }}
                  alt="Locate Me"
                />
                <small>Click to use current location</small>
              </a>
            </FormLabel>
            <DebounceInput
              className="form-control"
              debounceTimeout={debounceTimeout}
              value={searchParams.location}
              onChange={(e) => setValue("location", e.target.value)}
            ></DebounceInput>
          </Col>
          <Col>
            <FormLabel>
              Results to return <small>The max is 50</small>
            </FormLabel>
            <DebounceInput
              className="form-control"
              debounceTimeout={debounceTimeout}
              value={searchParams.limit}
              onChange={(e) => setValue("limit", e.target.value)}
            ></DebounceInput>
          </Col>
        </Row>
      </Form>
      {data ? (
        <>
          {data.businesses && <Display data={data} search={searchParams} />}
          {data.error && <Error error={data.error} />}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
}
