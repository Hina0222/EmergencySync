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
import { useEffect, useState } from "react";
import { getHospitalsInfo } from "../../apis/hospital/getHospitalsInfo";
import { pickHospitalFields } from "../../util";

export default function HospitalScreen() {
	const navigation = useNavigation();
	const [hospitalsInfo, setHospitalInfo] = useState<Hospital[]>([]);
	const [_, setSelectedHospital] = useAtom(selectedHospitalAtom);
	const [location] = useAtom(locationAtom);
	const [webViewRef] = useAtom(webViewRefAtom);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getHospitalsInfo();
			const filteredHospitals = result.map(pickHospitalFields).map((hospital: any) => {
				return {
					...hospital,
					latitude: hospital.hpid === "A2400002" ? 36.84295215169462 :
						hospital.hpid === "A2400005" ? 36.775359921186194 :
							hospital.hpid === "A2400001" ? 36.8023584971179 :
								hospital.hpid === "A2400012" ? 36.79739687904163 :
									null,
					longitude: hospital.hpid === "A2400002" ? 127.17327537305154 :
						hospital.hpid === "A2400005" ? 127.17992025598447 :
							hospital.hpid === "A2400001" ? 127.135666806479 :
								hospital.hpid === "A2400012" ? 127.13157820432319 :
									null
				};
			});
			console.log(filteredHospitals);
			setHospitalInfo(filteredHospitals);
		};

		fetchData();
	}, []);

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
				data={hospitalsInfo}
				keyExtractor={(item) => item.hpid}
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