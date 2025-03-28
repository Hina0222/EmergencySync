import { useRef } from "react";
import { SafeAreaView, View } from "react-native";
import WebView from "react-native-webview";
import { styles } from "./KakaoMap.styles";

export default function KakaoMap() {
	const webViewRef = useRef(null);

	const html = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ec5ecebbfc5d51a7620ae20cba6a8310&libraries=services,clusterer,drawing"></script> 
    </head>
    <body >
        <div id="map" style="width:100%;height:100%;"></div>
        <script type="text/javascript">
            (function () {
                const container = document.getElementById('map');
                const options = { 
                    center: new kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3 
                };
                
                const map = new kakao.maps.Map(container, options); 
                
                const geocoder = new kakao.maps.services.Geocoder();
            })();
        </script>       
    </body>
</html>    
`;

	return (
		<SafeAreaView style={styles.container}>
			<WebView
				ref={webViewRef}
				source={{ html: html }}
				originWhitelist={["*"]}
				javaScriptEnabled
			/>
		</SafeAreaView>
	);
}