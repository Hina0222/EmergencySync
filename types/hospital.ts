export type Description = {
	descriptionId: number;
	description: string;
	time: string;
}

export interface Hospital {
	id: string;
	name: string;
	distance: number;
	phone: string;
	estimate: number;
	nowCongestion: number;
	maxCongestion: number;
	descriptions: Description[];
}