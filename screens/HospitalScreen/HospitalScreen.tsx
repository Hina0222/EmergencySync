import { FlatList, Pressable, View } from "react-native";
import { styles } from "./HospitalScreen.styles";
import { theme } from "../../styles/theme";
import { HOSPITALS_MOCK } from "../../mock";
import LeftArrowIcon from "../../assets/icons/LeftArrowIcon.svg";
import HospitalItem from "./components/HospitalItem/HospitalItem";
import { useNavigation } from "@react-navigation/native";

export default function HospitalScreen({ setSelectedHospital }: any) {
	const navigation = useNavigation();

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
					<HospitalItem hospital={itemData.item} onPress={() => setSelectedHospital(itemData.item)} />
				)}
			/>
		</View>
	);
}