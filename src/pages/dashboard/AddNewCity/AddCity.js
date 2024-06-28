/** @format */

import { useState } from "react";
import Buttons from "../../../shared/Buttons/Buttons";
import { addNewCity } from "../../../common/redux/actions";
import Loader from "../../../common/helpers/Loader";
import { showErrorToast } from "../../../common/helpers/Utils";

const AddCity = () => {
   const [fileToUpload, setFileToUpload] = useState();
   const [loading, setLoading] = useState(false);

   const handleSave = (e) => {
      if (fileToUpload.name.endsWith(".csv")) {
         const formData = new FormData();
         formData.append("file", fileToUpload);
         setLoading(true);
         addNewCity(formData)
            .then((response) => {
               setLoading(false);
               setFileToUpload(undefined);

               if (response.data && response.data.status === 200) {
                  console.log("Done");
               }
            })
            .finally(() => {
               setLoading(false);
            });
      } else {
         showErrorToast("Check file format");
      }
   };

   return (
      <div className="container h-100">
         {loading ? (
            <div className="row h-100 justify-content-center align-items-center">
               <Loader />
            </div>
         ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
               <input
                  type="file"
                  onChange={(e) => {
                     setFileToUpload(e.target.files[0]);
                  }}
               />
               {fileToUpload !== undefined && (
                  <Buttons
                     name="Save Changes"
                     varient="primary"
                     size="Small"
                     color="white"
                     onClick={handleSave}
                  />
               )}
            </div>
         )}
      </div>
   );
};

export default AddCity;
