import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function BasicLoading() {
  return (
    <SkeletonPlaceholder borderRadius={8}>
      <SkeletonPlaceholder.Item padding={16} gap={16}>
        <SkeletonPlaceholder.Item width={80} height={24} />
        <SkeletonPlaceholder.Item width={160} height={24} />
        <SkeletonPlaceholder.Item width={120} height={24} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
