## 0.1. Navigate Content

- [Installation](#installation)
- [Usage](#Usage)
- [Search-functionality](#Search-functionality)

## 0.2. Installation

1. follow expo [documentation](https://docs.expo.dev/) and install all dependenci, set up you porject
2. install nativewind for styling like tailwindCss
3. customize your metro.congig.js, change your input filed like below
   `module.exports = withNativeWind(config, { input: './app/global.css' });`

## 0.3. Usage

1. To Run your project in your local machine
   `npx expo start `
2. install expo go mobile app
3. Make sure your project version(sdk53) is similliar to your expo go(sdk53) mobile app

## 0.4. create (tabs) and movies folder, add it to the \_layout.tsx file in our root directory.

1. <Stack> <Stack.Screen name="(tabs)" option={{headerShown:false}}> </Stack>
2. <Stack> <Stack.Screen name="movies/[id]" option={{headerShown:false}}> </Stack>
3. [id].tsx for dynamic route, we will use it for movie's details

## 0.5. (tabs) folder will organize our navigation files, (tabs) use for grouping a section.

1. put `index.tsx` file from root directory to `(tabs) folder`, index.tsx will be our home page
2. create `\_layout.tsx`
3. create profile,saved,search files (.tsx)
4. `we have to customize \_layout.tsx, add <Tabs> <Tabs.Screen name="index" option={{title:"Home",headerShown}}/> </Tabs>`

## 0.6. Image

- images.d.ts
- How to set up a file to import images for typescript

1. `declare module "\*.png"`
   - This matches any import that ends in ` .png.`
   - Without it, if you try something like:
   - `import logo from "./logo.png";`
   - TypeScript would throw an error like **“Cannot find module './logo.png'”** because it doesn’t know what a PNG is.
2. const content: any;
   - This declares that whatever gets imported is stored in a constant called content.
   - Its type is any, meaning “could be anything".
3. export default content;
   - This makes the PNG importable with import logo from "./logo.png";.
   - The value of logo will be whatever your bundler outputs.

- Why this is needed
  - TypeScript enforces types, and by default it only understands .ts, .tsx, .js, .jsx.
  - Declaring a module like this is a way to extend TypeScript’s type system to cover non-code assets.

# 1. api.ts: create a custom movie fetching function (TMDB)

# 2. useFetch.ts: create a custom hook for handaling all data,fetching,error and for loading

# 3. In index.tsx file, fetch movies from our api.ts, useFetch.ts hook that we created previously

# 4. (**Important**) Learn FlatList Component, for rendering movies data

# 5. Create a dynamic Movie cart component, Movie.tsx

# 6. Now develop search.tsx page.

# 7. In search.tsx file, make search functionality in searchBar user will find a movie by typing movies name

## 7.1. Search-functionality

- **Time-debouncing** for search functionality

1.  In React Native (and JavaScript in general), sometimes you want to prevent a function from running too often. For example:
    1. A search input field that triggers an API call whenever the user types.
    2. A button that should not trigger multiple times if tapped quickly.
    3. If you don’t control it, the function could run too many times and cause performance or API issues.

2.  Debouncing with setTimeout:
    - Debouncing means: wait for a pause in activity before running the function.
      ````
       useEffect(() => {
          const timeout = setTimeout(async () => {
             if (searchQuery.trim()) {
                await refetch(); /*run API call if there's text*/
             } else {
                reset(); // clear results if input is empty
             }
                //This only runs after the user stops typing for 500ms
             }, 500);
          return () => clearTimeout(timeout);
      }, [searchQuery]); //runs whenever searchQuery changes ```
      ````

3.  _Why this works_
    - Every time the user types a new character, searchQuery changes → the useEffect runs.
    - A new setTimeout is scheduled.
    - Before scheduling the new one, React calls the cleanup function → clearTimeout(timeout) cancels the previous timer.
    - Only the final keystroke that sits untouched for 500ms allows the timer to complete and trigger refetch() or reset().
4.  So effectively, no matter how fast the user types, you’ll only run the network call once after they pause for 500ms.
