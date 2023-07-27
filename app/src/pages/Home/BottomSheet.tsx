import {BottomSheetModal, BottomSheetModalProps} from '@gorhom/bottom-sheet';
import React, {forwardRef, useMemo} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../../elements/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContents} from '../../contexts/contents';
import {Content as ContentType} from '../../constants/content';

type BottomSheetProps = Pick<BottomSheetModalProps, 'onDismiss'>;
interface PresentData {
  name: string;
}

function Content({data: presentData}: {data: PresentData}) {
  const {allContents} = useContents();
  const {name, naverMapId, kakaoMapId, appleMapId, catchTableLink} =
    allContents.find(c => c.name === presentData.name) as ContentType;

  const thirdPartyApps = useMemo(() => {
    const apps = [];
    if (naverMapId) {
      apps.push({
        link: `nmap://place?id=${naverMapId}`,
        source: require('../../../assets/third-party-apps/naver-map.png'),
      });
    }
    if (kakaoMapId) {
      apps.push({
        link: `kakaomap://place?id=${naverMapId}`,
        source: require('../../../assets/third-party-apps/kakao-map.png'),
      });
    }
    if (appleMapId && Platform.OS === 'ios') {
      apps.push({
        link: `maps://?auid=${naverMapId}`,
        source: require('../../../assets/third-party-apps/apple-map.png'),
      });
    }
    if (catchTableLink) {
      apps.push({
        link: catchTableLink,
        source: require('../../../assets/third-party-apps/catch-table.png'),
      });
    }
    return apps;
  }, [appleMapId, catchTableLink, kakaoMapId, naverMapId]);

  return (
    <View style={styles.contentContainer}>
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.thirdPartyAppContainer}>
          {thirdPartyApps.map(({link, source}) => (
            <TouchableOpacity
              key={link}
              onPress={() => Linking.openURL(link ?? '')}>
              <Image style={styles.thirdPartyApp} source={source} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({onDismiss}, ref) => {
    const {top} = useSafeAreaInsets();
    const snapPoints = useMemo(
      // 디자인상 계산된 값
      () => [
        168 + Dimensions.get('window').width / 3,
        Dimensions.get('window').height - top,
      ],
      [top],
    );
    return (
      <BottomSheetModal
        ref={ref}
        onDismiss={onDismiss}
        snapPoints={snapPoints}
        handleStyle={styles.handleStyle}
        backgroundStyle={styles.backgroundStyle}
        enablePanDownToClose
        children={Content}
      />
    );
  },
);

const styles = StyleSheet.create({
  handleStyle: {
    display: 'none',
  },
  backgroundStyle: {
    borderRadius: 0,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 24,
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  hashTagScrollView: {
    paddingHorizontal: 16,
    gap: 4,
  },
  recommandHashTagBox: {
    borderRadius: 12,
    backgroundColor: '#eee',
    height: 24,
    paddingHorizontal: 8,
  },
  recommandHashTag: {
    lineHeight: 24,
    fontSize: 12,
    color: '#000',
  },
  hashTag: {
    lineHeight: 24,
    color: '#000',
  },
  hashTagHighlight: {
    fontWeight: 'bold',
  },
  thirdPartyAppContainer: {
    padding: 16,
    flexDirection: 'row',
    gap: 16,
  },
  thirdPartyApp: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  instaHeader: {
    flexDirection: 'row',
    height: 48,
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  instaHeaderText: {
    lineHeight: 16,
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  InstaRow: {
    flexDirection: 'row',
  },
  instaItem: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  },
});

export default BottomSheet;
