/** @format */

// Signup.js
import React, { useEffect, useState } from "react";
import { TextField, Button, Avatar } from "@mui/material";
import Buttons from "../../shared/Buttons/Buttons";
import { getLocalStorage, showErrorToast } from "../../common/helpers/Utils";
import { actionSignUpNewUser } from "../../common/redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Image from "../../shared/Image";
import sideLogo from "../../assets/images/smartdoor-logo.svg";

const Signup = () => {
   const [formData, setFormData] = useState({
      fullName: "",
      profileImage: null,
   });

   const [imagePreview, setImagePreview] = useState(null);
   const userData = getLocalStorage("authData");
   const history = useHistory();
   console.log(userData);
   useEffect(() => {
      console.log(userData);
   }, []);

   useEffect(() => {
      const handlePopState = (event) => {
         window.history.pushState(null, "", window.location.href);
      };

      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);

      return () => {
         window.removeEventListener("popstate", handlePopState);
      };
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   // const handleImageChange = (e) => {
   //    const file = e.target.files[0];
   //    setFormData((prev) => ({ ...prev, profileImage: file }));

   //    if (file) {
   //       const reader = new FileReader();
   //       reader.onloadend = () => {
   //          setImagePreview(reader.result);
   //       };
   //       reader.readAsDataURL(file);
   //    }
   // };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // You can now send `formData` to your API
      console.log("Signup Data:", formData);
      if (formData.fullName === null || formData.fullName.length === 0) {
         showErrorToast("Please enter full name...");
         return null;
      }
      const response = await actionSignUpNewUser({
         fullName: formData.fullName,
         password: "",
         userId: userData?.userid,
      });
      console.log(response);
      if (response?.status === 200) {
         history.push("/admin");
      }
   };

   return (
      <form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: 400, margin: "auto" }}>
         <div className="mt-5" style={{ justifySelf: "center" }}>
            <Image name="Logo" src={sideLogo} />
         </div>
         <h3 className="text-center" style={{ fontWeight: "600" }}>
            Enter your Profile detail
         </h3>
         <h6 className="text-center" style={{ fontWeight: "500", color: "gray" }}>
            Don't worry you can change this info later
         </h6>
         <TextField
            fullWidth
            margin="normal"
            label="Profile Name"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange(e)}
         />

         {/* <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ margin: "16px 0" }}
         />

         {imagePreview && (
            <Avatar
               alt="Profile Preview"
               src={imagePreview}
               sx={{ width: 80, height: 80, margin: "10px auto" }}
            />
         )} */}
         <div className="text-center">
            <Buttons
               className="w-100"
               name="Sign Up"
               variant="contained"
               color="primary"
               fullWidth
               size="medium"
               type="submit"
            ></Buttons>
         </div>
      </form>
   );
};

export default Signup;
