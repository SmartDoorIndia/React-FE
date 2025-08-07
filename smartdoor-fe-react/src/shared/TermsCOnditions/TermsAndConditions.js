/** @format */

import React from "react";
import Text from "../Text/Text";
import Buttons from "../Buttons/Buttons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const TermsAndConditions = () => {
	const history = useHistory();

   return (
      <>
         <div>
            <Text
               className="py-1 px-3"
               text="<Back"
               style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  border: "solid 0.5px #DED6D9",
                  width: "fit-content",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                  cursor: "pointer",
               }}
               onClick={() => {history?.goBack();}}
            >
               {" "}
            </Text>
         </div>
         <ul>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text text="Registration" style={{ fontSize: "14px", fontWeight: "700" }} />
                  <Text
                     text="Builders must create an account by providing accurate and complete information, including their name, contact details, and company information."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text
                     text="Acceptance of Terms"
                     style={{ fontSize: "14px", fontWeight: "700" }}
                  />
                  <Text
                     text="By registering, you explicitly agree to abide by all terms and conditions set forth by the platform."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text text="Content Guidelines" style={{ fontSize: "14px", fontWeight: "700" }} />
                  <Text
                     text="You are responsible for all content you upload, including listings, images, and descriptions. Only appropriate, truthful, and lawful content is permitted. Misleading or prohibited content is strictly forbidden."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text text="Content Guidelines" style={{ fontSize: "14px", fontWeight: "700" }} />
                  <Text
                     text="You are responsible for all content you upload, including listings, images, and descriptions. Only appropriate, truthful, and lawful content is permitted. Misleading or prohibited content is strictly forbidden."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text text="User Conduct" style={{ fontSize: "14px", fontWeight: "700" }} />
                  <Text
                     text="You must use the platform responsibly. Activities such as spamming, harassment, fraud, or any form of misuse will result in immediate action, including possible account suspension or termination."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text text="Platform Usage" style={{ fontSize: "14px", fontWeight: "700" }} />
                  <Text
                     text="You may use the platform to manage your profile, post property listings, and communicate with interested buyers. Any misuse or unauthorized access may lead to restrictions or removal of access."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text
                     text="Liability and Disclaimers"
                     style={{ fontSize: "14px", fontWeight: "700" }}
                  />
                  <Text
                     text="The platform is not responsible for the accuracy of content provided by users. We disclaim liability for any losses, disputes, or issues arising from user interactions or reliance on information posted."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text text="Termination" style={{ fontSize: "14px", fontWeight: "700" }} />
                  <Text
                     text="Your account may be suspended or terminated if you violate these terms, engage in fraudulent activity, or misuse the platform in any way."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text
                     text="Intellectual Property"
                     style={{ fontSize: "14px", fontWeight: "700" }}
                  />
                  <Text
                     text="You retain ownership of the content you create. However, by uploading content, you grant the platform the right to display and use it as necessary for platform functionality."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text text="Data Privacy" style={{ fontSize: "14px", fontWeight: "700" }} />
                  <Text
                     text="We are committed to protecting your personal information. Please review our [Privacy Policy] for details on how your data is collected, used, and secured."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
            <li>
               <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <Text text="Updates to Terms" style={{ fontSize: "14px", fontWeight: "700" }} />
                  <Text
                     text="These terms may be updated periodically. You will be notified of any significant changes. Continued use of the platform implies acceptance of the revised terms."
                     style={{ fontSize: "13px", fontWeight: "500" }}
                  />
               </div>
            </li>
         </ul>
      </>
   );
};

export default TermsAndConditions;
