import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Text from '../elements/Text';

interface HomeBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function HomeBottomSheet({
  visible,
  onClose,
}: HomeBottomSheetProps): JSX.Element {
  const ref = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(
    // 디자인상 계산된 값
    () => [168 + Dimensions.get('window').width / 3, '100%'],
    [],
  );

  useEffect(() => {
    console.log(visible);
    if (visible) {
      ref.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [visible]);

  const onChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0} // 닫힌 상태에서 시작
      snapPoints={snapPoints}
      onChange={onChange}
      enablePanDownToClose>
      <View style={styles.container}>
        <Text>Hellow</Text>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'red',
  },
});
