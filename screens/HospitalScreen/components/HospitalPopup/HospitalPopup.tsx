import { Pressable, View } from "react-native";
import { styles } from "./HospitalPopup.styles";
import Typography from "../../../../components/ui/Typography/Typography";
import PhoneIcon from "../../../../assets/icons/PhoneIcon.svg";
import Description from "../Description/Description";
import { Hospital } from "../../../../types/hospital";

interface HospitalPopupProps {
	hospital: Hospital;
	onClose: () => void;
}

export default function HospitalPopup({ hospital, onClose }: HospitalPopupProps) {
	return (
		<View style={styles.container}>
			<View style={styles.title}>
				<Typography color="neutral10" size="H3">{hospital.name}</Typography>
				<Typography color="neutral50" size="T1">{hospital.distance}km</Typography>
			</View>
			<View style={styles.phone}>
				<PhoneIcon />
				<Typography color="green20" size="T4_medium">{hospital.phone}</Typography>
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
				<Typography color="neutral10" size="T3_semibold">{hospital.nowCongestion}/{hospital.maxCongestion}</Typography>
			</View>
			<Description hospital={hospital}/>
			<Pressable onPress={onClose}>
				<Typography color="red50" size="T3_semibold">닫기</Typography>
			</Pressable>
		</View>
	);
}
