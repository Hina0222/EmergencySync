import { Pressable, View, Dimensions, Animated } from "react-native";
import { styles } from "./HospitalPopup.styles";
import Typography from "../../../../components/ui/Typography/Typography";
import PhoneIcon from "../../../../assets/icons/PhoneIcon.svg";
import ArrowDownLeftIcon from "../../../../assets/icons/ArrowDownLeftIcon.svg";
import ArrowUpRightIcon from "../../../../assets/icons/ArrowUpRightIcon.svg";
import Description from "../Description/Description";
import { Hospital } from "../../../../types/hospital";
import { useEffect, useRef, useState } from "react";

interface HospitalPopupProps {
	hospital: Hospital;
	onClose: () => void;
	isOpen?: boolean;
}

export default function HospitalPopup({ hospital, onClose, isOpen }: HospitalPopupProps) {
	const [isShow, setIsShow] = useState<boolean>(true);
	const screenWidth = Dimensions.get("window").width;
	const sidebarWidth = screenWidth * 0.3;
	const centerPosition = (screenWidth - sidebarWidth) / 2;
	const containerWidth = screenWidth - sidebarWidth;

	const animatedRight = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const toValue = isOpen ? centerPosition + sidebarWidth : screenWidth / 2;
		Animated.timing(animatedRight, {
			toValue,
			useNativeDriver: false
		}).start();
	}, [isOpen]);

	return (
		<Animated.View style={[styles.container, { width: containerWidth - 200, right: animatedRight }]}>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View style={styles.title}>
					<Typography color="neutral10" size="H3">{hospital.name}</Typography>
					<Typography color="neutral50" size="T1">{hospital.distance}km</Typography>
					<View style={styles.phone}>
						<PhoneIcon />
						<Typography color="green20" size="T4_medium">{hospital.phone}</Typography>
					</View>
				</View>
				<Pressable onPress={() => {
					setIsShow(prev => !prev);
				}}>
					{isShow ? <ArrowDownLeftIcon /> : <ArrowUpRightIcon />}
				</Pressable>
			</View>
			<View style={{ gap: 4 }}>
				<View style={styles.info}>
					<Typography color="neutral30" size="T3_semibold">예상 소요 시간</Typography>
					<Typography color="red50" size="T3_semibold">{hospital.estimate}분</Typography>
					<Typography color="neutral10" size="T3_semibold">13:30 도착 예정</Typography>
				</View>
				{isShow &&
					<View>
						<View style={styles.info}>
							<Typography color="neutral30" size="T3_semibold">응급실 혼잡도</Typography>
							<Typography color="neutral10"
													size="T3_semibold">{hospital.nowCongestion}/{hospital.maxCongestion}</Typography>
						</View>
						<Description hospital={hospital} type="popup" />
						<View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
							<Pressable onPress={onClose} style={styles.close}>
								<Typography color="neutral10" size="B2_semibold">이송취소</Typography>
							</Pressable>
						</View>
					</View>
				}
			</View>
		</Animated.View>
	);
}
