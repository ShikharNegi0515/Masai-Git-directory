import React, { useReducer, useState } from "react";
import "./index.css";

// Initial State
const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: ""
      }
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: ""
    }
  },
  courses_offered: [],
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "name":
    case "establishment_year":
      return { ...state, [action.type]: action.payload };

    case "address_building":
      return { ...state, address: { ...state.address, building: action.payload } };

    case "address_street":
      return { ...state, address: { ...state.address, street: action.payload } };

    case "address_state":
      return { ...state, address: { ...state.address, state: action.payload } };

    case "address_city_name":
      return {
        ...state,
        address: {
          ...state.address,
          city: { ...state.address.city, name: action.payload }
        }
      };

    case "address_city_locality_pincode":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              pinCode: action.payload
            }
          }
        }
      };

    case "address_city_locality_landmark":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              landmark: action.payload
            }
          }
        }
      };

    case "coordinates_latitude":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            latitude: action.payload
          }
        }
      };

    case "coordinates_longitude":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            longitude: action.payload
          }
        }
      };

    case "add_course":
      return {
        ...state,
        courses_offered: [...state.courses_offered, action.payload]
      };

    case "reset":
      return initialState;

    default:
      throw new Error("invalid action type");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitted, setSubmitted] = useState(false);
  const [courseInput, setCourseInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (type, value) => {
    try {
      dispatch({ type, payload: value });
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setCourseInput("");
    setSubmitted(false);
    setError("");
  };

  const addCourse = () => {
    if (courseInput.trim()) {
      handleChange("add_course", courseInput.trim());
      setCourseInput("");
    }
  };

  return (
    <div className="form-container">
      <h2>College Form (useReducer)</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="College Name" onChange={(e) => handleChange("name", e.target.value)} value={state.name} />
        <input type="number" placeholder="Establishment Year" onChange={(e) => handleChange("establishment_year", e.target.value)} value={state.establishment_year} />
        <input placeholder="Building" onChange={(e) => handleChange("address_building", e.target.value)} value={state.address.building} />
        <input placeholder="Street" onChange={(e) => handleChange("address_street", e.target.value)} value={state.address.street} />
        <input placeholder="City Name" onChange={(e) => handleChange("address_city_name", e.target.value)} value={state.address.city.name} />
        <input placeholder="State" onChange={(e) => handleChange("address_state", e.target.value)} value={state.address.state} />
        <input placeholder="Pincode" onChange={(e) => handleChange("address_city_locality_pincode", e.target.value)} value={state.address.city.locality.pinCode} />
        <input placeholder="Landmark" onChange={(e) => handleChange("address_city_locality_landmark", e.target.value)} value={state.address.city.locality.landmark} />
        <input placeholder="Latitude" onChange={(e) => handleChange("coordinates_latitude", e.target.value)} value={state.address.coordinates.latitude} />
        <input placeholder="Longitude" onChange={(e) => handleChange("coordinates_longitude", e.target.value)} value={state.address.coordinates.longitude} />
        <div className="course-section">
          <input
            placeholder="Add course"
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value)}
          />
          <button type="button" onClick={addCourse}>Add Course</button>
        </div>
        <div className="btn-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {error && <div className="error-box">Error: {error}</div>}

      {submitted && (
        <div className="output">
          <h3>College Data Submitted</h3>
          <p><strong>Name:</strong> {state.name}</p>
          <p><strong>Established:</strong> {state.establishment_year}</p>
          <p><strong>Address:</strong> {state.address.building}, {state.address.street}, {state.address.city.name}, {state.address.state}</p>
          <p><strong>Pincode:</strong> {state.address.city.locality.pinCode}</p>
          <p><strong>Landmark:</strong> {state.address.city.locality.landmark}</p>
          <p><strong>Coordinates:</strong> ({state.address.coordinates.latitude}, {state.address.coordinates.longitude})</p>
          <p><strong>Courses Offered:</strong> {state.courses_offered.join(", ") || "None"}</p>
        </div>
      )}
    </div>
  );
}
