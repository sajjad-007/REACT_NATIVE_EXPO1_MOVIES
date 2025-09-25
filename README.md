## 1. Navigate Content

- [Installation](#2-installation)
- [Usage](#3-usage)
- [Search-functionality](#5-search-functionality)

## 2. Installation

1. follow expo [documentation](https://docs.expo.dev/) and install all dependency, set up your porject
2. install nativewind for styling like tailwindCss
3. customize your metro.congig.js, change your input filed like below:
   `module.exports = withNativeWind(config, { input: './app/global.css' });`
4. Make some changes to `tailwind.config.js`
   - If you want to specify in which folders do you want to use nativewind styling.
   ```content: [
     './app/**/*.{js,jsx,ts,tsx}', // <-- these lines are for connecting two device for nativewind styling
     './components/**/*.{js,jsx,ts,tsx}',
   ],
   ```

## 3. Usage

1. To Run your project in your local machine
   `npx expo start `
2. install expo go mobile app
3. Make sure your project version(sdk53) is similliar to your expo go(sdk53) mobile app

### 3.1. create (tabs) and movies folder, add it to the \_layout.tsx file in our root directory.

1. <Stack> <Stack.Screen name="(tabs)" option={{headerShown:false}}> </Stack>
2. <Stack> <Stack.Screen name="movies/[id]" option={{headerShown:false}}> </Stack>
3. [id].tsx for dynamic route, we will use it for movie's details

### 3.2. (tabs) folder will organize our navigation files, (tabs) use for grouping a section.

1. put `index.tsx` file from root directory to `(tabs) folder`, index.tsx will be our home page
2. create `\_layout.tsx`
3. create profile,saved,search files (.tsx)
4. we have to customize \_layout.tsx, add these lines
   ` <Tabs> <Tabs.Screen name="index" option={{title:"Home",headerShown}}/> </Tabs>`

## 4. Image

- create a file named = images.d.ts
- How to set up a file to import images for typescript

1. `declare module "\*.png"`
   - This matches any import that ends in ` .png.`
   - Without it, if you try something like:
   - `import logo from "./logo.png";`
   - TypeScript would throw an error like **Cannot find module './logo.png** because it doesn’t know what a PNG is.
2. const content: any;
   - This declares that whatever gets imported is stored in a constant called content.
   - Its type is any, meaning “could be anything".
3. export default content;
   - This makes the PNG importable with import logo from "./logo.png";.
   - The value of logo will be whatever your bundler outputs.

- Why this is needed
  - TypeScript enforces types, and by default it only understands .ts, .tsx, .js, .jsx.
  - Declaring a module like this is a way to extend TypeScript’s type system to cover non-code assets.

### 4.1. api.ts

create api.ts it will be our custom movie fetching function (TMDB)

### 4.2. useFetch.ts

create useFetch.ts it will be our a custom hook for handaling all data,fetching,error and for loading

### 4.3. fetch movies ins index.tsx file,

previously we created two files named api.ts for fetching movies and useFetch.ts for for handaling all data,loadin,error,fetch,refetch etc. fetch movies from our api.ts, useFetch.ts hook that we created previously

### 4.4. (**Important**) Learn FlatList Component, for rendering movies data

### 4.5. Create a dynamic Movie cart component, Movie.tsx

### 4.6. Now develop search.tsx page.

### 4.7. In search.tsx file, make search functionality in searchBar user will find a movie by typing movies name

## 5. Search-functionality

- **Time-debouncing** for search functionality

1.  In React Native (and JavaScript in general), sometimes you want to prevent a function from running too often. For example:

- A search input field that triggers an API call whenever the user types.
- A button that should not trigger multiple times if tapped quickly.
- If you don’t control it, the function could run too many times and cause performance or API issues.

2.  Debouncing with setTimeout:
    - Debouncing means: wait for a pause in activity before running the function.
      ```
       useEffect(() => {
          const timeout = setTimeout(async () => {
             if (searchQuery.trim()) {
                await refetch(); // run API call if there's text
             } else {
                reset(); // clear results if input is empty
             }
                //This only runs after the user stops typing for 500ms
             }, 500);
          return () => clearTimeout(timeout);
      }, [searchQuery]); //runs whenever searchQuery changes
      ```

3.  _Why this works_
    - Every time the user types a new character, searchQuery changes → the `useEffect` runs.
    - A new setTimeout is scheduled.
    - Before scheduling the new one, React calls the cleanup function → `clearTimeout(timeout)` cancels the previous timer.
    - Only the final keystroke that sits untouched for 500ms allows the timer to complete and trigger `refetch()` or `reset()`.
    - So effectively, no matter how fast the user types, you’ll only run the network call once after they pause for 500ms.

## 6. appwrite.ts

1. setup appwrite
2. store all credentials to a .env file
3. create a Client import it from appwrite
   1. ````
      const client = new Client()
      .setEndpoint('https://fra.cloud.appwrite.io/v1')
      .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
      .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_PLATFORM!);

      const tablesDB = new TablesDB(client);```
      ````

4. to `read` appwrite's database data we use `listRows`
   1. `````
      awaittablesDB.listRows({
         databaseId: DATABASE_ID,
         tableId: 'metrics',
         queries: [Query.equal('searchTerm', query)],
      });````
      `````
5. in appwrite's database we can create (`write`) a row `createRow`
   1. `````
      await tablesDB.createRow(DATABASE_ID, 'metrics', ID.unique(), {
        searchTerm: query,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: movie.id,
        title: movie.title,
      });````
      `````
6. for update we use `updateRow`
   1. ````
      await tablesDB.updateRow(DATABASE_ID, 'metrics', existingMovie.$id, {
        count: existingMovie.count + 1,
      })```
      ````
7. track the searches made by a user, ( create a async function)
8. check if a record of that search has is already been stroed
9. if a document is found increment the search count
10. if no document is found
11. create a new document in appwrite database
