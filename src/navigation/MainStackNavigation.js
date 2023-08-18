import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import NewBookScreen from "../screens/NewBookScreen";

const Stack = createNativeStackNavigator();

export default function MainStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen
        name="bookDetail"
        component={BookDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="newBookScreen"
        component={NewBookScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
