import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { YStack, Button, Text, H2 } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterDto } from '@vibelink/types';
import { useAuth } from '@/features/auth/useAuth';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterDto) => {
    try {
      setError('');
      await register(data);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <YStack flex={1} justifyContent="center" padding={16} space={16}>
      <H2>Create Account</H2>

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
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <YStack space={8}>
            <TextInput
              placeholder="Username"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              style={styles.input}
            />
            {errors.username && <Text color="$error">{errors.username.message}</Text>}
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
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>

      <Button onPress={() => router.back()} variant="outlined">
        Back to Sign In
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
