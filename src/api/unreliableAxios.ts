import axios from 'axios';

const MAX_RETRIES = 1;
const INITIAL_BACKOFF = 10000; // Initial backoff in milliseconds (1 second)

const unreliableAxios = axios.create();

unreliableAxios.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error;
    const status = response ? response.status : 0;
    const retries = config.__retries || 0;

    if (status === 429 && retries < MAX_RETRIES) {
      const backoff = INITIAL_BACKOFF * Math.pow(2, retries);
      console.warn(`Rate limit exceeded. Retrying in ${backoff}ms...`);

      config.__retries = retries + 1;
      await new Promise(resolve => setTimeout(resolve, backoff));

      return unreliableAxios(config);
    }

    return Promise.reject(error);
  }
);

export default unreliableAxios;
