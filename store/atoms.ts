import { atom } from "jotai";
import * as Location from "expo-location";
import { Hospital } from "../types/hospital";
import WebView from "react-native-webview";
import { RefObject } from "react";

export const locationAtom = atom<Location.LocationObject | null>(null);

export const selectedHospitalAtom = atom<Hospital | null>(null);

export const webViewRefAtom = atom<RefObject<WebView> | null>(null);

export const hospitalsAtom = atom<Hospital[]>([]);