import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import { Image, ImageProps } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Extend ImageProps but enforce the source to be a remote URI
type CachedImageProps = Omit<ImageProps, 'source'> & {
  source: {
    uri: string;
  };
};

const CachedImage: React.FC<CachedImageProps> = (props) => {
  const { source, style, ...rest } = props;
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cacheImage = async () => {
      if (!source?.uri) {
        setIsLoading(false);
        return;
      }

      try {
        // Create a unique filename from the URI
        const fileExtension = source.uri.split('.').pop() || 'jpg';
        const hash = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          source.uri
        );
        const cacheUri = `${FileSystem.cacheDirectory}${hash}.${fileExtension}`;

        const fileInfo = await FileSystem.getInfoAsync(cacheUri);

        if (fileInfo.exists) {
          // Image is already in cache
          setImageUri(fileInfo.uri);
        } else {
          // Image is not in cache, download it
          const { uri: downloadedUri } = await FileSystem.downloadAsync(source.uri, cacheUri);
          setImageUri(downloadedUri);
        }
      } catch (e) {
        console.error('Failed to cache image:', e);
        // On error, imageUri will remain null, leading to a placeholder
        setImageUri(null);
      } finally {
        setIsLoading(false);
      }
    };

    cacheImage();
  }, [source.uri]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer, style]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!imageUri) {
    // If loading is finished and we still have no URI, show a placeholder
    return <View style={[styles.container, styles.placeholder, style]} />;
  }

  return <Image {...rest} source={{ uri: imageUri }} style={style} />;
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e4e8', // A GitHub-like grey background
  },
  placeholder: {
    backgroundColor: '#e1e4e8',
  },
});

export default CachedImage;
