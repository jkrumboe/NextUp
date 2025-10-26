import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { YStack, Button, Text, H2 } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginDto } from '@vibelink/types';
import { useAuth } from '@/features/auth/useAuth';
import { router } from 'expo-router';

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
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <YStack flex={1} justifyContent="center" padding={16} space={16}>
      <H2>Sign In</H2>

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
