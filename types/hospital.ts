export type Description = {
	descriptionId: string;
	description: string;
	time: string;
};

export interface Hospital {
	id: string;
	name: string;
	distance: number;
	phone: string;
	estimate: number;
	nowCongestion: number;
	maxCongestion: number;
	descriptions: Description[];
	longitude?: number;
	latitude?: number;
	address?: string;
}
