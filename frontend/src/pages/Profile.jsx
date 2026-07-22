import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Profile.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";


function Profile() {

  const username = localStorage.getItem("username");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });



  useEffect(() => {

    if (!username) {
      setLoading(false);
      return;
    }


    api
      .get(
        "accounts/profile/",
        {
          headers: {
            Authorization:
              `Token ${localStorage.getItem("token")}`,
          },
        }
      )

      .then((response) => {

        setProfile(response.data);

      })

      .catch((error) => {

        console.error(
          "Profile Error:",
          error
        );

      })

      .finally(() => {

        setLoading(false);

      });


  }, [username]);




  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]: e.target.value,

    });

  };





  const handleUpdate = async () => {


    setUpdating(true);


    try {


      const response = await api.put(

        "accounts/profile/update/",

        {
          email: profile.email,

          phone: profile.phone,

          address: profile.address,
        },

        {
          headers: {

            Authorization:
              `Token ${localStorage.getItem("token")}`,

          },

        }

      );


      toast.success(response.data.message);


    }


    catch(error) {


      console.error(error);


      toast.error("Profile Update Failed");


    }


    finally {


      setUpdating(false);


    }


  };





  if (loading) {

    return <LoadingSpinner />;

  }





  return (

    <div className="profile-container">


      <h1>
        👤 My Profile
      </h1>



      <div className="profile-card">



        <label>
          Username
        </label>


        <input

          type="text"

          value={
            profile.username || username
          }

          disabled

        />





        <label>
          Email
        </label>


        <input

          type="email"

          name="email"

          value={
            profile.email || ""
          }

          onChange={handleChange}

        />





        <label>
          Phone
        </label>


        <input

          type="text"

          name="phone"

          value={
            profile.phone || ""
          }

          onChange={handleChange}

        />





        <label>
          Address
        </label>


        <textarea

          name="address"

          value={
            profile.address || ""
          }

          onChange={handleChange}

        />





        <button
          onClick={handleUpdate}
          disabled={updating}
        >

          {
            updating
              ? "Updating..."
              : "Update Profile"
          }

        </button>



      </div>


    </div>

  );

}


export default Profile;