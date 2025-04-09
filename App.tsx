import { StatusBar } from "expo-status-bar";
import SearchBar from "./components/ui/SearchBar/SearchBar";
import { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { enableScreens } from "react-native-screens";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import KakaoMap from "./screens/KakaoMap/KakaoMap";
import HospitalScreen from "./screens/HospitalScreen/HospitalScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./styles/theme";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import HospitalPopup from "./screens/HospitalScreen/components/HospitalPopup/HospitalPopup";
import { Provider, useAtom } from 'jotai';
import { selectedHospitalAtom } from './store/atoms';

enableScreens();
const Stack = createNativeStackNavigator();

function AppContent() {
	const [search, setSearch] = useState<string>("");
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [selectedHospital, setSelectedHospital] = useAtom(selectedHospitalAtom);

	const [fontsLoaded] = useFonts({
		"Pretendard": require("./assets/fonts/PretendardGOVVariable.ttf")
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<KakaoMap />
			{selectedHospital && (
				<HospitalPopup
					hospital={selectedHospital}
					onClose={() => setSelectedHospital(null)}
					isOpen={isSidebarOpen}
				/>
			)}

			<Sidebar onOpenChange={setIsSidebarOpen}>
				<SearchBar value={search} onChangeText={setSearch} placeholder="병원명 검색" />
				<NavigationContainer>
					<Stack.Navigator screenOptions={{
						headerShown: false,
						animation: "none",
						contentStyle: { backgroundColor: theme.white }
					}}>
						<Stack.Screen name="Search" component={SearchScreen} />
						<Stack.Screen name="HospitalScreen" component={HospitalScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</Sidebar>
		</SafeAreaView>
	);
}

export default function App() {
	return (
		<Provider>
			<AppContent />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black"
	}
});