import { useAuthStore } from '@/stores/auth';
import {base_url} from '@/utils/config';
import axios, { type AxiosRequestConfig, type Method } from 'axios';
import { errorMessage, successMessage } from './messages';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

// interface temp {
//   method: string;
//   headers: Record<string, string>;
//   body?: string;
// }

// function request2(method: string) {
//   return (url: string, body?: object) => {
//     const requestOptions: temp = {
//       method,
//       headers: authHeader(url)
//     };
//     if (body) {
//       requestOptions.headers['Content-Type'] = 'application/json';
//       requestOptions.body = JSON.stringify(body);
//     }
//     return fetch(url, requestOptions).then(handleResponse2);
//   };
// }



function request(method: Method) {
  return async (url: string, body?: object) => {
    const config: AxiosRequestConfig = {
      method,
      url,
      headers: authHeader(url),
    };

    if (body) {
      config.headers = { ...config.headers, 'Content-Type': 'application/json' };
      config.data = body;
    }

    try {
      const response = await axios(config);
      // console.log('Response Data:', response.data);
      return response.data;  // Ensure we are returning the actual response data
    } catch (error: any) {
      const errorText = error?.response?.data?.message || 'An unexpected error occurred. Please try again later.';
      errorMessage(errorText);
      throw error;  // Propagate the error so the caller can handle it
    }
  };
}

function authHeader(url: string) {
  const { user, token } = useAuthStore();
  const isLoggedIn = !!token;
  const isApiUrl = url.startsWith(base_url);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

// function handleResponse2(response: any) {
//   return response.text().then((text: string) => {
//     const data = text && JSON.parse(text);

//     if (!response.ok) {
//       const { user, logout } = useAuthStore();
//       if ([401, 403].includes(response.status) && user) {
//         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//         logout();
//       }

//       const error: string = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }
    
//     return data;
//   });
// }

async function handleResponse(response: any) {
  try {
    // Axios automatically parses JSON, so directly access response.data
    const data = response.data;

    // Check if the response status is not OK
    if (!response.status || response.status < 200 || response.status >= 300) {
      const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        logout();
      }

      const error = data?.message || response.statusText || 'An error occurred';
      errorMessage(error);
      return Promise.reject(error);
    }

    // Handle success message
    if (data?.message) {
      successMessage(data.message); // Display success message
    }

    // Return the relevant data payload
    return data || null;
  } catch (error: any) {
    // Handle unexpected errors gracefully
    const errorText = error?.response?.data?.message || 'An unexpected error occurred. Please try again later.';
    errorMessage(errorText);
    return Promise.reject(errorText);
  }
}