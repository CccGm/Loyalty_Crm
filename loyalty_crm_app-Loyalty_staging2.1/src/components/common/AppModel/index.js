import React from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {APP_NAME} from '../../../constants/strings';
import CustomButton from '../CustomButton';
import styles from './styles';

const AppModel = ({
  title,
  modalBody,
  modalVisible,
  setModalVisible,
  closeOnTouchOutside = true,
  positiveButton: {positiveTitle, positivePress} = {},
  negativeButton: {negativeTitle, negativePress} = {},
  buttonPosRevers,
}) => {
  return (
    <Modal animationType="fade" visible={modalVisible} transparent>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (closeOnTouchOutside) {
            setModalVisible(false);
          }
        }}
        style={styles.wrapper}>
        <View
          activeOpacity={1}
          style={styles.modalView}
          onStartShouldSetResponder={() => true}>
          <ScrollView>
            <Text style={styles.title}>{title || APP_NAME}</Text>
            <View style={styles.body} onStartShouldSetResponder={() => true}>
              {modalBody}
            </View>
            <>
              {positiveTitle && negativeTitle ? (
                <View
                  style={{
                    flexDirection: buttonPosRevers ? 'row-reverse' : 'row',
                    alignSelf: 'flex-end',
                  }}>
                  <CustomButton
                    title={negativeTitle}
                    onPress={() => {
                      negativePress();
                      setModalVisible(false);
                    }}
                    negative
                    style={{margin: 5}}
                  />
                  <CustomButton
                    title={positiveTitle}
                    onPress={() => {
                      positivePress();
                      setModalVisible(false);
                    }}
                    style={{margin: 5}}
                    primary
                  />
                </View>
              ) : null}
            </>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AppModel;
