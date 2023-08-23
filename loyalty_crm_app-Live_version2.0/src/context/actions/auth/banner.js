import { GET_BANNER } from '@env';
import {
  GET_BANNER_LOADING,
  GET_BANNER_FAUILER,
  GET_BANNER_SUCCESS,
  SHOW_BS
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import { errorMessage, hideBS, hideLoding, showBS, showLoding, warningMessage } from '../common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

export default (loaderDispatch, bottomMessageDispatch, dispatch, bsDispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({ type: GET_BANNER_LOADING });
    axios
      .get(GET_BANNER)
      .then(async res => {
        if (res.data.status === 'failure') {
          warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_BANNER_FAUILER,
            payload: res.data.message,
          });
        } else if (res.data.status === 'success') {
          console.log("successsuccess",res)
          let BannerSingleTime =[];
          const bannerData = await AsyncStorage.getItem('bannerdata');
          const bannerId = JSON.parse(bannerData)
          console.log("bannerId",bannerId)
          const banner = res.data.data;
          if (bannerData) {
            banner.map((index, i) => {
              if(bannerId.includes(index.id) && bannerId.includes(index.display_single_time)){
                 return null
              }else{
                BannerSingleTime.push(index)
              }            
            })
            dispatch({ type: GET_BANNER_SUCCESS, payload:BannerSingleTime });
            showBS(bsDispatch, banner, false)
          } else {
            const banner = res.data.data;
            if (banner.length == 0) {
              hideBS(bsDispatch)
            } else {  
            let bannerIdStore = [];
              dispatch({ type: GET_BANNER_SUCCESS, payload: res.data.data });
              showBS(bsDispatch, banner, false)
              banner.map(async (index, i) => {
                if (index.display_single_time == "1") {
                  bannerIdStore.push(index.id,index.display_single_time)
                  const bannerData = JSON.stringify(bannerIdStore)
                  await AsyncStorage.setItem('bannerdata', bannerData)
                }
              })

            }

          }
        }
        onSuccess();
        hideLoding(loaderDispatch);
      })
      .catch(error => {

        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_BANNER_FAUILER,
          payload: error?.message
            ? error.message
            : { error: 'Something went wrong, try agin' },
        });
        hideLoding(loaderDispatch);
      });
  };
