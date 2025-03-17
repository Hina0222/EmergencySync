import { Pressable, Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { styles } from "./Button.styles";

interface ButtonPropsType {
	onPress: () => void;
	children: ReactNode;
	isActive: boolean;
}

export default function Button({ onPress, children, isActive }: ButtonPropsType) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPress}
			disabled={!isActive}
			style={[
				styles.button,
				!isActive && styles.inactiveButton
			]}
		>
			<Text style={[styles.text, !isActive && styles.inactiveText]}>
				{children}
			</Text>
		</TouchableOpacity>
	);
}
