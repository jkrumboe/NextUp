import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Modal } from 'react-native';

export default function SettingsScreen() {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const appVersion = Constants.expoConfig?.version || '1.0.0';

  const handleLogout = () => {
    // Logic for logging out
    setLogoutModalVisible(false);
  };

  const handleDeleteAccount = () => {
    // Logic for deleting account
    setDeleteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#16213e']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="person-circle" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>@vibeseeker</Text>
                  <Text style={styles.rowSubtitle}>Change profile photo</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Ionicons name="create" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Edit Profile</Text>
                  <Text style={styles.rowSubtitle}>Name, bio, links</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Ionicons name="mail" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Email</Text>
                  <Text style={styles.rowSubtitle}>user@example.com</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Ionicons name="lock-closed" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Change Password</Text>
                  <Text style={styles.rowSubtitle}>Update your password</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Appearance Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="moon" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Dark Mode</Text>
                  <Text style={styles.rowSubtitle}>Enabled</Text>
                </View>
                <Switch value={true} style={styles.switch} />
              </View>
              <View style={styles.row}>
                <Ionicons name="color-palette" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Accent Color</Text>
                  <Text style={styles.rowSubtitle}>Purple</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="notifications" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>New Links</Text>
                  <Text style={styles.rowSubtitle}>When someone links your content</Text>
                </View>
                <Switch value={true} style={styles.switch} />
              </View>
              <View style={styles.row}>
                <Ionicons name="person-add" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>New Followers</Text>
                  <Text style={styles.rowSubtitle}>When someone follows you</Text>
                </View>
                <Switch value={true} style={styles.switch} />
              </View>
              <View style={styles.row}>
                <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Recommendations</Text>
                  <Text style={styles.rowSubtitle}>Personalized content suggestions</Text>
                </View>
                <Switch value={false} style={styles.switch} />
              </View>
              <View style={styles.row}>
                <Ionicons name="mail" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Email Notifications</Text>
                  <Text style={styles.rowSubtitle}>Weekly digest and updates</Text>
                </View>
                <Switch value={true} style={styles.switch} />
              </View>
            </View>
          </View>

          {/* Privacy Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="globe" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Public Profile</Text>
                  <Text style={styles.rowSubtitle}>Anyone can view your profile</Text>
                </View>
                <Switch value={true} style={styles.switch} />
              </View>
              <View style={styles.row}>
                <Ionicons name="shield" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Show Activity</Text>
                  <Text style={styles.rowSubtitle}>Display your recent activity</Text>
                </View>
                <Switch value={true} style={styles.switch} />
              </View>
              <View style={styles.row}>
                <Ionicons name="mail" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Allow Messages</Text>
                  <Text style={styles.rowSubtitle}>Receive messages from others</Text>
                </View>
                <Switch value={false} style={styles.switch} />
              </View>
              <View style={styles.row}>
                <Ionicons name="ban" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Blocked Users</Text>
                  <Text style={styles.rowSubtitle}>Manage blocked accounts</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="help-circle" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Help Center</Text>
                  <Text style={styles.rowSubtitle}>FAQs and guides</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Ionicons name="chatbubble" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Contact Support</Text>
                  <Text style={styles.rowSubtitle}>Get help from our team</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Ionicons name="document" size={24} color="#fff" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>Terms & Privacy</Text>
                  <Text style={styles.rowSubtitle}>Legal information</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Danger Zone */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Danger Zone</Text>
            <View style={styles.cardDanger}>
              <Pressable onPress={() => setLogoutModalVisible(true)} style={styles.row}>
                <Ionicons name="log-out" size={24} color="#f87171" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitleDanger}>Log Out</Text>
                  <Text style={styles.rowSubtitle}>Sign out of your account</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setDeleteModalVisible(true)} style={styles.row}>
                <Ionicons name="trash" size={24} color="#f87171" style={styles.icon} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitleDanger}>Delete Account</Text>
                  <Text style={styles.rowSubtitle}>Permanently delete your data</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Logout Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isLogoutModalVisible}
            onRequestClose={() => setLogoutModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Log out of VibeLink?</Text>
                <Text style={styles.modalSubtitle}>You can always log back in at any time.</Text>
                <Pressable onPress={handleLogout} style={styles.modalButtonDanger}>
                  <Text style={styles.modalButtonText}>Log Out</Text>
                </Pressable>
                <Pressable onPress={() => setLogoutModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Delete Account Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isDeleteModalVisible}
            onRequestClose={() => setDeleteModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Delete your account?</Text>
                <Text style={styles.modalSubtitle}>
                  This action cannot be undone. This will permanently delete your account and remove
                  all your data from our servers.
                </Text>
                <Pressable onPress={handleDeleteAccount} style={styles.modalButtonDanger}>
                  <Text style={styles.modalButtonText}>Delete Account</Text>
                </Pressable>
                <Pressable onPress={() => setDeleteModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>VibeLink v{appVersion}</Text>
            <Text style={styles.footerText}>Made with ❤️ for discovery</Text>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'rgba(30, 30, 40, 0.8)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
  },
  cardDanger: {
    backgroundColor: 'rgba(30, 30, 40, 0.8)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f87171',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  rowTitleDanger: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f87171',
    marginBottom: 2,
  },
  rowSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  switch: {
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonDanger: {
    backgroundColor: '#f87171',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
