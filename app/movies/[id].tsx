import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import { storeFavMovieId } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface HeadingProps {
  label: string;
  content?: string | number | null;
}

const CommonHeading = ({ label, content }: HeadingProps) => (
  <View className="flex-col items-start gap-2 pb-6">
    <Text className="text-sm text-accentText">{label}</Text>
    {label === 'Overview' ? (
      <Text className="text-[14px] text-white leading-7 ">
        {content || 'N/A'}
      </Text>
    ) : (
      <Text className="text-[14px] text-secondaryText leading-7 font-semibold capitalize">
        {content || 'N/A'}
      </Text>
    )}
  </View>
);

interface BoxProps {
  text?: string | number | null;
}
const CommonBox = ({ text }: BoxProps) => (
  <View className="bg-dark-100  rounded-lg flex-row items-center justify-center gap-x-2  py-[6px] px-[10px]">
    <Text className="text-white text-sm font-semibold capitalize ">{text}</Text>
  </View>
);

const moviesDetails = () => {
  // const [value, setValue] = useState(Number);

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  const handleId = (id: number) => {
    storeFavMovieId(id);
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="h-[550px] w-full "
            resizeMode="stretch"
          />
          <TouchableOpacity className="absolute right-8 bottom-[-24px] size-24 bg-white rounded-full flex items-center justify-center">
            <Image
              source={icons.play}
              className="h-10 w-10"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-col px-5 mt-5">
          <Text className="text-white text-2xl capitalize">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-lg">
              {movie?.release_date.split('-')[0]} •
            </Text>
            {/* •<Text className="text-md text-white"> </Text> */}
            <Text className="text-light-200 text-lg">{movie?.runtime}m</Text>
            <View>
              <TouchableOpacity
                key={movie?.id}
                onPress={() => handleId(movie?.id ?? 0)}
              >
                <Image
                  source={icons.save}
                  // className="size-5 absolute top-0 right-2"
                  tintColor="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-dark-100 p-2 rounded-lg flex-row items-center justify-center gap-x-2 mt-4 mb-6 w-[190px]">
            <Image source={icons.star} className="size-4" resizeMode="cover" />
            <View className="flex-row ">
              <Text className="text-white text-lg">
                {Math.floor(movie?.vote_average ?? 0)}
              </Text>
              <Text className="text-light-200 text-lg">/10</Text>
            </View>
            <Text className="text-light-200 text-lg">
              ({movie?.vote_count})Votes
            </Text>
          </View>
          <CommonHeading label="Overview" content={movie?.overview} />
          <View className="flex-row items-center gap-8">
            <CommonHeading label="Release Date" content={movie?.release_date} />
            <CommonHeading label="status" content={movie?.status} />
          </View>
          <View className="pb-6">
            <Text className="text-sm text-accentText mb-2">Genres</Text>
            <View className="flex-row items-center justify-start gap-4 flex-wrap">
              {movie?.genres.map((g, index) => (
                <CommonBox key={index} text={g.name} />
              ))}
            </View>
          </View>
          {/* Countries */}

          <View>
            <View className="flex-row items-center justify-start gap-4">
              <CommonHeading
                label="Countries"
                content={movie?.production_countries
                  ?.map(c => c.name)
                  .join('  •  ')}
              />
            </View>
          </View>
          {/* Taka */}
          <View className="flex-row items-center gap-8">
            <CommonHeading
              label="Budget"
              content={`$${Math.round(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <CommonHeading
              label="Revenue"
              content={`$${Math.round(movie?.revenue ?? 0) / 1_000_000} million`}
            />
          </View>
          <CommonHeading label="Tagline" content={movie?.tagline} />
          <CommonHeading
            label="Companies"
            content={movie?.production_companies
              .map(c => c.name)
              .join('   •   ')}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="bg-accent absolute left-0 right-0 bottom-5  py-4 mx-5 px-2 flex-row items-center justify-center gap-5 z-50 rounded-lg "
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="w-7 h- rotate-180"
          resizeMode="cover"
          tintColor="#fff"
        />
        <Text className="text-white text-lg font-semibold capatalize">
          Visit Homepage
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default moviesDetails;
