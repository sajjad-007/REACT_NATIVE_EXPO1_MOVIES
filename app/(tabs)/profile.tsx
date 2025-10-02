import { icons } from '@/constants/icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

const profile = () => {
  return (
    <View className="bg-primary flex-1 flex gap-2 items-center justify-center">
      <Image
        source={icons.person}
        className="size-14 "
        resizeMode="cover"
        tintColor="#fff"
      />
      <Text className="text-lg text-white">Comming Soon</Text>
    </View>
  );
};

export default profile;
