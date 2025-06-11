import {useFonts} from 'expo-font';
import 'react-native-reanimated';
import App from "@/app/index";
import {View} from "react-native";

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <>
            <View>
                <App/>
            </View>
        </>
    );
}
