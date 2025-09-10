import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Image, ScrollView, View } from 'react-native';
import SearchBar from '../components/SearchBar';

export default function Index() {
  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full mx-auto z-0"
        resizeMode="cover"
      />
      <ScrollView className="flex-1 px-5">
        <Image
          source={icons.logo}
          className="w-18 h-18 mt-20 mb-5 mx-auto"
          resizeMode="cover"
        />
        <View className="flex-1 mt-10">
          <SearchBar />
        </View>
      </ScrollView>
    </View>
  );
}
