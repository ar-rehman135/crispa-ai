import { AxiosError, AxiosRequestConfig } from "axios";
import axios from "./apiConfig";

export interface IRequestBody {
  [string: string]: string | undefined;
}

// Function to perform a POST request with provided URL, body, and optional configuration
export const postRequest = (
  url: string,
  body: IRequestBody | any,
  config?: AxiosRequestConfig
) => {
  return axios.post(url, body, {
    ...config,
    headers: {
      ...config?.headers,
    },
  });
};

// Function to perform a PUT request with provided URL, body, and optional configuration
export const putRequest = (
  url: string,
  body: IRequestBody | any,
  config?: AxiosRequestConfig
) => {
  return axios.put(url, body, {
    ...config,
    headers: {
      ...config?.headers,
    },
  });
};

// Function to perform a GET request with provided URL, parameters, and optional configuration
export const getRequest = (
  url: string,
  params?: { [key: string]: any }, // Accept parameters as an object
  config?: AxiosRequestConfig
) => {
  let routeUrl = url;

  // If params object is provided, construct query string
  if (params) {
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    routeUrl += `?${queryString}`;
  }

  return axios.get(routeUrl, {
    ...config,
    headers: {
      ...config?.headers,
    },
  });
};

// Function to perform a DELETE request with provided URL, parameters, and optional configuration
export const deleteRequest = (
  url: string,
  params?: { [key: string]: any }, // Accept parameters as an object
  config?: AxiosRequestConfig
) => {
  let routeUrl = url;

  // If params object is provided, construct query string
  if (params) {
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    routeUrl += `?${queryString}`;
  }

  return axios.delete(routeUrl, {
    ...config,
    headers: {
      ...config?.headers,
    },
  });
};

// Function to perform a PATCH request with provided URL, body, and optional configuration
export const patchRequest = (
  url: string,
  body: IRequestBody | any,
  config?: AxiosRequestConfig
) => {
  return axios.patch(url, body, {
    ...config,
    headers: {
      ...config?.headers,
    },
  });
};

// Function to extract error message from Axios error response
export const getErrorMessage = (json: AxiosError | Error | any) => {
  return json?.response?.data?.message
    ? json?.response?.data?.message
    : json?.response?.data?.errors.length
    ? json?.response?.data?.errors
    : "Error while processing your request";
};
