import { FlatList, Pressable, View, Alert } from "react-native";
import { styles } from "./HospitalScreen.styles";
import { theme } from "../../styles/theme";
import { HOSPITALS_MOCK } from "../../mock";
import LeftArrowIcon from "../../assets/icons/LeftArrowIcon.svg";
import HospitalItem from "./components/HospitalItem/HospitalItem";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { selectedHospitalAtom, locationAtom, webViewRefAtom } from "../../store/atoms";
import { Hospital } from "../../types/hospital";
import { getCarDirection } from "../../apis/kakaoMap/getCarDirection";

export default function HospitalScreen() {
	const navigation = useNavigation();
	const [_, setSelectedHospital] = useAtom(selectedHospitalAtom);
	const [location] = useAtom(locationAtom);
	const [webViewRef] = useAtom(webViewRefAtom);

	const handleHospitalSelect = async (hospital: Hospital) => {
		setSelectedHospital(hospital);

		if (!location) {
			console.log("알림", "현재 위치를 가져오지 못했습니다. 위치 권한을 확인해 주세요.");
			return;
		}

		if (!hospital.longitude || !hospital.latitude) {
			console.log("알림", "선택된 병원의 위치 정보가 없습니다.");
			return;
		}

		// 경로 계산 및 표시 로직
		try {
			const destinationPosition = {
				longitude: hospital.longitude,
				latitude: hospital.latitude
			};

			const result = await getCarDirection(location, destinationPosition);

			// WebView에 경로 데이터 전송
			webViewRef?.current?.postMessage(
				JSON.stringify({
					type: "DRAW_LINE_PATH",
					routes: result.routes
				})
			);
		} catch (error) {
			console.error("경로 계산 오류:", error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => {
					navigation.goBack();
				}}>
					<LeftArrowIcon color={theme.black} width={24} height={24} />
				</Pressable>
			</View>
			<FlatList
				data={HOSPITALS_MOCK}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => (
					<HospitalItem
						hospital={itemData.item}
						onPress={() => handleHospitalSelect(itemData.item)}
					/>
				)}
			/>
		</View>
	);
}