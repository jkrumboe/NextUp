import type { Link } from '@vibelink/types';
import { router } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

interface TrendingLinkProps {
  link: {
    id: string;
    fromMedia: {
      id: string;
      title: string;
      subtitle?: string | null;
      year?: number | null;
      coverUrl?: string | null;
    };
    linkCount: number;
  };
}

export function TrendingLink({ link }: TrendingLinkProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/media/${link.fromMedia.id}` as any)}
    >
      <Image
        source={{ uri: link.fromMedia.coverUrl || 'https://via.placeholder.com/80x120' }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {link.fromMedia.title}
        </Text>
        <Text style={styles.subtitle}>
          {link.fromMedia.subtitle || `${link.fromMedia.year || 'Unknown'}`}
        </Text>
        <Text style={styles.linkCount}>{link.linkCount} community links</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 30, 40, 0.8)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
  },
  thumbnail: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 6,
  },
  linkCount: {
    color: '#8a2be2',
    fontSize: 13,
    fontWeight: '600',
  },
});
