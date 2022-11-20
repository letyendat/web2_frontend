import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://register-week2.herokuapp.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => 
    // Do something before request is sentap
     config
  ,
  (error) => 
    // Do something with request error
     Promise.reject(error)
  
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => 
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
     response.data
  ,
  (error) => 
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
     Promise.reject(error)
  
);

export default axiosClient;