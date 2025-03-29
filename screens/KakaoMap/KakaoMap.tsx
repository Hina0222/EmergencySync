import { useRef, useEffect, useState } from "react";
import { SafeAreaView, View, Alert } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { styles } from "./KakaoMap.styles";
import * as Location from "expo-location";
import { LocationData } from "../../types/map";

export default function KakaoMap() {
	const webViewRef = useRef<WebView>(null);
	const locationSubscriptionRef = useRef<Location.LocationSubscription | null>(null);

	const [webViewLoaded, setWebViewLoaded] = useState(false);
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [isLocationLoading, setIsLocationLoading] = useState(false);

	// 위치 권한 요청 및 위치 추적 시작
	const startLocationTracking = async () => {
		setIsLocationLoading(true);
		try {
			// 위치 권한 요청
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("알림", "위치 기능을 사용하려면 위치 권한이 필요합니다.");
				setIsLocationLoading(false);
				return;
			}

			// 이전 구독이 있다면 취소
			if (locationSubscriptionRef.current) {
				locationSubscriptionRef.current.remove();
			}

			console.log("위치 추적 시작...");

			// 위치 추적 시작
			const subscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 5000,
					distanceInterval: 0
				},
				(newLocation) => {
					console.log("위치 업데이트:", new Date().toLocaleTimeString(), newLocation.coords);
					setLocation(newLocation);

					// 위치 데이터 만들기 및 지도 이동
					const locationData: LocationData = {
						latitude: newLocation.coords.latitude,
						longitude: newLocation.coords.longitude,
						name: "현재 위치"
					};
					moveToLocation(locationData);
				}
			);

			// 구독 저장
			locationSubscriptionRef.current = subscription;
			console.log("위치 추적 구독 완료");

			// 처음 위치 가져오기 (추적 시작 전에 바로 위치 가져오기)
			const initialLocation = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High
			});

			setLocation(initialLocation);
			console.log("초기 위치:", initialLocation.coords);

			// 위치 데이터 만들기
			const locationData: LocationData = {
				latitude: initialLocation.coords.latitude,
				longitude: initialLocation.coords.longitude,
				name: "현재 위치"
			};

			// 지도 이동
			moveToLocation(locationData);

		} catch (error) {
			console.error("위치 가져오기 오류:", error);
			Alert.alert("오류", "위치 정보를 가져오는데 실패했습니다.");
		} finally {
			setIsLocationLoading(false);
		}
	};

	// 위치 추적 정지
	const stopLocationTracking = () => {
		if (locationSubscriptionRef.current) {
			locationSubscriptionRef.current.remove();
			locationSubscriptionRef.current = null;
			console.log("위치 추적 정지");
		}
	};

	// 지도를 특정 위치로 이동
	const moveToLocation = (locationData: LocationData) => {
		if (webViewRef.current && webViewLoaded) {
			console.log("위치 데이터 전송:", locationData);
			webViewRef.current.postMessage(JSON.stringify(locationData));
		} else {
			console.log("WebView가 아직 로드되지 않았습니다. 위치 데이터:", locationData);
			// WebView가 로드되지 않은 경우를 위해 위치 데이터 저장
			setLocation({
				coords: {
					latitude: locationData.latitude,
					longitude: locationData.longitude,
					altitude: null,
					accuracy: null,
					altitudeAccuracy: null,
					heading: null,
					speed: null
				},
				timestamp: Date.now()
			});
		}
	};

	// WebView 로드 완료 시 저장된 위치로 이동
	useEffect(() => {
		if (webViewLoaded && location) {
			const locationData: LocationData = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				name: "현재 위치"
			};
			moveToLocation(locationData);
		}
	}, [webViewLoaded]);

	// 컴포넌트 마운트 시 위치 권한 및 위치 추적 시작
	useEffect(() => {
		startLocationTracking();

		// 컴포넌트 언마운트 시 위치 추적 정지
		return () => {
			stopLocationTracking();
		};
	}, []);

	const html = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ec5ecebbfc5d51a7620ae20cba6a8310&libraries=services,clusterer,drawing"></script> 
    </head>
    <body>
        <div id="map" style="width:100%;height:100%;"></div>
        <script type="text/javascript">
            let map;
            let currentMarker = null; 
            
            // 지도 초기화
            function initMap() {
                const container = document.getElementById('map');
                const options = { 
                    center: new kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3 
                };
                
                map = new kakao.maps.Map(container, options);
                
                // 초기화 완료 알림
                setTimeout(() => {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'MAP_READY',
                        success: true
                    }));
                }, 1000);
            }

            window.addEventListener('message', function(e) {
                handleMessage(e.data);
            });

            document.addEventListener('message', function(e) {
                handleMessage(e.data);
            });
            
            // 메시지 처리 함수
            function handleMessage(messageData) {
                try {
                    console.log('메시지 수신됨:', messageData);
                    const data = JSON.parse(messageData);
                    console.log('파싱된 데이터:', data);
                    
                    // 받은 위치로 지도 중심 이동
                    if (map && data.latitude && data.longitude) {
                        const newPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
                        map.setCenter(newPosition);
                        
                        // 기존 마커 제거
                        if (currentMarker) {
                            currentMarker.setMap(null);
                        }
                        
                        // 새 마커 생성
                        currentMarker = new kakao.maps.Marker({
                            position: newPosition
                        });
                        
                        // 마커를 지도에 표시
                        currentMarker.setMap(map);
                        
                        // 위치 이동 완료 알림
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'LOCATION_UPDATED',
                            success: true,
                            location: {
                                latitude: data.latitude,
                                longitude: data.longitude,
                                name: data.name
                            }
                        }));
                    } else {
                        throw new Error('지도가 초기화되지 않았거나 위치 데이터가 올바르지 않습니다');
                    }
                } catch (error) {
                    console.error('데이터 처리 오류:', error);
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'ERROR',
                        success: false,
                        message: error.message
                    }));
                }
            }
            
            // Kakao 지도 SDK가 로드된 후 지도 초기화
            kakao.maps.load(initMap);
        </script>       
    </body>
</html>    
`;

	const onMessage = (event: WebViewMessageEvent) => {
		try {
			const data = JSON.parse(event.nativeEvent.data);
			console.log("React Native에서 웹뷰 응답 수신:", data);

			// 지도 준비 완료 메시지 처리
			if (data.type === "MAP_READY") {
				setWebViewLoaded(true);
				console.log("카카오맵 준비 완료");
			}

			// 위치 업데이트 완료 메시지 처리
			if (data.type === "LOCATION_UPDATED") {
				console.log("위치가 업데이트되었습니다:", data.location);
			}

			// 오류 메시지 처리
			if (data.type === "ERROR") {
				console.error("웹뷰 오류:", data.message);
				Alert.alert("오류", "지도 처리 중 오류가 발생했습니다: " + data.message);
			}
		} catch (error) {
			console.error("메시지 파싱 오류:", error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<WebView
					ref={webViewRef}
					source={{ html: html }}
					originWhitelist={["*"]}
					javaScriptEnabled
					onMessage={onMessage}
				/>
			</View>
		</SafeAreaView>
	);
}