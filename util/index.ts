import { Hospital } from "../types/hospital";

export function formatDate(dateStr: string): string {
	if (dateStr.length !== 14) return "";

	const year = dateStr.slice(0, 4);
	const month = dateStr.slice(4, 6);
	const day = dateStr.slice(6, 8);
	const hour = dateStr.slice(8, 10);
	const minute = dateStr.slice(10, 12);

	return `${year}-${month}-${day} ${hour}:${minute}`;
}

const hospitalKeys: (keyof Hospital)[] = [
	"hpid", "dutyName", "dutyTel3", "messages"
];

export function pickHospitalFields(data: any): Hospital {
	const result: Partial<Hospital> = {};
	for (const key of hospitalKeys) {
		if (key in data) result[key] = data[key];
	}
	return result as Hospital;
}