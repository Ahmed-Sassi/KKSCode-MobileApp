import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[query]" options={{ headerShown: false }} />
      <Stack.Screen name="createTask" options={{ headerShown: false }} />
      <Stack.Screen name="editTask" options={{ headerShown: false }} />
      <Stack.Screen name="report" options={{ headerShown: false }} />
      <Stack.Screen name="reportp" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
