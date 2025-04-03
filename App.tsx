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
import { Hospital } from "./types/hospital";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
	// 전역상태 관리로 바꾸는게 나아보인디?
	const [search, setSearch] = useState<string>("");
	const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null); // 선택된 병원 정보 상태
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const [fontsLoaded] = useFonts({
		"Pretendard": require("./assets/fonts/PretendardGOVVariable.ttf")
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			{/*<KakaoMap />*/}
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
						<Stack.Screen name="HospitalScreen">
							{() => <HospitalScreen setSelectedHospital={setSelectedHospital} />}
						</Stack.Screen>
					</Stack.Navigator>
				</NavigationContainer>
			</Sidebar>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black"
	}
});