import { useEffect, useState } from "react";
import { listObservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function Home() {
  const [observations,setObservations] = useState([])
  const [error, setError] = useState(null) 
  // what is useState(null) - depends on the property of ErrorAlert Message
  
  useEffect(() => {
        const abortController = new AbortController();
        listObservations(abortController.signal)
          .then(setObservations)
          .catch(setError);
        return () => abortController.abort();
      }, []);
  

   const tableRows = observations.map(observation => (
    <tr key ={observation.observation_id}> 
    {/* this key = part & the following props from where passed********** */}
      <th scope="row">{observation.observation_id} </th>
      <td>{observation.latitude}</td>
      <td>{observation.longitude}</td>
      <td>{observation.sky_condition}</td>
      <td>{observation.created_at}</td>
    </tr>
   ));
  

  return (
    <main>
      <h1>Home</h1>
      <ErrorAlert error={error} /> 
      {/* pass this error prop to ErrorAlert */}
      <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Latitude</th>
          <th scope="col">Longitude</th>
          <th scope="col">Sky Condition</th>
          <th scope="col">Created</th>
        </tr>
        </thead>
        <tbody>
        {tableRows} 
        {/* this is the const tableRows in above */}
        </tbody>
      </table>
    </main>
  );
}

export default Home;