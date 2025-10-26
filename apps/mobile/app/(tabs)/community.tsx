import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';

type TabType = 'Feed' | 'Following';

interface ActivityItem {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  timestamp: string;
  action: string;
  media: {
    from: {
      title: string;
      subtitle: string;
      cover: string;
    };
    to: {
      title: string;
      subtitle: string;
      cover: string;
    };
  };
  description: string;
  likes: number;
  comments: number;
}

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('Feed');

  const activities: ActivityItem[] = [
    {
      id: '1',
      user: {
        username: 'dreamweaver',
        avatar: 'https://ui-avatars.com/api/?name=Dream+Weaver&size=80',
      },
      timestamp: '2 days ago',
      action: 'linked two vibes together',
      media: {
        from: {
          title: 'Midnight Dreams',
          subtitle: 'Movie',
          cover: 'https://picsum.photos/seed/movie1/300/400',
        },
        to: {
          title: 'The Ethereal Chronicles',
          subtitle: 'Book',
          cover: 'https://picsum.photos/seed/book1/300/400',
        },
      },
      description: 'Both explore the nature of reality with stunning atmospheric storytelling',
      likes: 234,
      comments: 23,
    },
    {
      id: '2',
      user: {
        username: 'techvibe',
        avatar: 'https://ui-avatars.com/api/?name=Tech+Vibe&size=80',
      },
      timestamp: '5 days ago',
      action: 'linked two vibes together',
      media: {
        from: {
          title: 'Neon Horizons',
          subtitle: 'Manga',
          cover: 'https://picsum.photos/seed/manga1/300/400',
        },
        to: {
          title: 'Wavelength',
          subtitle: 'Music',
          cover: 'https://picsum.photos/seed/music1/300/400',
        },
      },
      description: 'Futuristic cyberpunk aesthetics meet electronic soundscapes',
      likes: 189,
      comments: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#16213e']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Community</Text>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'Feed' && styles.tabActive]}
              onPress={() => setActiveTab('Feed')}
            >
              <Ionicons name="analytics" size={18} color={activeTab === 'Feed' ? '#fff' : '#999'} />
              <Text style={[styles.tabText, activeTab === 'Feed' && styles.tabTextActive]}>
                Feed
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'Following' && styles.tabActive]}
              onPress={() => setActiveTab('Following')}
            >
              <Ionicons
                name="people"
                size={18}
                color={activeTab === 'Following' ? '#fff' : '#999'}
              />
              <Text style={[styles.tabText, activeTab === 'Following' && styles.tabTextActive]}>
                Following
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Activity Feed */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {activities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              {/* User Header */}
              <View style={styles.userHeader}>
                <Image source={{ uri: activity.user.avatar }} style={styles.userAvatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.username}>@{activity.user.username}</Text>
                  <Text style={styles.timestamp}>{activity.timestamp}</Text>
                </View>
                <Pressable style={styles.followButton}>
                  <Text style={styles.followButtonText}>Follow</Text>
                </Pressable>
              </View>

              {/* Action */}
              <Text style={styles.action}>{activity.action}</Text>

              {/* Media Connection */}
              <View style={styles.mediaConnection}>
                {/* From Media */}
                <View style={styles.mediaItem}>
                  <Image source={{ uri: activity.media.from.cover }} style={styles.mediaCover} />
                  <View style={styles.mediaInfo}>
                    <Text style={styles.mediaTitle}>{activity.media.from.title}</Text>
                    <Text style={styles.mediaSubtitle}>{activity.media.from.subtitle}</Text>
                  </View>
                </View>

                {/* Arrow */}
                <View style={styles.arrowContainer}>
                  <Ionicons name="arrow-forward" size={24} color="#8a2be2" />
                </View>

                {/* To Media */}
                <View style={styles.mediaItem}>
                  <Image source={{ uri: activity.media.to.cover }} style={styles.mediaCover} />
                  <View style={styles.mediaInfo}>
                    <Text style={styles.mediaTitle}>{activity.media.to.title}</Text>
                    <Text style={styles.mediaSubtitle}>{activity.media.to.subtitle}</Text>
                  </View>
                </View>
              </View>

              {/* Description */}
              <Text style={styles.description}>"{activity.description}"</Text>

              {/* Actions */}
              <View style={styles.actionsBar}>
                <Pressable style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={20} color="#999" />
                  <Text style={styles.actionText}>{activity.likes}</Text>
                </Pressable>
                <Pressable style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={20} color="#999" />
                  <Text style={styles.actionText}>{activity.comments}</Text>
                </Pressable>
                <Pressable style={styles.actionButton}>
                  <Ionicons name="share-social-outline" size={20} color="#999" />
                  <Text style={styles.actionText}>Share</Text>
                </Pressable>
              </View>
            </View>
          ))}

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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 30, 40, 0.6)',
    borderRadius: 12,
    padding: 4,
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
  tabText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  activityCard: {
    backgroundColor: 'rgba(30, 30, 40, 0.6)',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.2)',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
  },
  followButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8a2be2',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followButtonText: {
    color: '#8a2be2',
    fontSize: 13,
    fontWeight: '600',
  },
  action: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 12,
  },
  mediaConnection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  mediaItem: {
    flex: 1,
    backgroundColor: 'rgba(20, 20, 30, 0.8)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  mediaCover: {
    width: '100%',
    height: 160,
    backgroundColor: '#1a1a1a',
  },
  mediaInfo: {
    padding: 8,
  },
  mediaTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  mediaSubtitle: {
    color: '#999',
    fontSize: 11,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
  },
  description: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  actionsBar: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(138, 43, 226, 0.2)',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: '#999',
    fontSize: 14,
  },
  bottomSpacer: {
    height: 100,
  },
});
