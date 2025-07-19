import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Input } from '@rneui/themed';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

type AuthMode = 'signin' | 'signup';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [error, setError] = useState('');

  const { signIn, signUp, isLoading } = useAuth();

  const handleSubmit = async () => {
    try {
      setError('');
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password, name, role);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text h3 style={styles.title}>
            Service Marketplace
          </Text>
          <Text style={styles.subtitle}>
            {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
          </Text>
        </View>

        <View style={styles.form}>
          {mode === 'signup' && (
            <Input
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              leftIcon={{ type: 'material', name: 'person' }}
            />
          )}

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            leftIcon={{ type: 'material', name: 'email' }}
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={{ type: 'material', name: 'lock' }}
          />

          {mode === 'signup' && (
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>I am a:</Text>
              <View style={styles.roleButtons}>
                <Button
                  title="Customer"
                  variant={role === 'customer' ? 'primary' : 'outline'}
                  onPress={() => setRole('customer')}
                  containerStyle={styles.roleButton}
                />
                <Button
                  title="Service Provider"
                  variant={role === 'provider' ? 'primary' : 'outline'}
                  onPress={() => setRole('provider')}
                  containerStyle={styles.roleButton}
                />
              </View>
            </View>
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            title={mode === 'signin' ? 'Sign In' : 'Sign Up'}
            onPress={handleSubmit}
            loading={isLoading}
            containerStyle={styles.submitButton}
          />

          <Button
            title={mode === 'signin' ? 'Create an account' : 'Already have an account?'}
            variant="secondary"
            onPress={toggleMode}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    marginBottom: 10,
    color: '#2089dc',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    marginTop: 20,
  },
  roleContainer: {
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  error: {
    color: '#ff190c',
    textAlign: 'center',
    marginBottom: 15,
  },
  submitButton: {
    marginVertical: 15,
  },
}); 