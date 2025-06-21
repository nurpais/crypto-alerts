import axios from 'axios';
import config from '../config/config';

export async function getTokens() {
  try {
    const res = await axios.get(config.DSTokens);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
