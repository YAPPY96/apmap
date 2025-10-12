import { Config } from '@/constants/Config';
import { Image, ImageProps } from 'expo-image';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface RemoteImageProps extends Omit<ImageProps, 'source'> {
  imagePath: string;
  showLoader?: boolean;
}

/**
 * RemoteImage component that handles loading state and errors for remote images
 * Optimized for production environments with proper caching and timeout handling
 */
export const RemoteImage: React.FC<RemoteImageProps> = ({
  imagePath,
  showLoader = true,
  style,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageUrl = `${Config.IMAGE_BASE_URL}/${imagePath}`;

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: imageUrl }}
        style={[StyleSheet.absoluteFill, style]}
        cachePolicy="memory-disk"
        transition={200}
        priority="high"
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      />
      {showLoader && isLoading && !hasError && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#666" />
        </View>
      )}
      {hasError && (
        <View style={styles.errorContainer}>
          <Image
            source={require('@/assets/image/icon.png')}
            style={styles.placeholderImage}
            contentFit="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderImage: {
    width: '50%',
    height: '50%',
    opacity: 0.3,
  },
});
