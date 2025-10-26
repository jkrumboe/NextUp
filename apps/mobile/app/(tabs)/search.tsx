import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';

import { MediaCardGrid } from '@/components/MediaCardGrid';
import { useMediaQuery } from '@/features/media/useMediaQuery';
import { useDebounce } from '@/hooks/useDebounce';

type MediaType = 'All' | 'Movie' | 'Book' | 'Show' | 'Manga';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<MediaType>('All');
  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading } = useMediaQuery({ query: debouncedQuery, limit: 20 });

  const recentSearches = ['Spirited Away', 'Blade Runner', 'Dark', 'Cowboy Bebop'];
  const trendingVibes = ['#Surreal', '#Cyberpunk', '#Emotional', '#Atmospheric', '#Mind-bending'];
  const mediaTypes: MediaType[] = ['All', 'Movie', 'Book', 'Show', 'Manga'];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#16213e']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Search</Text>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search media, vibes, or users..."
                placeholderTextColor="#666"
                value={query}
                onChangeText={setQuery}
              />
              <Ionicons name="options" size={20} color="#999" style={styles.filterIcon} />
            </View>

            {/* Filter Pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
              contentContainerStyle={styles.filterContent}
            >
              {mediaTypes.map((type) => (
                <Pressable
                  key={type}
                  style={[styles.filterPill, selectedType === type && styles.filterPillActive]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text
                    style={[styles.filterText, selectedType === type && styles.filterTextActive]}
                  >
                    {type}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Content when no search query */}
          {!query && (
            <>
              {/* Recent Searches */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="time-outline" size={20} color="#fff" />
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                </View>
                {recentSearches.map((search, index) => (
                  <Pressable key={index} style={styles.recentItem}>
                    <Text style={styles.recentText}>{search}</Text>
                    <Ionicons name="search" size={18} color="#666" />
                  </Pressable>
                ))}
              </View>

              {/* Trending Vibes */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="trending-up" size={20} color="#fff" />
                  <Text style={styles.sectionTitle}>Trending Vibes</Text>
                </View>
                <View style={styles.trendingTags}>
                  {trendingVibes.map((vibe, index) => (
                    <Pressable key={index} style={styles.trendingTag}>
                      <Text style={styles.trendingTagText}>{vibe}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Popular This Week */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular This Week</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.popularContent}
                >
                  {data?.data?.slice(0, 4).map((item) => (
                    <MediaCardGrid key={item.id} item={item} />
                  ))}
                </ScrollView>
              </View>
            </>
          )}

          {/* Search Results */}
          {query && (
            <>
              {isLoading && <Text style={styles.loadingText}>Loading...</Text>}

              {data?.data && data.data.length > 0 && (
                <View style={styles.resultsGrid}>
                  {data.data.map((item) => (
                    <MediaCardGrid key={item.id} item={item} />
                  ))}
                </View>
              )}

              {!isLoading && data?.data?.length === 0 && (
                <Text style={styles.emptyText}>No results found</Text>
              )}
            </>
          )}

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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 40, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    padding: 14,
    fontSize: 15,
    color: '#fff',
  },
  filterIcon: {
    marginLeft: 8,
  },
  filterScroll: {
    marginBottom: 8,
  },
  filterContent: {
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 30, 40, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
  },
  filterPillActive: {
    backgroundColor: '#8a2be2',
    borderColor: '#8a2be2',
  },
  filterText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 30, 40, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.2)',
  },
  recentText: {
    color: '#fff',
    fontSize: 15,
  },
  trendingTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  trendingTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    borderWidth: 1,
    borderColor: '#8a2be2',
  },
  trendingTagText: {
    color: '#8a2be2',
    fontSize: 14,
    fontWeight: '600',
  },
  popularContent: {
    gap: 12,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  loadingText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  bottomSpacer: {
    height: 100,
  },
});
