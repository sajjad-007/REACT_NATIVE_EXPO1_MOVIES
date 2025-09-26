import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';

import { getTrendingMovies } from '@/services/appwrite';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Movie from '../components/Movie';
import SearchBar from '../components/SearchBar';
import TrendingMovieCart from '../components/TrendingMovieCart';
export default function Index() {
  const route = useRouter();
  const {
    data: trendingMovie,
    loading: trendingMovieLoading,
    error: trendingMovieError,
  } = useFetch(getTrendingMovies);

  const {
    data: popularMovie,
    error: popularMovieError,
    loading: popularMovieLoading,
    reset: popularMovieReset,
    refetch: popularMovieRefetch,
  } = useFetch(() => fetchMovies({ query: '' }));

  //for check appwrite

  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full mx-auto z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}
      >
        <Image
          source={icons.logo}
          className="w-18 h-18 mt-20 mb-5 mx-auto"
          resizeMode="cover"
        />
        {popularMovieLoading || trendingMovieLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : popularMovieError || trendingMovieError ? (
          <View className="flex-1">
            <Text className="text-white text-sm">
              Error: {popularMovieError?.message || trendingMovieError?.message}
            </Text>
          </View>
        ) : (
          <View className="mt-10 px-2">
            <SearchBar
              placeholder="Search your movies"
              onPress={() => {
                route.push('/search');
              }}
            />
            {trendingMovie && (
              <View className="mt-10">
                <Text className="text-white text-xl font-bold">
                  Trending movies
                </Text>
                <FlatList
                  //* Render a horizontal list of items.
                  horizontal
                  //* Hide the scroll indicator for a clean look.
                  showsHorizontalScrollIndicator={false}
                  //* Space each item by 26px without manually inserting a separator.
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  className="mb-4 mt-6"
                  data={trendingMovie}
                  renderItem={({ item, index }) => (
                    <TrendingMovieCart movie={item} index={index} />
                  )}
                  keyExtractor={item => item.$id}
                  // ItemSeparatorComponent={() => <View className="w-4" />}
                  // scrollEnabled={false}
                />
              </View>
            )}

            <>
              <Text className=" text-white text-xl font-bold my-6 ">
                Latest movies
              </Text>
              <FlatList
                data={popularMovie}
                renderItem={({ item }) => <Movie {...item} />}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 24,
                  marginBottom: 16,
                }}
                className="pb-20"
                // scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
