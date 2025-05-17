import { FlatList, Pressable, View, Alert } from "react-native";
import { styles } from "./HospitalScreen.styles";
import { theme } from "../../styles/theme";
import LeftArrowIcon from "../../assets/icons/LeftArrowIcon.svg";
import HospitalItem from "./components/HospitalItem/HospitalItem";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import {
	selectedHospitalAtom,
	locationAtom,
	webViewRefAtom,
	hospitalsAtom,
	filteredHospitalsAtom
} from "../../store/atoms";
import { handleHospitalSelect, pickHospitalFields } from "../../util";
import Typography from "../../components/ui/Typography/Typography";

export default function HospitalScreen() {
	const navigation = useNavigation();
	const [filteredHospitals, setHospitals] = useAtom(filteredHospitalsAtom);
	const [_, setSelectedHospital] = useAtom(selectedHospitalAtom);
	const [location] = useAtom(locationAtom);
	const [webViewRef] = useAtom(webViewRefAtom);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => {
					navigation.goBack();
				}}>
					<LeftArrowIcon color={theme.black} width={24} height={24} />
				</Pressable>
			</View>
			{filteredHospitals.length > 0 ?
				<FlatList
					data={filteredHospitals}
					keyExtractor={(item) => item.hpid}
					renderItem={(itemData) => (
						<HospitalItem
							hospital={itemData.item}
							onPress={() => handleHospitalSelect(itemData.item, location, setSelectedHospital, webViewRef)}
						/>
					)}
				/>
				:
				<View style={styles.notice}>
					<Typography color="black" size="T2_bold">조건에 맞는 병원이 없습니다.</Typography>
				</View>
			}

		</View>
	);
}