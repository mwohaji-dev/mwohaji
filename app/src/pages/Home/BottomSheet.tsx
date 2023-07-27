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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContents} from '../../contexts/contents';
import {Content as ContentType, contentInfo} from '../../constants/content';

type BottomSheetProps = Pick<BottomSheetModalProps, 'onDismiss'>;
interface PresentData {
  name: string;
}

function Content({data: presentData}: {data: PresentData}) {
  const {allContents} = useContents();
  const {
    name,
    naverMapId,
    kakaoMapId,
    appleMapId,
    catchTableLink,
    type,
    address,
    peopleMin,
    peopleMax,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    sun,
    scheduleMemo,
  } = useMemo(
    () => allContents.find(c => c.name === presentData.name) as ContentType,
    [allContents, presentData.name],
  );
  const peopleRange = useMemo(
    () => (peopleMax ? `${peopleMin}~${peopleMax}명` : `최소 ${peopleMin}명`),
    [peopleMax, peopleMin],
  );
  const {color} = useMemo(() => contentInfo[type], [type]);

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
      <Text style={styles.title}>{name}</Text>
      <View style={styles.line} />
      <View style={styles.sectionContainer}>
        <Icon color={color} name="map-marker" size={24} />
        <View>
          <Text style={styles.description}>{address}</Text>
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
      <View style={styles.line} />
      <View style={styles.sectionContainer}>
        <Icon color={color} name="account-multiple" size={24} />
        <Text style={styles.description}>{peopleRange}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.sectionContainer}>
        <Icon color={color} name="store-clock" size={24} />
        <View style={styles.dateContainer}>
          <Text style={styles.description}>월 {mon}</Text>
          <Text style={styles.description}>화 {tue}</Text>
          <Text style={styles.description}>수 {wed}</Text>
          <Text style={styles.description}>목 {thu}</Text>
          <Text style={styles.description}>금 {fri}</Text>
          <Text style={styles.description}>토 {sat}</Text>
          <Text style={styles.description}>일 {sun}</Text>
          {scheduleMemo && (
            <Text style={[styles.description, styles.scheduleMemo]}>
              {scheduleMemo}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({onDismiss}, ref) => {
    const {top} = useSafeAreaInsets();
    const snapPoints = useMemo(
      () => ['33%', Dimensions.get('window').height - top],
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
    margin: 16,
    fontSize: 16,
    color: '#000',
  },
  thirdPartyAppContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  thirdPartyApp: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
  },
  sectionContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: '#000',
  },
  dateContainer: {
    gap: 4,
  },
  scheduleMemo: {
    marginTop: 12,
  },
});

export default BottomSheet;
