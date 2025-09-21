import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import Movie from '../components/Movie';
import SearchBar from '../components/SearchBar';

const search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: moviesData,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));
  //state for search query
  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full mx-auto z-0"
        alt="not found"
        resizeMode="cover"
      />
      <FlatList
        data={moviesData}
        renderItem={({ item }) => <Movie {...item} />}
        keyExtractor={item => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 18,
          // paddingLeft: 14,
          marginVertical: 18,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex justify-center mt-14">
              <Image source={icons.logo} className="mx-auto z-0" />
            </View>
            <View className="mt-10 mb-5">
              <SearchBar
                placeholder="Search your movies"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="flex-1 mx-auto self-center"
              />
            )}
            {error && (
              <View className="flex-1 flex justify-center">
                <Text className="text-sm text-red-600">
                  Error: {error.message}
                </Text>
              </View>
            )}
            {!loading &&
              !error &&
              searchQuery.trim() &&
              moviesData?.length > 0 && (
                <View className="flex-1 flex-row gap-2">
                  <Text className="text-white text-xl">
                    Search result showing for:
                  </Text>
                  <Text className="text-green-300 text-xl">{searchQuery}</Text>
                </View>
              )}
          </>
        }
      />
      {/* <Text className="text-white text-sm">search</Text> */}
    </View>
  );
};

export default search;
