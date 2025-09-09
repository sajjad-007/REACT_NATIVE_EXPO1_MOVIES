# Project initialize

1. follow expo documentation and install all dependenci, set up you porject
2. install nativewind for styling like tailwindCss
3. customize your metro.congig.js, change your input filed like below
   module.exports = withNativeWind(config, { input: './app/global.css' });

# create (tabs),movies folder and add it to \_layout.tsx file in our root directory

1. <Stack> <Stack.Screen name="(tabs)" option={{headerShown:false}}> </Stack>
2. <Stack> <Stack.Screen name="movies/[id]" option={{headerShown:false}}> </Stack>
3. [id].tsx for dynamic route, we will use it for movie's details

# (tabs) folder will organize our navigation files

1. put index.tsx file into (tabs) folder, index.tsx will be our home page
2. create \_layout.tsx
3. create profile,saved,search files
4. we have to customize \_layout.tsx, add <Tabs> <Tabs.Screen name="index" option={{title:"Home",headerShown}}/> </Tabs>
