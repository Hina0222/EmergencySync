import { Pressable, View } from "react-native";
import { Hospital } from "../../../types/hospital";
import { styles } from "./HospitalItem.styles";
import Typography from "../../../components/ui/Typography/Typography";
import PhoneIcon from "../../../assets/icons/PhoneIcon.svg";
import TriangleIcon from "../../../assets/icons/TriangleIcon.svg";
import { useState } from "react";
import { NativeWebViewMacOS } from "react-native-webview/lib/WebViewTypes";

interface HospitalItemProps {
	hospital: Hospital;
}

export default function HospitalItem({ hospital }: HospitalItemProps) {
	const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

	return (
		<Pressable onPress={() => {
		}} style={styles.container}>
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
			<Pressable onPress={() => {
				setIsDescriptionOpen(prev => !prev);
			}
			} style={styles.descriptionContainer}>
				<View style={styles.description}>
					<View>
						<Typography color="neutral20" size="B2_medium" numberOfLines={1} ellipsizeMode="tail">
							<Typography color="neutral50" size="B2_medium">응급 </Typography>
							{hospital.descriptions[0]?.description}
						</Typography>
						<Typography color="neutral50" size="B2_medium">{hospital.descriptions[0]?.time}</Typography>
					</View>
				</View>
				{isDescriptionOpen ? <TriangleIcon transform={[{ scaleY: -1 }]} /> : <TriangleIcon />}
			</Pressable>
		</Pressable>
	);
}