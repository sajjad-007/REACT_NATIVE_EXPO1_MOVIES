# Project initialize

1. follow expo documentation and install all dependenci, set up you porject
2. install nativewind for styling like tailwindCss
3. customize your metro.congig.js, change your input filed like below
   module.exports = withNativeWind(config, { input: './app/global.css' });

# create (tabs),movies folder and add it to the \_layout.tsx file in our root directory.

1. <Stack> <Stack.Screen name="(tabs)" option={{headerShown:false}}> </Stack>
2. <Stack> <Stack.Screen name="movies/[id]" option={{headerShown:false}}> </Stack>
3. [id].tsx for dynamic route, we will use it for movie's details

# (tabs) folder will organize our navigation files.

1. put index.tsx file from root directory to (tabs) folder, index.tsx will be our home page
2. create \_layout.tsx
3. create profile,saved,search files
4. we have to customize \_layout.tsx, add <Tabs> <Tabs.Screen name="index" option={{title:"Home",headerShown}}/> </Tabs>

# types-> images.d.ts =>

1. declare module "\*.png"
   - This matches any import that ends in .png.
   - Without it, if you try something like:
   - => import logo from "./logo.png";
   - TypeScript would throw an error like “Cannot find module './logo.png'” because it doesn’t know what a PNG is.
2. const content: any;
   - This declares that whatever gets imported is stored in a constant called content.
   - Its type is any, meaning “could be anything".
3. export default content;
   - This makes the PNG importable with import logo from "./logo.png";.
   - The value of logo will be whatever your bundler outputs.

- Why this is needed
  - TypeScript enforces types, and by default it only understands .ts, .tsx, .js, .jsx.
  - Declaring a module like this is a way to extend TypeScript’s type system to cover non-code assets.
