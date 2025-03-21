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
		<Pressable
			onPress={onPress}
			disabled={!isActive}
			style={({ pressed }) => [
				styles.button,
				!isActive && styles.inactiveButton,
				pressed && styles.pressed
			]}
		>
			<Text style={[styles.text, !isActive && styles.inactiveText]}>
				{children}
			</Text>
		</Pressable>
	);
}
