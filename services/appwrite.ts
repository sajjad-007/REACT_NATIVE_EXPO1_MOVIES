import { Client, ID, Query, TablesDB } from 'react-native-appwrite';

//My project databse id
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLEID_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLEROW_ID!;
const TABLE_MOVIEID = process.env.EXPO_PUBLIC_APPWRITE_TABLEROW_MOVIEID!;

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_PLATFORM!);

//database
const tablesDB = new TablesDB(client);

// track the searches made by a user
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    //* appwrite read operation
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLEID_ID,
      queries: [Query.equal('searchTerm', query)],
    });
    console.log(response);
    //check if a record of that search has is already been stored
    //if a document is found increment the search count
    if (response.rows.length > 0) {
      const existingMovie = response.rows[0];
      //*appwrite update operation
      await tablesDB.updateRow(DATABASE_ID, TABLEID_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
      console.log('count increment');

      //if no document is found
      //create a new document in appwrite database
    } else {
      //*appwrite create(write) operation
      await tablesDB.createRow(DATABASE_ID, TABLEID_ID, ID.unique(), {
        searchTerm: query,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: movie.id,
        title: movie.title,
      });
      console.log('new row created for a new movie');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLEID_ID,
      queries: [Query.limit(5), Query.orderDesc('count')],
    });
    return response.rows as unknown as TrendingMovie[];
  } catch (error) {
    console.log('error from getTrendingMovies', error);
    return undefined;
  }
};

//store a favorite movie id
export const storeFavMovieId = async (movieId: number) => {
  try {
    console.log('from store', movieId);
    // console.log('hello');
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: 'movieid',
      queries: [Query.equal('movieId', movieId)],
    });
    if (response.rows.length > 0) {
      throw new Error('This movie  is already exist in database!');
    } else {
      await tablesDB.createRow(DATABASE_ID, TABLE_MOVIEID, ID.unique(), {
        movieId: movieId,
      });
      console.log('new fav movie crated');
    }

    return;
  } catch (error) {
    console.error('Error from store fav movie id', error);
    return error;
  }
};
interface FavMovie {
  movieId: number;
}
export const getFavMovieId = async (): Promise<FavMovie[] | undefined> => {
  try {
    // console.log('hello');
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: 'movieid',
      queries: [Query.orderDesc('movieId')],
    });
    // console.log(response.rows);
    return response.rows as unknown as FavMovie[];
  } catch (error) {
    console.error('Error from store fav movie id', error);
    return undefined;
  }
};
