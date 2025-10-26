import { Redirect } from 'expo-router';

export default function Index() {
  // Allow browsing without login, just redirect to tabs
  return <Redirect href="/(tabs)" />;
}
