import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

import { MediaCardGrid } from '@/components/MediaCardGrid';
import { TrendingLink } from '@/components/TrendingLink';
import { useMediaQuery } from '@/features/media/useMediaQuery';

export default function HomeScreen() {
  const { data, isLoading } = useMediaQuery({ limit: 10 });

  // Mock trending links data - this would come from an API
  const trendingLinks = [
    {
      id: '1',
      fromMedia: {
        id: '1',
        title: 'Echoes of Tomorrow',
        subtitle: 'Show',
        year: 2024,
        coverUrl: 'https://picsum.photos/seed/show1/300/400',
      },
      linkCount: 1534,
    },
    {
      id: '2',
      fromMedia: {
        id: '2',
        title: 'Cosmic Tales',
        subtitle: 'Comic',
        year: 2023,
        coverUrl: 'https://picsum.photos/seed/comic1/300/400',
      },
      linkCount: 743,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#16213e']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>VibeLink</Text>
            <Text style={styles.headerSubtitle}>Discover your next vibe</Text>
          </View>

          {/* For You Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>✨</Text>
              <Text style={styles.sectionTitle}>For You</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
              {data?.data?.map((item) => (
                <MediaCardGrid key={item.id} item={item} />
              ))}
            </ScrollView>
          </View>

          {/* Trending Links Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📈</Text>
              <Text style={styles.sectionTitle}>Trending Links</Text>
            </View>

            <View style={styles.trendingList}>
              {trendingLinks.map((link) => (
                <TrendingLink key={link.id} link={link} />
              ))}
            </View>
          </View>

          {/* Bottom spacing for navbar */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#999',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  horizontalScrollContent: {
    paddingRight: 20,
  },
  loadingText: {
    color: '#999',
    fontSize: 14,
  },
  trendingList: {
    paddingHorizontal: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});
