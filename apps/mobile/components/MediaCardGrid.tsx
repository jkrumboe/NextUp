import type { MediaItem } from '@vibelink/types';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

interface MediaCardGridProps {
  item: MediaItem;
}

export function MediaCardGrid({ item }: MediaCardGridProps) {
  const tags = item.tags?.slice(0, 2) || [];

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/media/${item.id}`)}>
      <Image
        source={{ uri: item.coverUrl || 'https://via.placeholder.com/300x400' }}
        style={styles.coverImage}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.stats}>
            {item.averageRating && (
              <View style={styles.stat}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.statText}>{item.averageRating.toFixed(1)}</Text>
              </View>
            )}
            {item.ratingsCount !== undefined && (
              <View style={styles.stat}>
                <Text style={styles.iconText}>👍</Text>
                <Text style={styles.statText}>{item.ratingsCount}</Text>
              </View>
            )}
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          {item.subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {item.type} • {item.year || item.subtitle}
            </Text>
          )}

          {tags.length > 0 && (
            <View style={styles.tags}>
              {tags.map((tag) => (
                <View key={tag.id} style={styles.tag}>
                  <Text style={styles.tagText}>{tag.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#1a1a1a',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 12,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  starIcon: {
    fontSize: 12,
  },
  iconText: {
    fontSize: 10,
  },
  statText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tag: {
    backgroundColor: 'rgba(138, 43, 226, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
});
