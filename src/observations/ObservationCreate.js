import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createObservation } from "../utils/api"; 
//import ErrorAlert from "../layout/ErrorAlert";

function ObservationCreate() {
  const history = useHistory();

//useState with the following inital value
  const [observation, setObservation] = useState({
    latitude: "",
    longtitude: "",
    sky_condition: "",
  });


  function cancelHandler() {
    history.push("/");
  }


  function changeHandler({ target: {name,value}}) {
    setObservation(previousObservation => ({
      ...previousObservation,[name]: value,
      // this line (use with useEffect Hook.. save thing diff approach)
    //    const changeHandler = (event) => {
    //     setObservation({...observation,[event.target.name]: event.target.value
    //       });
    //   }
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    //createObservation function from utils/api file  
    createObservation(observation).then(() => {
          history.push("/");
          });
    }

  return (
    <main>
     <h1 className="mb-3">Create Observation</h1>
     {/* <ErrorAlert error = {error}/>  */}
      <form onSubmit={submitHandler} className="mb-4">
        <div className="row mb-3">
         <div className="col-6 form-group">
           <label className="form-label" htmlFor="latitude">
              Latitude
            </label>
            <input
              className="form-control"
              id="latitude"
              name="latitude"
              type="number"
              max="90"
              min="-90"
              value={observation.latitude}
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">Enter a value between -90 and 90.</small>
          </div>
          <div className="col-6">
            <label className="form-label" htmlFor="longitude">
              Longitude
            </label>
            <input
              className="form-control"
              id="longitude"
              name="longitude"
              type="number"
              max="180"
              min="-180"
              value={observation.longitude}
            // This value does
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">Enter a value between -180 and 180.</small>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="cloudCover">
            Sky conditions
          </label>
          <select
            className="form-control"
            id="sky_condition"
            name="sky_condition"
            value={observation.sky_condition}
            onChange={changeHandler}
            required={true}
          >
            <option value="">Select a sky condition option</option>
            <option value="100">Cloudless</option>
            <option value="101">Some clouds</option>
            <option value="102">Cloud covered</option>
            <option value="103">Foggy</option>
            <option value="104">Raining</option>
            <option value="106">Snowing</option>
            <option value="108">Hailing</option>
            <option value="109">Thunderstorms</option>
          </select>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
            {/* Click Submit page will go to homepage - this relates to onSubmit={submitHandler} on line 37************************* */}
          </button>
        </div>
      </form>
    </main>
  );
}

export default ObservationCreate;