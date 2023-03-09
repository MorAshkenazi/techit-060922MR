import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";

const api: string = process.env.REACT_APP_API || "";

// check user - login
export function checkUser(userToCheck: User) {
  return axios.post(`${api}/login`, userToCheck);
}

// add user - register
export function addUser(userToAdd: User) {
  return axios.post(`${api}/register`, userToAdd);
}

// get user details
export function getUserProfile() {
  return axios.get(`${api}/me`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// get isAdmin from the token
export function getIsAdmin() {
  let token = JSON.parse(sessionStorage.getItem("userData") as string).token;
  return (jwt_decode(token) as any).isAdmin;
}
