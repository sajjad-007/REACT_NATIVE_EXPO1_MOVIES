import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import Movie from '../components/Movie';
import SearchBar from '../components/SearchBar';

const search = () => {
  //state for search query
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: moviesData,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  useEffect(() => {
    /**When the function is called, you start a timer (setTimeout) Or
    When searchQuery changes, start a timer */

    const timeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch(); // run API call if there's text
      } else {
        reset(); // clear results if input is empty
      }
      // This only runs after the user stops typing for 500ms
    }, 500);
    // Cleanup: if searchQuery changes before 500ms passes,
    // cancel the old timer so it never runs
    return () => clearTimeout(timeout);
  }, [searchQuery]); // runs whenever searchQuery changes

  //for trending movies
  useEffect(() => {
    if (moviesData?.length > 0 && moviesData?.[0]) {
      updateSearchCount(searchQuery, moviesData[0]);
    }
  }, [moviesData]);
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
                placeholder="Search through 300+ movies online"
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
                <View className="flex-1 flex-row gap-2 mt-10 mb-7">
                  <Text className="text-white text-xl font-bold">
                    Search result showing for
                  </Text>
                  <Text className="text-green-300 text-xl font-bold">
                    {searchQuery}
                  </Text>
                </View>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="flex-1 mt-20 flex items-center justify-center">
              <Text className="text-xl text-yellow-400 mx-auto font-bold">
                {searchQuery.trim()
                  ? 'No movie found!'
                  : 'Start searching for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
      {/* <Text className="text-white text-sm">search</Text> */}
    </View>
  );
};

export default search;
