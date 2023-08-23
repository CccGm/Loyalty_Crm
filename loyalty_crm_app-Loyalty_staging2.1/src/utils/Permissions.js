import {Alert, Linking} from 'react-native';
import {check, request, RESULTS} from 'react-native-permissions';
import {CANCEL, OK} from '../constants/strings';

export const checkAndGetPemission = async (permission, onSuccess) => {
  const result = await check(permission);

  switch (result) {
    case RESULTS.UNAVAILABLE:
      //'This feature is not available (on this device / in this context)'
      break;
    case RESULTS.DENIED:
      //'The permission has not been requested / is denied but requestable'
      const reqRes = await request(permission);
      switch (reqRes) {
        case RESULTS.DENIED:
          showHintAlert();
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.GRANTED:
          onSuccess();
          break;
        case RESULTS.BLOCKED:
          showSettingAlert();
          break;
      }
      break;
    case RESULTS.LIMITED:
      //'The permission is limited: some actions are possible'
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      onSuccess();
      break;
    case RESULTS.BLOCKED:
      //'The permission is denied and not requestable anymore'
      // open settings
      showSettingAlert();
      break;
  }

  function showHintAlert() {
    Alert.alert(
      'Grant permission',
      'Please grant following permission to access all features of app',
      [
        {
          text: CANCEL,
          style: 'cancel',
        },
        {
          text: OK,
          onPress: async () => {
            const reqRes = await request(permission);
            switch (reqRes) {
              case RESULTS.DENIED:
                break;
              case RESULTS.LIMITED:
                break;
              case RESULTS.GRANTED:
                onSuccess();
                break;
              case RESULTS.BLOCKED:
                showSettingAlert();
                break;
            }
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  function showSettingAlert() {
    Alert.alert(
      'Grant permissions',
      'we will redirect you to app settings, please grant permissions to access all features of app',
      [
        {
          text: CANCEL,
          style: 'cancel',
        },
        {
          text: OK,
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  }
};
