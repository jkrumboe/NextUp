import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, RegisterSchema, type LoginDto, type RegisterDto } from '@vibelink/types';
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
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/features/auth/useAuth';

export default function LoginScreen() {
  const { login, register } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [confirmPasswordHeight] = useState(new Animated.Value(0));
  const [confirmPasswordTranslateY] = useState(new Animated.Value(-80));
  const [forgotPasswordOpacity] = useState(new Animated.Value(1));

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginDto | RegisterDto>({
    resolver: zodResolver(isRegisterMode ? RegisterSchema : LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
    reset();

    if (!isRegisterMode) {
      // Switching to register mode
      // Fade out forgot password first (with delay), then slide in confirm password from top
      Animated.sequence([
        Animated.timing(forgotPasswordOpacity, {
          toValue: 0,
          duration: 300,
          delay: 200,
          useNativeDriver: false,
        }),
        Animated.parallel([
          Animated.timing(confirmPasswordHeight, {
            toValue: 80,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(confirmPasswordTranslateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    } else {
      // Switching to login mode
      // Slide out confirm password to top first, then fade in forgot password
      Animated.sequence([
        Animated.parallel([
          Animated.timing(confirmPasswordHeight, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(confirmPasswordTranslateY, {
            toValue: -80,
            duration: 500,
            useNativeDriver: false,
          }),
        ]),
        Animated.timing(forgotPasswordOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const onSubmit = async (data: LoginDto | RegisterDto) => {
    try {
      setError('');
      if (isRegisterMode) {
        await register(data as RegisterDto);
      } else {
        await login(data as LoginDto);
      }
      router.replace('/(tabs)');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : isRegisterMode ? 'Registration failed' : 'Login failed'
      );
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
            <Text style={styles.title}>{isRegisterMode ? 'Join VibeLink' : 'Welcome Back'}</Text>
            <Text style={styles.subtitle}>
              {isRegisterMode
                ? 'Discover your next favorite vibe'
                : 'Continue your discovery journey'}
            </Text>

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
                        placeholder="Enter your username"
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

                {/* Confirm Password Field - Animated - Nested to appear from password */}
                <Animated.View
                  style={{
                    height: confirmPasswordHeight,
                    transform: [{ translateY: confirmPasswordTranslateY }],
                    overflow: 'hidden',
                  }}
                >
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { value } }) => (
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
                            value={value}
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                            style={styles.input}
                            editable={false}
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
                      )}
                    />
                  </View>
                </Animated.View>
              </View>

              {/* Forgot Password - Only show in login mode with fade animation */}
              <Animated.View
                style={{
                  opacity: forgotPasswordOpacity,
                  height: isRegisterMode ? 0 : 'auto',
                  overflow: 'hidden',
                }}
              >
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Error Message */}
              {error && <Text style={styles.errorMessage}>{error}</Text>}

              {/* Sign In/Create Account Button */}
              <TouchableOpacity
                style={[styles.signInButton, isSubmitting && styles.signInButtonDisabled]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                <Text style={styles.signInButtonText}>
                  {isSubmitting
                    ? isRegisterMode
                      ? 'Creating Account...'
                      : 'Signing in...'
                    : isRegisterMode
                      ? 'Create Account'
                      : 'Sign In'}
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

              {/* Sign Up/Sign In Toggle Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>
                  {isRegisterMode ? 'Already have an account? ' : "Don't have an account? "}
                </Text>
                <TouchableOpacity onPress={toggleMode}>
                  <Text style={styles.signUpLink}>{isRegisterMode ? 'Sign In' : 'Sign Up'}</Text>
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
    justifyContent: 'flex-end',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#a855f7',
    fontSize: 14,
    fontWeight: '600',
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
  signInButton: {
    backgroundColor: '#a855f7',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signInButtonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  signUpText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  signUpLink: {
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
