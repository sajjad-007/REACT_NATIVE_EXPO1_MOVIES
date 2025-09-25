import { Client, ID, Query, TablesDB } from 'react-native-appwrite';

//My project databse id
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_PLATFORM!);

//database
const tablesDB = new TablesDB(client);

// track the searches made by a user
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: 'metrics',
      queries: [Query.equal('searchTerm', query)],
    });
    console.log(response);
    //check if a record of that search has is already been stored
    //if a document is found increment the search count
    if (response.rows.length > 0) {
      const existingMovie = response.rows[0];
      await tablesDB.updateRow(DATABASE_ID, 'metrics', existingMovie.$id, {
        count: existingMovie.count + 1,
      });
      console.log('count increment');

      //if no document is found
      //create a new document in appwrite database
    } else {
      await tablesDB.createRow(DATABASE_ID, 'metrics', ID.unique(), {
        searchTerm: query,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: movie.id,
        title: movie.title,
      });
      console.log('new row (for new movie) created');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
