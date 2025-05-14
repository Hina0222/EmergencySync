import { StatusBar } from "expo-status-bar";
import SearchBar from "./components/ui/SearchBar/SearchBar";
import { useEffect, useState } from "react";
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
import { Provider, useAtom } from "jotai";
import { hospitalsAtom, locationAtom, selectedHospitalAtom, webViewRefAtom } from "./store/atoms";
import { getHospitalsInfo } from "./apis/hospital/getHospitalsInfo";
import { pickHospitalFields } from "./util";
import { getCarDirection } from "./apis/kakaoMap/getCarDirection";

enableScreens();
const Stack = createNativeStackNavigator();

function AppContent() {
	const [search, setSearch] = useState<string>("");
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [selectedHospital, setSelectedHospital] = useAtom(selectedHospitalAtom);
	const [webViewRef] = useAtom(webViewRefAtom);
	const [_, setHospitals] = useAtom(hospitalsAtom);
	const [location, setLocation] = useAtom(locationAtom);

	const [fontsLoaded] = useFonts({
		"Pretendard": require("./assets/fonts/PretendardGOVVariable.ttf")
	});

	useEffect(() => {
		const fetchData = async () => {
			if (!location) return;

			const result = await getHospitalsInfo();
			const filteredHospitals = result.map(pickHospitalFields);

			const hospitalsWithDistance = await Promise.all(
				filteredHospitals.map(async (hospital: any) => {
					if (!hospital.wgs84Lon || !hospital.wgs84Lat) return hospital;

					try {
						const destinationPosition = {
							longitude: hospital.wgs84Lon,
							latitude: hospital.wgs84Lat
						};

						const directionResult = await getCarDirection(location, destinationPosition);

						const distance = directionResult.routes[0].summary?.distance ?? 0;
						const duration = directionResult.routes[0].summary?.duration ?? 0;

						const distanceKm = (distance / 1000).toFixed(1);
						const estimateMin = Math.ceil(duration / 60);

						return {
							...hospital,
							distance: distanceKm,
							estimate: estimateMin
						};
					} catch (e) {
						console.error("경로 계산 실패:", e);
						return hospital;
					}
				})
			);

			setHospitals(hospitalsWithDistance);
		};

		fetchData();
		console.log("다시 실행");
	}, [location]);

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
					onClose={() => {
						setSelectedHospital(null);
						webViewRef?.current?.postMessage(
							JSON.stringify({
								type: "CLEAR_LINE_PATH"
							})
						);
					}}
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