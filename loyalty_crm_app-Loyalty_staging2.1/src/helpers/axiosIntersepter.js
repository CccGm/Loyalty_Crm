import {BASE_URL, CLIENT_ID, STAGINGBASE_URL, STAGINGCLIENT_ID} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ACCESS_TOKEN} from '../constants/prefrenceKeys';

const axiosInstance = axios.create({
  baseURL: STAGINGBASE_URL,
  headers: {Accept: 'application/json'},
});

axiosInstance.interceptors.request.use(
  async request => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);

    if (token) {
      request.headers['clientid'] = STAGINGCLIENT_ID;
      request.headers['Accesstoken'] = token;
    } else {
      delete request.headers['clientid'];
      delete request.headers['Accesstoken'];
    }
    console.log(
      `${new Date()} :: Request`,
      `${JSON.stringify(request, null, 2)}`,
    );
    return request;
  },
  error => {
    console.log(
      `${new Date()} :: Request ERROR`,
      `${JSON.stringify(error, null, 2)}`,
    );
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', '---------------------------------------');
    console.log(
      `${new Date()} :: Response:`,
      ` ${new Date()} :: ${JSON.stringify(response, null, 2)}`,
    );
    return response;
  },
  error => {
    console.log(
      `${new Date()} :: Response ERROR`,
      `${JSON.stringify(error, null, 2)}`,
    );
    return Promise.reject(error);
  },
);

export default axiosInstance;
