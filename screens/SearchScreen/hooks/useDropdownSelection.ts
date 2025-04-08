import { useState } from "react";

export default function useDropdownSelection<T extends { id: string }>(items: T[]) {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const isAllSelected = selectedItems.length === items.length;

	const toggleAll = () => {
		setSelectedItems(isAllSelected ? [] : items.map(item => item.id));
	};

	const toggleItem = (id: string) => {
		setSelectedItems(prev =>
			prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
		);
	};

	const deleteItem = (id: string) => {
		setSelectedItems(prev => prev.filter(itemId => itemId !== id));
	};

	return {
		selectedItems,
		isAllSelected,
		toggleAll,
		toggleItem,
		deleteItem,
		setSelectedItems
	};
}