import {GET_SLOTS} from '@env';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';

export default (loaderDispatch, bottomMessageDispatch) => onSuccess => {
  showLoding(loaderDispatch);
  axios
    .get(GET_SLOTS)
    .then(res => {
      if (res.data.status === 'failure') {
        warningMessage(bottomMessageDispatch, res.data.message);
        hideLoding(loaderDispatch);
      } else if (res.data.status === 'success') {
        hideLoding(loaderDispatch);
        onSuccess(res.data.data.companyTimings);
      }
    })
    .catch(error => {
      errorMessage(bottomMessageDispatch, error.message);
      hideLoding(loaderDispatch);
    });
};
