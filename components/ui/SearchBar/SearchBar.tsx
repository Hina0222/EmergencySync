import { useState } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { styles } from "./SearchBar.styles";
import { theme } from "../../../styles/theme";
import SearchIcon from "../../../assets/icons/SearchIcon.svg";
import Typography from "../Typography/Typography";

interface SearchBarPropsType {
	value: string;
	onChangeText: (search: string) => void;
	placeholder?: string;
	onSelect?: (hpid: string) => void;
}

const hospitals = [
	{ hpid: "A2400002", dutyName: "abcd" },
	{ hpid: "A2400005", dutyName: "충청남도천안의료원" },
	{ hpid: "A2400001", dutyName: "학교법인동은학원순천향대학교부속천안병원" },
	{ hpid: "A2400012", dutyName: "의료법인영서의료재단천안충무병원" }
];

export default function SearchBar({ value, onChangeText, placeholder, onSelect }: SearchBarPropsType) {
	const [focused, setFocused] = useState(false);

	const filteredHospitals = hospitals.filter((hospital) =>
		hospital.dutyName.toLowerCase().includes(value.toLowerCase())
	);

	return (
		<View style={styles.viewContainer}>
			<View style={[styles.container, focused && styles.focus]}>
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

			{focused && value.length > 0 && filteredHospitals.length > 0 && (
				<View>
					<FlatList
						data={filteredHospitals}
						keyExtractor={(item) => item.hpid}
						style={styles.list}
						keyboardShouldPersistTaps="handled"
						renderItem={({ item }) => (
							<Pressable
								onPress={() => {
									onChangeText(item.dutyName);
									setFocused(false);
									onSelect?.(item.hpid);
								}}
								style={({ pressed }) => [
									styles.listItem,
									pressed && { backgroundColor: theme.neutral95 }
								]}
							>
								<Typography color="neutral10" size="T3_bold">
									{item.dutyName}
								</Typography>
							</Pressable>
						)}
					/>
				</View>
			)}
		</View>
	);
}
