/** @format */

import reduxThunk from "redux-thunk";

import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import reducers from "./common/redux/reducers";
import SmartDoorViewRoute from "./route/SmartDoorViewRoute";

import { AuthProvider } from "./common/helpers/Auth";

// Create redux store
// const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const store = createStore(
   reducers,
   {},
   applyMiddleware(reduxThunk) // Apply thunk middleware
);
function App() {
   return (
      <BrowserRouter>
         <Provider store={store}>
            <StrictMode>
               <AuthProvider>
                  <ToastContainer
                     autoClose={4000}
                     className="custom-toaster-main-cls"
                     toastClassName="custom-toaster-bg"
                  />
                  <SmartDoorViewRoute />
               </AuthProvider>
            </StrictMode>
         </Provider>
      </BrowserRouter>
   );
}

export default App;
