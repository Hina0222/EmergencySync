import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { styles } from "./DropdownBox.styles";
import CheckBox from "../CheckBox/CheckBox";
import DownArrowIcon from "../../../assets/icons/DownArrowIcon.svg";
import Chip from "../Chip/Chip";

interface DropdownBoxPropsType {
	placeholder: string;
	items: { id: string; content: string }[];
	selectedItems: string[];
	toggleItem: (id: string) => void;
	deleteItem: (id: string) => void;
}

export default function DropdownBox({ placeholder, items, selectedItems, toggleItem , deleteItem }: DropdownBoxPropsType) {
	const [showItems, setShowItems] = useState<boolean>(false);
	const isAllSelected = items.length === selectedItems.length;

	const renderItems = () => {
		return items
			.filter(item => selectedItems.includes(item.id))
			.map((item) => (
				<Chip
					key={item.id}
					label={item.content}
					onDelete={() => deleteItem(item.id)}
				/>
			));
	};

	return (
		<>
			<Pressable
				onPress={() => setShowItems(prev => !prev)}
				disabled={isAllSelected}
				style={[
					styles.dropdownBox,
					(showItems && !isAllSelected) && styles.showDropdownBox,
					isAllSelected && styles.inactiveDropdownBox,
					selectedItems.length > 0 && styles.itemsDropdownBox
				]}
			>
				{(selectedItems.length > 0 && !isAllSelected) ? (
					<View style={styles.items}>{renderItems()}</View>
				) : (
					<Text style={[styles.text, isAllSelected && styles.inactiveText]}>
						{isAllSelected && "전체 선택" || placeholder}
					</Text>
				)}
				<DownArrowIcon
					style={selectedItems.length > 0 && styles.itemsDropdownBoxIcon}
				/>
			</Pressable>
			{(showItems && !isAllSelected) && (
				<View style={[styles.itemContainer, showItems && styles.showItemContainer]}>
					<View style={styles.line}></View>
					{items.map((item) => (
						<View key={item.id} style={styles.checkBoxContainer}>
							<CheckBox
								item={item}
								checked={selectedItems.includes(item.id)}
								onToggle={() => toggleItem(item.id)}
							/>
						</View>
					))}
				</View>
			)}
		</>
	);
}