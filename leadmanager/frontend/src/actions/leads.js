import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";
import { tokeConfig, tokenConfig } from "./auth";

// GET
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("/api/leads/", tokenConfig(getState))
    .then((response) => {
      dispatch({
        type: GET_LEADS,
        payload: response.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE
export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then((response) => {
      dispatch(createMessage({ leadDeleted: "Lead Deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// ADD
export const addLead = (lead) => (dispatch, getState) => {
  axios
    .post("/api/leads/", lead, tokenConfig(getState))
    .then((response) => {
      dispatch(createMessage({ leadAdded: "Lead Added" }));
      dispatch({
        type: ADD_LEAD,
        payload: response.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
