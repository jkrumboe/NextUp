import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterDto } from '@vibelink/types';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/features/auth/useAuth';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterDto) => {
    try {
      setError('');
      await register(data);
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <LinearGradient
      colors={['#a855f7', '#ec4899', '#f97316']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.content}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Header */}
            <Text style={styles.title}>Join VibeLink</Text>
            <Text style={styles.subtitle}>Discover your next favorite vibe</Text>

            {/* Card Container */}
            <View style={styles.card}>
              {/* Username Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputWrapper}>
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="#9ca3af"
                        style={styles.icon}
                      />
                      <TextInput
                        placeholder="Choose a username"
                        placeholderTextColor="#6b7280"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                      />
                    </View>
                  )}
                />
                {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputWrapper}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#9ca3af"
                        style={styles.icon}
                      />
                      <TextInput
                        placeholder="Enter your password"
                        placeholderTextColor="#6b7280"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        style={styles.input}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                      >
                        <Ionicons
                          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                          size={20}
                          color="#9ca3af"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
              </View>

              {/* Confirm Password Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#9ca3af"
                    style={styles.icon}
                  />
                  <TextInput
                    placeholder="Confirm your password"
                    placeholderTextColor="#6b7280"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Error Message */}
              {error && <Text style={styles.errorMessage}>{error}</Text>}

              {/* Create Account Button */}
              <TouchableOpacity
                style={[styles.createButton, isSubmitting && styles.createButtonDisabled]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                <Text style={styles.createButtonText}>
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#fff" />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#fff" />
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
              </TouchableOpacity>

              {/* Sign In Link */}
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.signInLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms */}
            <Text style={styles.terms}>
              By continuing, you agree to VibeLink&apos;s{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#f3e8ff',
    textAlign: 'center',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    height: 50,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  errorMessage: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#a855f7',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    color: '#9ca3af',
    fontSize: 14,
    marginHorizontal: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    height: 50,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  signInText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  signInLink: {
    color: '#a855f7',
    fontSize: 14,
    fontWeight: '700',
  },
  terms: {
    color: '#f3e8ff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
});
