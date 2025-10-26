import { YStack, Button, Text, H2 } from 'tamagui';
import { useAuth } from '@/features/auth/useAuth';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding={16} space={16}>
        <H2>Welcome to VibeLink</H2>
        <Text>Sign in to track your media and get recommendations</Text>
        <Button onPress={() => router.push('/auth/login')} theme="active">
          Sign In
        </Button>
      </YStack>
    );
  }

  return (
    <YStack flex={1} padding={16} space={16}>
      <H2>Profile</H2>
      <Text>Welcome, {user?.username}!</Text>
      <Button onPress={logout} variant="outlined">
        Sign Out
      </Button>
    </YStack>
  );
}
