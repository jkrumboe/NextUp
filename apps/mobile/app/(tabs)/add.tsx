import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';

import { MediaCardGrid } from '@/components/MediaCardGrid';
import { useMediaQuery } from '@/features/media/useMediaQuery';
import { useDebounce } from '@/hooks/useDebounce';

export default function AddScreen() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading } = useMediaQuery({ query: debouncedQuery, limit: 20 });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#16213e']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Create Link</Text>
            <Text style={styles.headerSubtitle}>Select first item</Text>
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for media..."
            placeholderTextColor="#666"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Media Grid */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.mediaGrid}>
            {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
            {data?.data?.map((item) => (
              <MediaCardGrid key={item.id} item={item} />
            ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 40, 0.8)',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
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
  scrollView: {
    flex: 1,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  loadingText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
    marginTop: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});
