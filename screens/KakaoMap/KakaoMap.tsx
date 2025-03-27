import { useRef } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
// import { KAKAO_MAP_HTML } from "./KakaoMapHTML";
import { styles } from "./KakaoMap.styles";

export default function KakaoMap() {
	const webViewRef = useRef(null);

	const KAKAO_MAP_HTML = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey="></script>
    </head>
    <body>
      <div id="map" style="width:500px; height:500px;"></div>
      <script>
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        };
        var map = new kakao.maps.Map(container, options);
        var marker = new kakao.maps.Marker({ position: map.getCenter() });
        marker.setMap(map);
      </script>
    </body>
    </html>
  `;

	return (
		<View style={styles.container}>
			<WebView
				ref={webViewRef}
				originWhitelist={["*"]}
				source={{ html: KAKAO_MAP_HTML }}
				javaScriptEnabled
			/>
		</View>
	);
}