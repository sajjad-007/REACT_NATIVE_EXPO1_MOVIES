import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';

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
export default function Index() {
  const route = useRouter();
  const {
    data: trendingMovie,
    error: trendingMovieError,
    loading: trendingMovieLoading,
    reset: trendingMovieReset,
    refetch: trendingMovieRefetch,
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
        {trendingMovieLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : trendingMovieError ? (
          <View className="flex-1">
            <Text className="text-white text-sm">
              Error: {trendingMovieError.message}
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
            <>
              <Text className="flex-1 text-white text-xl font-bold my-6 capitalize">
                Popular Movies
              </Text>
              <FlatList
                data={trendingMovie}
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
