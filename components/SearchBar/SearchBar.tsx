import { useState } from "react";
import { TextInput, View } from "react-native";
import { styles } from "./SearchBar.styles";
import { theme } from "../../styles/theme";
import SearchIcon from "../../assets/icons/SearchIcon.svg";

interface SearchBarPropsType {
	value: string;
	onChangeText: (search: string) => void;
	placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder }: SearchBarPropsType) {
	const [focused, setFocused] = useState(false);

	return (
		<View style={styles.container}>
			<SearchIcon />
			<TextInput
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={focused ? theme.neutral10 : theme.neutral60}
				style={styles.textInput}
			/>
		</View>
	);
}
