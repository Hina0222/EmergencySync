import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { styles } from "./CheckBox.styles";
import CheckIcon from "../../assets/icons/CheckIcon.svg";

interface CheckBoxPropsType {
	label: string;
}

export default function CheckBox({ label }: CheckBoxPropsType) {
	// 데이터 넘기는 거 반영해야함
	const [checked, setChecked] = useState<boolean>(true);

	const toggleCheck = () => {
		setChecked(prev => !prev);
	};

	return (
		<TouchableOpacity onPress={toggleCheck} activeOpacity={1} style={styles.container}>
			<View style={[styles.checkbox, checked && styles.checked]}>
				{checked && <CheckIcon />}
			</View>
			<Text style={styles.text}>{label}</Text>
		</TouchableOpacity>
	);
}