import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

const SearchBar = () => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-6 h-6"
        resizeMode="cover"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={() => {}}
        placeholder="search here"
        value={''}
        onChange={() => {}}
        className="flex-1 ml-4 text-white text-lg"
        placeholderTextColor="#A8B5DB "
      />
    </View>
  );
};

export default SearchBar;
