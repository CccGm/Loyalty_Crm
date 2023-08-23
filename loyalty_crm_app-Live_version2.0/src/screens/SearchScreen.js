import React, {useContext, useEffect, useState} from 'react';
import SearchComponent from '../components/SearchComponent';
import getSearch from '../context/actions/dashboardOps/getSearch';
import {GlobalContext} from '../context/Provider';

const DashboardScreen = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);

  //const [dataHolder, setDataHolder] = useState(DATA);
  const [visibleData, setVisibleData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    return () => {
      setQuery('');
    };
  }, []);

  // useEffect(() => {
  //   const search = query.toUpperCase();
  //   if (search.length === 0) {
  //     setVisibleData(dataHolder);
  //   } else {
  //     setVisibleData(
  //       dataHolder.reduce((result, selectionData) => {
  //         const {title, data} = selectionData;
  //         const filterData = data.filter(item => {
  //           return (
  //             item.pacakgeName.toUpperCase().includes(search) ||
  //             item.serviceIncluded.toUpperCase().includes(search)
  //           );
  //         });
  //         if (filterData.length !== 0) {
  //           result.push({title, data: filterData});
  //         }
  //         return result;
  //       }, []),
  //     );
  //   }
  // }, [query]);

  const onSubmit = () => {
    getSearch(query)(loaderDispatch, bottomMessageDispatch)(res => {
      console.log("ddddd",res)
      setVisibleData([
        {
          title: 'Upcomings',
          data: res?.upcoming_appointment ?? [],
        },
        {
          title: 'History',
          data: res?.history_appointment ?? [],
        },
        {
          title: 'Vouchers offer',
          data: res?.voucher_offer ?? [],
        },
        {
          title: 'My Vouchers',
          data: res?.my_voucher ?? [],
        }
      ]);
    });
  };

  const onSearchChange = value => {
    setQuery(value);
  };

  const onClear = () => {
    setQuery('');
    setVisibleData([]);
  };

  return (
    <SearchComponent
      query={query}
      onSearchChange={onSearchChange}
      visibleData={visibleData}
      onSubmit={onSubmit}
      onClear={onClear}
    />
  );
};

export default DashboardScreen;
