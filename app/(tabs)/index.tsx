import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import { Image, ScrollView, View } from 'react-native';
import SearchBar from '../components/SearchBar';
export default function Index() {
  const route = useRouter();
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
        <View className="mt-10">
          <SearchBar
            placeholder={'Search your movies'}
            onPress={() => {
              route.push('/search');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
