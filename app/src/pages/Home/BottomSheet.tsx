import {BottomSheetModal, BottomSheetModalProps} from '@gorhom/bottom-sheet';
import React, {forwardRef, useMemo} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../../elements/Text';
import {trpc} from '../../configs/trpc';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type BottomSheetProps = Pick<BottomSheetModalProps, 'onDismiss'>;
interface PresentData {
  id: string;
}

function Content({data: {id}}: {data: PresentData}) {
  const {data} = trpc.content.detail.useQuery({id});

  const thirdPartyApps = useMemo(
    () => [
      {
        link: data?.naverMapLink,
        source: require('../../../assets/third-party-apps/naver-map.png'),
      },
      {
        link: data?.kakaoMapLink,
        source: require('../../../assets/third-party-apps/kakao-map.png'),
      },
      {
        link: data?.tMapLink,
        source: require('../../../assets/third-party-apps/t-map.png'),
      },
      {
        link: data?.googleMapLink,
        source: require('../../../assets/third-party-apps/google-map.png'),
      },
      {
        link: data?.appleMapLink,
        source: require('../../../assets/third-party-apps/apple-map.png'),
      },
    ],
    [data],
  );

  return (
    <View>
      <Text style={styles.title}>{data?.name}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hashTagScrollView}>
        <View style={styles.recommandHashTagBox}>
          <Text style={styles.recommandHashTag}>추천 해시태그 👍</Text>
        </View>
        <Text style={[styles.hashTag, styles.hashTagHighlight]}>
          #{data?.hashTag}
        </Text>
        <Text style={[styles.hashTag, styles.hashTagHighlight]}>#뭐하지앱</Text>
        {(data?.recommandHashTags as string[])?.map(tag => (
          <Text key={tag} style={styles.hashTag}>
            #{tag}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.thirdPartyAppContainer}>
        {thirdPartyApps.map(({link, source}) => (
          <TouchableOpacity
            key={link}
            onPress={() => Linking.openURL(link ?? '')}>
            <Image style={styles.thirdPartyApp} source={source} />
          </TouchableOpacity>
        ))}
      </View>
      <LinearGradient
        colors={['#DB855E', '#FA5F5D', '#ED6069', '#D06087', '#874A7A']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.instaHeader}>
        <Icon name="instagram" size={16} color="#fff" />
        <Text style={styles.instaHeaderText}>
          <Text style={styles.bold}>#파이브가이즈 #뭐하지앱</Text> 태그시
          연동됩니다 🤗
        </Text>
      </LinearGradient>
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
  title: {
    fontWeight: 'bold',
    lineHeight: 24,
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
    marginBottom: 4,
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
  },
  hashTag: {
    lineHeight: 24,
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
});

export default BottomSheet;
