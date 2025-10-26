import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';

import { MediaCardGrid } from '@/components/MediaCardGrid';
import { useAuth } from '@/features/auth/useAuth';
import { useMediaQuery } from '@/features/media/useMediaQuery';

type TabType = 'Logged' | 'Links' | 'Activity';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('Logged');
  const { data } = useMediaQuery({ limit: 10 });

  const favoriteVibes = ['Surreal', 'Atmospheric', 'Emotional', 'Mind-bending', 'Cyberpunk'];

  const stats = [
    { value: '247', label: 'Logged' },
    { value: '89', label: 'Links' },
    { value: '1203', label: 'Followers' },
    { value: '456', label: 'Following' },
  ];

  const tabs: TabType[] = ['Logged', 'Links', 'Activity'];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Purple Gradient Header */}
        <LinearGradient
          colors={['#a855f7', '#8b5cf6', '#7c3aed']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Settings Icon */}
          <Pressable style={styles.settingsButton} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </Pressable>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: user?.avatarUrl || 'https://ui-avatars.com/api/?name=Vibe+Seeker&size=200',
              }}
              style={styles.avatar}
            />
          </View>

          {/* Username */}
          <Text style={styles.username}>@{user?.username || 'vibeseeker'}</Text>

          {/* Bio */}
          <Text style={styles.bio}>Exploring media through emotional connections</Text>
          <Text style={styles.emoji}>🌙</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Favorite Vibes Section */}
        <View style={styles.vibesSection}>
          <Text style={styles.vibesTitle}>Favorite Vibes</Text>
          <View style={styles.vibesTags}>
            {favoriteVibes.map((vibe, index) => (
              <View key={index} style={styles.vibeTag}>
                <Text style={styles.vibeText}>{vibe}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              {tab === 'Logged' && (
                <Ionicons
                  name="heart"
                  size={18}
                  color={activeTab === tab ? '#fff' : '#999'}
                  style={styles.tabIcon}
                />
              )}
              {tab === 'Links' && (
                <Ionicons
                  name="link"
                  size={18}
                  color={activeTab === tab ? '#fff' : '#999'}
                  style={styles.tabIcon}
                />
              )}
              {tab === 'Activity' && (
                <Ionicons
                  name="pulse"
                  size={18}
                  color={activeTab === tab ? '#fff' : '#999'}
                  style={styles.tabIcon}
                />
              )}
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </Pressable>
          ))}
        </View>

        {/* Content Grid */}
        <View style={styles.contentGrid}>
          {data?.data?.slice(0, 6).map((item) => (
            <MediaCardGrid key={item.id} item={item} />
          ))}
        </View>

        {/* Bottom spacing for navbar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  scrollView: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 4,
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 46,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  bio: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 4,
  },
  emoji: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
  },
  vibesSection: {
    backgroundColor: 'rgba(30, 30, 40, 0.8)',
    marginHorizontal: 20,
    marginTop: -12,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  vibesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  vibesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vibeTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(138, 43, 226, 0.3)',
    borderWidth: 1,
    borderColor: '#8a2be2',
  },
  vibeText: {
    color: '#a78bfa',
    fontSize: 13,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 30, 40, 0.6)',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  tabActive: {
    backgroundColor: 'rgba(138, 43, 226, 0.4)',
  },
  tabIcon: {
    marginRight: 2,
  },
  tabText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  bottomSpacer: {
    height: 100,
  },
});
