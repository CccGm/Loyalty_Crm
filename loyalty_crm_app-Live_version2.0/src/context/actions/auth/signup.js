import {SIGN_UP} from '@env';
import {
  SIGN_UP_FAUILER,
  SIGN_UP_LODING,
  SIGN_UP_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {
  errorMessage,
  hideLoding,
  showLoding,
  successMessage,
  warningMessage,
} from '../common';

export default ({
    firstName: first_name,
    lastName: last_name,
    phoneNo,
    email,
    password,
    profile,
    gender,
    birthdate,
    referral_membership_code,
    customer_from,
  }) =>
  (loaderDispatch, bottomMessageDispatch, countrycode, dispatch) =>
  onSuccess => {
    let json = {
      first_name: first_name == undefined ? first_name : first_name.trim(),
      last_name: last_name == undefined ? last_name : last_name.trim(),
      isd_code: countrycode == undefined ? countrycode : countrycode.trim(),
      mobile_number: phoneNo == undefined ? phoneNo : phoneNo.trim(),
      email: email == undefined ? email : email.trim(),
      gender: gender,
      password: password,
      birthdate: birthdate,
      profile: profile,
      referral_membership_code:
        referral_membership_code == undefined
          ? referral_membership_code
          : referral_membership_code.trim(),
      customer_from: 6,
    };
    showLoding(loaderDispatch);
    dispatch({type: SIGN_UP_LODING});
    axios
      .post(SIGN_UP, json)
      .then(res => {
        hideLoding(loaderDispatch);
        if (res.data.status === 'failure') {
          dispatch({
            type: SIGN_UP_FAUILER,
            payload: res.data.message,
          });
          warningMessage(bottomMessageDispatch, res.data.message, true);
        } else if (res.data.status === 'success') {
          successMessage(bottomMessageDispatch, 'Successfully Sign Up');
          dispatch({type: SIGN_UP_SUCCESS, payload: res.data.data});
          onSuccess(res.data.data);
        }
      })
      .catch(error => {
        hideLoding(loaderDispatch);
        dispatch({
          type: SIGN_UP_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        errorMessage(bottomMessageDispatch, error.message, true);
      });
  };
