import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../assets/theme/colors';
import {
  HISTORY_APPOINTMENT,
  LOYALTY_POINTS,
  MY_VOUCHER_DETAIL,
  UPCOMINGS_APPOINTMENT,
  VOUCHER_DETAIL,
  VOUCHER_OFFERS_TAB,
} from '../../constants/routeName';
import Container from '../common/Container';
import SearchAppointmentCard from '../common/SearchAppointmentCard';
import Toolbar from '../common/Toolbar';
import styles from './styles';

const SearchComponent = ({
  query,
  visibleData,
  onSearchChange,
  onSubmit,
  onClear,
}) => {
  const {navigate} = useNavigation();


  function handleUpcomingAppoimentClick(item) {
    navigate(UPCOMINGS_APPOINTMENT, { item });
  }

  function handleHistoryItemClick(item) {
    navigate(HISTORY_APPOINTMENT, { item });
  }

  return (
    <Container>
      <Toolbar />
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <Image
            style={styles.searchIcon}
            source={require('../../assets/images/ic_search.png')}
          />
          <TextInput
            style={styles.inputFiled}
            placeholder="Search here"
            value={query}
            onChangeText={text => onSearchChange(text)}
            onSubmitEditing={() => {
              onSubmit();
            }}
          />
          <TouchableOpacity style={styles.searchCloseIcon} onPress={onClear}>
            <Image source={require('../../assets/images/ic_close.png')} />
          </TouchableOpacity>
        </View>
        {visibleData.length < 1 && (
          <Text
            style={{
              alignSelf: 'center',
              flex: 1,
              textAlignVertical: 'bottom',
              color: colors.grey,
              fontFamily: 'Poppins-Regular',
            }}>
            Search to see result
          </Text>
        )}
        {
          console.log("visibleData",visibleData)
        }
        {visibleData[0]?.data.length < 1 && visibleData[1]?.data.length < 1 && visibleData[2]?.data.length < 1 && visibleData[3]?.data.length < 1 && (
          <Text
            style={{
              alignSelf: 'center',
              flex: 1,
              textAlignVertical: 'bottom',
              color: colors.grey,
              fontFamily: 'Poppins-Regular',
            }}>
            No result found
          </Text>
        )}
        <SectionList
          style={{marginTop: 8}}
          sections={visibleData}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({item, section}) => (
            <SearchAppointmentCard
              key={item.id}
              item={item}
              section={section}
              query={query}
              itemClick={(item, section) => {
                console.log("item",item)
                console.log("section",section)
                if (section.title === 'Upcomings') {
                  handleUpcomingAppoimentClick(item)
                } else if (section.title === 'History') {
                  handleHistoryItemClick(item)
                }else if(section.title==='Vouchers offer'){
                  navigate(VOUCHER_DETAIL, {item: item});
                }else if(section.title==='My Vouchers'){
                  navigate(MY_VOUCHER_DETAIL, {item: item});
                }
              }}
            />
          )}
          renderSectionHeader={({section}) =>
         
            section.data.length > 0 ? (
              
              <HeaderItem title={section.title} />
            ) : null
          }
        />
      </View>
    </Container>
  );
};

const HeaderItem = ({title}) => (
 
  <View style={{backgroundColor: colors.white}}>
    <Text
      style={{
        color: colors.primary,
        fontSize: 16,
        marginTop: 4,
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
      }}>
      {title}
    </Text>
  </View>
);

export default SearchComponent;
