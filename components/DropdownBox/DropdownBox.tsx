import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { styles } from "./DropdownBox.styles";
import DownArrowIcon from "../../assets/icons/DownArrowIcon.svg";
import CheckBox from "../CheckBox/CheckBox";

interface DropdownBoxPropsType {
	placeholder: string;
	items: any[];
}

export default function DropdownBox({ placeholder, items }: DropdownBoxPropsType) {
	const [showItems, setShowItems] = useState<boolean>(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const isActive = true;

	return (
		<>
			<Pressable
				onPress={() => setShowItems(prev => !prev)}
				disabled={!isActive}
				style={[styles.dropdownBox, showItems && styles.showDropdownBox, !isActive && styles.inactiveDropdownBox]}
			>
				<Text style={[styles.text, !isActive && styles.inactiveText]}>
					{placeholder}
				</Text>
				<DownArrowIcon />
			</Pressable>
			{showItems &&
				<View style={[styles.itemContainer, showItems && styles.showItemContainer]}>
					<View style={styles.line}></View>
					{items.map(item => (
						<View style={styles.checkBoxContainer}>
							<CheckBox
								key={item.id}
								label={item.content}
							/>
						</View>
					))}
				</View>
			}
		</>
	);
}