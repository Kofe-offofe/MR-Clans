import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import ClansScreen from '../screens/ClansScreen';
import ClanDetailsScreen from '../screens/ClanDetailsScreen';
import CreateClanScreen from '../screens/CreateClanScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useAuth } from '../contexts/AuthContext';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="Clans" component={ClansScreen} />
          <Stack.Screen name="ClanDetails" component={ClanDetailsScreen} />
          <Stack.Screen name="CreateClan" component={CreateClanScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;