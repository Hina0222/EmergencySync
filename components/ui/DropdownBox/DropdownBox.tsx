import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { styles } from "./DropdownBox.styles";
import CheckBox from "../CheckBox/CheckBox";
import DownArrowIcon from "../../../assets/icons/DownArrowIcon.svg";
import Chip from "../Chip/Chip";

interface DropdownBoxPropsType {
	placeholder: string;
	items: { id: number; content: string }[];
}

export default function DropdownBox({ placeholder, items }: DropdownBoxPropsType) {
	const [showItems, setShowItems] = useState<boolean>(false);
	const [selectedItems, setSelectedItems] = useState<any[]>([]);
	const isActive = true;

	const toggleSelection = (id: number) => {
		setSelectedItems(prev =>
			prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
		);
	};

	const deleteItem = (id: number) => {
		setSelectedItems(prev => prev.filter(itemId => itemId !== id));
	};

	const renderItems = () => {
		return (
			items.filter(item => selectedItems.includes(item.id)).map((item) => (
				<Chip
					key={item.id}
					label={item.content}
					onDelete={() => deleteItem(item.id)}
				/>
			))
		);
	};

	return (
		<>
			<Pressable
				onPress={() => setShowItems(prev => !prev)}
				disabled={!isActive}
				style={[styles.dropdownBox, showItems && styles.showDropdownBox,
					!isActive && styles.inactiveDropdownBox, selectedItems.length > 0 && styles.itemsDropdownBox]
				}
			>
				{selectedItems.length > 0 ?
					<View style={styles.items}>
						{renderItems()}
					</View>
					:
					<Text style={[styles.text, !isActive && styles.inactiveText]}>
						{!isActive && "전체 선택" || placeholder}
					</Text>
				}
				<DownArrowIcon style={selectedItems.length > 0 && styles.itemsDropdownBoxIcon} />
			</Pressable>
			{showItems &&
				<View style={[styles.itemContainer, showItems && styles.showItemContainer]}>
					<View style={styles.line}></View>
					{items.map((item: { id: number; content: string }) => (
						<View key={item.id} style={styles.checkBoxContainer}>
							<CheckBox
								item={item}
								checked={selectedItems.includes(item.id)}
								onToggle={() => toggleSelection(item.id)}
							/>
						</View>
					))}
				</View>
			}
		</>
	);
}