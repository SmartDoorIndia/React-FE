/** @format */

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Autocomplete, TextField } from "@mui/material";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import { showErrorToast } from "../../../common/helpers/Utils";
import { getSimList } from "../../../common/redux/actions";
import "./SimModals.scss";

// wait for the admin to stop typing before searching
const SEARCH_DELAY_MS = 300;

/**
 * Provider dropdown, then a searchable list of that provider's SIMs that are in no camera.
 * Controlled: the parent keeps the provider and the picked SIM (a SimCardDto from /sim/list).
 * excludeSimCardIds hides SIMs already picked elsewhere on the same screen.
 */
const SimPicker = ({ provider, onProviderChange, sim, onSimChange, disabled, excludeSimCardIds = [] }) => {
   const [searchText, setSearchText] = useState("");
   const [options, setOptions] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (!provider) {
         setOptions([]);
         return undefined;
      }
      let ignore = false;
      setLoading(true);
      const timer = setTimeout(() => {
         getSimList({
            providers: [provider],
            simStatus: "READY_TO_USE",
            // only SIMs the backend allows to go into a camera (active, not in a camera)
            availableToAttach: true,
            searchText: searchText.trim() || null,
            orderByParam: "ICCID",
            orderBy: "ASC",
            pageNumber: 1,
            pageSize: 100,
         }).then((response) => {
            if (ignore) return;
            setLoading(false);
            if (response?.status === 200) {
               setOptions(response.data?.resourceData?.sims || []);
            } else {
               setOptions([]);
               showErrorToast(response?.data?.message || "Could not load SIMs, please try again.");
            }
         });
      }, SEARCH_DELAY_MS);
      return () => {
         ignore = true;
         clearTimeout(timer);
      };
   }, [provider, searchText]);

   return (
      <div className="simPicker">
         <Form.Control
            as="select"
            className="simPickerProvider"
            value={provider}
            disabled={disabled}
            onChange={(e) => {
               setSearchText("");
               onSimChange(null);
               onProviderChange(e.target.value);
            }}
         >
            <option value="">Select provider</option>
            {CONSTANTS_STATUS.simProvider.map((simProvider) => (
               <option key={simProvider} value={simProvider}>
                  {simProvider}
               </option>
            ))}
         </Form.Control>
         <Autocomplete
            className="simPickerSim"
            size="small"
            // keep the picked SIM selectable after a search that no longer returns it
            options={sim && !options.some((option) => option.simCardId === sim.simCardId) ? [sim, ...options] : options}
            value={sim}
            loading={loading}
            disabled={disabled || !provider}
            // the server already filtered by the typed text
            filterOptions={(simOptions) =>
               simOptions.filter((option) => !excludeSimCardIds.includes(option.simCardId))
            }
            getOptionLabel={(option) => option.iccid}
            isOptionEqualToValue={(option, value) => option.simCardId === value.simCardId}
            onChange={(e, value) => onSimChange(value)}
            onInputChange={(e, value, reason) => {
               // "reset" is the picked SIM's ICCID being written into the box, not a search
               if (reason === "input" || reason === "clear") setSearchText(value);
            }}
            noOptionsText={searchText ? "No free SIM matches this ICCID" : "No free SIMs for this provider"}
            renderOption={(props, option) => (
               <li {...props} key={option.simCardId}>
                  <span className="simPickerIccid">{option.iccid}</span>
                  <span className={`simPickerStatus ${option.providerStatus === "ACTIVE" ? "active" : ""}`}>
                     {option.providerStatus || "-"}
                  </span>
               </li>
            )}
            renderInput={(params) => (
               <TextField {...params} placeholder={provider ? "Search ICCID" : "Select a provider first"} />
            )}
         />
      </div>
   );
};

export default SimPicker;
