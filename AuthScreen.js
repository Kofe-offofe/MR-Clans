import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../contexts/AuthContext';

const AuthScreen = () => {
  const { colors } = useTheme();
  const { googleSignIn, steamSignIn, appleSignIn } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Clan MR</Text>
      <Text style={styles.subtitle}>Magic Rampage Clan Manager</Text>
      
      <GoogleSigninButton
        style={styles.authButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
      />
      
      <Button 
        mode="contained" 
        style={styles.authButton}
        onPress={steamSignIn}
      >
        Sign in with Steam
      </Button>
      
      <Button 
        mode="contained" 
        style={styles.authButton}
        onPress={appleSignIn}
      >
        Sign in with Game Center
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  authButton: {
    width: '100%',
    marginVertical: 10,
    height: 50,
    justifyContent: 'center',
  },
});

export default AuthScreen;