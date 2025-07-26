import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { firestore } from '../services/firebase';

const ClansScreen = ({ navigation }) => {
  const [clans, setClans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = firestore.collection('clans')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const clansData = [];
        snapshot.forEach(doc => {
          clansData.push({ id: doc.id, ...doc.data() });
        });
        setClans(clansData);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const filteredClans = clans.filter(clan => 
    clan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clan.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Searchbar
        placeholder="Search clans"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <FlatList
        data={filteredClans}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.clanCard}>
            <Card.Content>
              <Title>{item.name} [{item.tag}]</Title>
              <Paragraph>Members: {item.members.length}</Paragraph>
              <Paragraph>Language: {item.language}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('ClanDetails', { clanId: item.id })}>
                View
              </Button>
              {!user.clanId && (
                <Button onPress={() => joinClan(item.id)}>
                  Join
                </Button>
              )}
            </Card.Actions>
          </Card>
        )}
      />
      
      {!user.clanId && (
        <Button 
          mode="contained" 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateClan')}
        >
          Create Clan
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 10,
  },
  clanCard: {
    margin: 10,
  },
  createButton: {
    margin: 20,
  },
});

export default ClansScreen;