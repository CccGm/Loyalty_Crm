import {GET_SEARCH} from '@env';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';

export default (query) =>
  (loaderDispatch, bottomMessageDispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    axios
      .get(GET_SEARCH, {params: {search: query}})
      .then(res => {
        if (res.data.status === 'failure') {
          warningMessage(bottomMessageDispatch, res.data.message);
        } else if (res.data.status === 'success') {
          onSuccess(res.data.data);
        }
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        hideLoding(loaderDispatch);
      });
  };
