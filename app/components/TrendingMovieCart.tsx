import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
const TrendingMovieCart = ({
  movie: { title, movie_id, poster_url },
  index,
}: TrendingCardProps) => {
  // console.log(index + 1);
  return (
    <Link href={`../movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 ">
        <Image
          source={{
            uri: poster_url,
          }}
          className="w-32 h-56 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute left-[-8px] bottom-[30px] ">
          <MaskedView
            maskElement={
              <Text className="font-bold text-6xl text-white">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text className="text-white text-lg mt-3" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingMovieCart;
