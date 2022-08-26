import React, { Fragment, useState, useEffect } from "react";
// import { toast } from "react-toastify";
import matcha from "../apis/Matcha";
import Header from "../components/Header";


/* ============ ADD DETAILS SECTION ============ */


const AddDetails = ({ setAuth }) => {

  const [photos, setPhoto] = useState([[]]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        matcha.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await matcha.get("/users/get/profile");



        const response3 = await matcha.get(
          "/photo/picture/" + response.data.data.users.id.toString()
        );
        setPhoto(response3.data.data.users);


      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);




  const [inputs, setInputs] = useState({
    preference: "",
    gender: "",
    location: "",
    birthdate: "",
    bio: "",
  });

  const { preference, gender, location, birthdate, bio } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await matcha.post("/users/users/adddetail", {
        preference,
        gender,
        latitude,
        longitude,
        birthdate,
        bio,
      });
      console.log(response);
      const token = localStorage.getItem("token");
      const showToken = matcha.defaults.headers.common["Authorization"] = "Bearer " + token;
      console.log(showToken, 'HEREEEEEEEEEE!!!!!!');
      const response2 = await matcha.get("/users/get/profile");
      console.log(response2.data.data.users.id);



    } catch (err) {
      console.error(err.message);
    }
  };


  /* ============ ADD COORDINATES SECTION ============ */

  const [latitude, setLat] = useState(null);

  const [longitude, setLng] = useState(null);

  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);

          setLat(position.coords.latitude);

          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };


  /* ============ ADD IMAGES SECTION ============ */

  const [selectedImage, setSelectedImage] = useState();

  const changeHandler = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const token = localStorage.getItem("token");
    const showToken = matcha.defaults.headers.common["Authorization"] = "Bearer " + token;
    console.log(showToken, 'HEREEEEEEEEEE!!!!!!');
    const response2 = await matcha.get("/users/get/profile");

    formData.append("profileImg", selectedImage);
    try {
      const res = await matcha.post("/photo/upload", formData, { user: response2.data.data.users.id });
      console.log(res);

    } catch (ex) {
      console.log(ex);
    }
  };



  /* ============ DELETE IMAGES SECTION ============ */


  const removeImage = async (event) => {
    const token = localStorage.getItem("token");
    matcha.defaults.headers.common["Authorization"] = "Bearer " + token;
    const response = await matcha.get("/users/get/profile");


    const response2 = await matcha.get(
      "/photo/picture/" + response.data.data.users.id.toString()
    );
    setPhoto(response2.data.data.users);

    const response3 = await matcha.get(
      "/photo/deleteImage/" + event.target.value
    );
    // setPhoto({photos, [event.target.name]: event.target.value});

      console.log(response3)

  }


  return (
    <Fragment>
      <Header />
      {/* <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        {...otherPropsFromToastConfigure}
      /> */}
      {/* ============ ADD DETAILS SECTION ============ */}

      <h1 className="mt-5 text-center">Add details</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="preference"
          value={preference}
          placeholder="preference"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="gender"
          value={gender}
          placeholder="gender"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="location"
          value={location}
          placeholder="location"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <div className="LocationTest">
          <button onClick={getLocation}>Get Location</button>

          <p>{status}</p>

          {latitude && <p>Latitude: {latitude}</p>}

          {longitude && <p>Longitude: {longitude}</p>}
        </div>
        <input
          type="date"
          name="birthdate"
          value={birthdate}
          placeholder="birthdate"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="bio"
          value={bio}
          placeholder="bio"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      {/* ============ UPLOAD IMAGE SECTION ============ */}
      <div>
        <h1>Upload Image </h1>
        {selectedImage && (
          <div>
            <img
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <br />

        <br />
        <input type="file" name="myImage" onChange={changeHandler} />
        <br />

        <button onClick={(e) =>uploadFile(e)}>Upload</button>
        <br />

    </div>
    <div>
      {/* <p>
        picture<img height="300" alt="img" src={photos && photos.uri}></img>

      </p> */}
        <div>
          <div>
          <br />

            {photos &&
              photos.map((photo, value) => {
                return (
                  <div key={value}>
                    <img height="245em" alt="" src={photo.uri}></img>
                    <div>{photo.id}</div>
                    {/* <input
                      type="checkbox"
                      value={check}
                      onClick={handleChange}
                      id="guys"
                      name="guys"
                    /> */}
                    <button value={photo.id} onClick={removeImage}>Remove</button>
                  </div>
                );
              })}
          </div>
        </div>
    </div>
    </Fragment>
  );
};

export default AddDetails;
