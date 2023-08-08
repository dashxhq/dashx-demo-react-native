import axios from 'axios';
import { getStoredValueForKey, showToast } from './LocalStorage';

export const BASE_URL = 'https://node.dashxdemo.com';

export const EXTERNAL_COLUMN_ID = {
  video: '651144a7-e821-4af7-bb2b-abb2807cf2c9',
  image: 'f03b20a8-2375-4f8d-bfbe-ce35141abe98',
  avatar: 'e8b7b42f-1f23-431c-b739-9de0fba3dadf',
};

const normalizedHeaders = async (headers = {}) => {
  const userToken = await getStoredValueForKey('userToken');
  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };

  return {
    ...headers,
    ...authHeaders,
  };
};

const processNetworkError = (error) => {
  if (error?.response?.status === 500) {
    showToast('Internal server error');
  }
  if (error?.response?.status === 409) {
    showToast('Email already exist');
  } else {
    showToast('Network error');
  }

  throw error;
};

export const APIGet = async ({ endUrl, headers }) => {
  const finalHeaders = await normalizedHeaders(headers);
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/${endUrl}`,
      headers: finalHeaders,
    });
    return response.data;
  } catch (error) {
    processNetworkError(error);
  }
};

/** Non Get API call i.e. with body */
const nonGetMethod = async ({
  endUrl,
  method,
  dataObject,
  headers,
  setIsModalVisible,
}) => {
  try {
    const finalHeaders = await normalizedHeaders(headers);
    const response = await axios({
      method,
      url: `${BASE_URL}/${endUrl}`,
      data: JSON.stringify(dataObject),
      headers: finalHeaders,
    });
    return response.data;
  } catch (error) {
    processNetworkError(error, setIsModalVisible);
  }
};

export const APIPut = async ({ endUrl, dataObject, headers }) => {
  return await nonGetMethod({
    method: 'PUT',
    endUrl,
    dataObject,
    headers,
  });
};

export const APIPatch = async ({
  endUrl,
  dataObject,
  headers,
  setIsModalVisible,
}) => {
  return await nonGetMethod({
    method: 'PATCH',
    endUrl,
    dataObject,
    headers,
    setIsModalVisible,
  });
};

export const APIPost = async ({
  endUrl,
  dataObject,
  headers,
  setIsModalVisible,
}) => {
  return await nonGetMethod({
    method: 'POST',
    endUrl,
    dataObject,
    headers,
    setIsModalVisible,
  });
};

export const getAllPosts = async () => {
  const response = await APIGet({
    endUrl: 'posts',
  });

  return response.posts || [];
};
