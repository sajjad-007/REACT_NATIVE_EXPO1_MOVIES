import { getFavMovieId } from '@/services/appwrite';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const saved = () => {
  const [id, setId] = useState();
  // const {} = useFetch(fetchMovieDetails(""))
  useEffect(() => {
    const newi = async () => {
      const helo = await getFavMovieId();
      const value = helo?.map((item, index) => item.movieId);
    };
    newi();
  }, []);

  return (
    <View>
      <Text>saved</Text>
    </View>
  );
};

export default saved;
