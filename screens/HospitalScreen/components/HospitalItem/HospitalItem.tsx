import { Pressable, View } from "react-native";
import { Hospital } from "../../../../types/hospital";
import { styles } from "./HospitalItem.styles";
import Typography from "../../../../components/ui/Typography/Typography";
import PhoneIcon from "../../../../assets/icons/PhoneIcon.svg";
import Description from "../Description/Description";

interface HospitalItemProps {
	hospital: Hospital;
	onPress: () => void;
}

export default function HospitalItem({ hospital, onPress }: HospitalItemProps) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
		>
			<View style={styles.title}>
				<Typography color="neutral10" size="H3">{hospital.dutyName}</Typography>
				<Typography color="neutral50" size="T1">{hospital.distance}km</Typography>
			</View>
			<View style={styles.phone}>
				<PhoneIcon />
				<Typography color="green20" size="T4_medium">{hospital.dutyTel3}</Typography>
			</View>
			<View style={styles.info}>
				<Typography color="neutral30" size="T3_semibold">예상 소요 시간</Typography>
				<View style={{ flexDirection: "row", gap: 8 }}>
					<Typography color="red50" size="T3_semibold">{hospital.estimate}분</Typography>
					<Typography color="neutral10" size="T3_semibold">13:30 도착 예정</Typography>
				</View>
			</View>
			<View style={styles.info}>
				<Typography color="neutral30" size="T3_semibold">응급실 혼잡도</Typography>
				{/*<Typography color="neutral10" size="T3_semibold">{hospital.nowCongestion}/{hospital.maxCongestion}</Typography>*/}
			</View>
			<Description hospital={hospital} type="list" />
		</Pressable>
	);
}