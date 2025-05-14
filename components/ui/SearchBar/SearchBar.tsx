import { useState } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { styles } from "./SearchBar.styles";
import { theme } from "../../../styles/theme";
import SearchIcon from "../../../assets/icons/SearchIcon.svg";
import Typography from "../Typography/Typography";
import { useAtom } from "jotai/index";
import { hospitalsAtom, locationAtom, selectedHospitalAtom, webViewRefAtom } from "../../../store/atoms";
import { handleHospitalSelect } from "../../../util";
import { Hospital } from "../../../types/hospital";

interface SearchBarPropsType {
	value: string;
	onChangeText: (search: string) => void;
	placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder }: SearchBarPropsType) {
	const [focused, setFocused] = useState(false);
	const [_, setSelectedHospital] = useAtom(selectedHospitalAtom);
	const [webViewRef] = useAtom(webViewRefAtom);
	const [location] = useAtom(locationAtom);
	const [hospitals] = useAtom(hospitalsAtom);

	const filteredHospitals = (hospitals ?? []).filter((hospital) =>
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
									handleHospitalSelect(item as Hospital, location, setSelectedHospital, webViewRef);
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
