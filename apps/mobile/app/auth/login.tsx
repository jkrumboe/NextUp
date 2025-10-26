import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginDto } from '@vibelink/types';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, StyleSheet } from 'react-native';
import { YStack, Button, Text, H2 } from 'tamagui';

import { useAuth } from '@/features/auth/useAuth';

export default function LoginScreen() {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      setError('');
      await login(data);
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <LinearGradient colors={['#ff6f61', '#ff9671']} style={{ flex: 1 }}>
      <YStack flex={1} justifyContent="center" padding={16} space={16}>
        <H2>Welcome Back</H2>
        <Text>Continue your discovery journey</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack space={8}>
              <TextInput
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
              {errors.email && <Text color="$error">{errors.email.message}</Text>}
            </YStack>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack space={8}>
              <TextInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                style={styles.input}
              />
              {errors.password && <Text color="$error">{errors.password.message}</Text>}
            </YStack>
          )}
        />

        {error && <Text color="$error">{error}</Text>}

        <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting} theme="active">
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>

        <Button onPress={() => router.push('/auth/register')} variant="outlined">
          Create Account
        </Button>
      </YStack>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
