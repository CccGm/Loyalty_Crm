import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

const DashboardCard = ({title, detail_lbl, detail, style}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.card, style]}>
      <Image
        style={{marginVertical: 16}}
        source={require('../../../assets/images/calendar.png')}
      />
      <View style={styles.cardDetails}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail_lbl}>{detail_lbl}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    </View>
  );
};

export default DashboardCard;
