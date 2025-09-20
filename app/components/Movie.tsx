import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Movie = ({
  id,
  title,
  original_title,
  poster_path,
  release_date,
  vote_average,
  original_language,
}: Movie) => {
  return (
    <Link href={`../movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] flex gap-1">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placeholder.co/600*400/1a1a1a/ffffff.png',
          }}
          className="w-full h-56 object-cover rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center gap-2">
          <Image source={icons.star} className="text-sm " />
          <Text className="text-white text-sm ">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <Text className="text-white text-sm">{release_date.split('-')[0]}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default Movie;
