import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar, ListItem, Switch, Button } from '@rneui/themed';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const settings = [
    {
      title: 'Notifications',
      icon: 'notifications',
      value: true,
      type: 'switch',
    },
    {
      title: 'Dark Mode',
      icon: 'brightness-4',
      value: false,
      type: 'switch',
    },
    {
      title: 'Payment Methods',
      icon: 'payment',
      type: 'chevron',
    },
    {
      title: 'Address',
      icon: 'location-on',
      type: 'chevron',
    },
    {
      title: 'Privacy Settings',
      icon: 'security',
      type: 'chevron',
    },
    {
      title: 'Help & Support',
      icon: 'help',
      type: 'chevron',
    },
    {
      title: 'About',
      icon: 'info',
      type: 'chevron',
    },
  ];

  const handleSettingPress = (setting: typeof settings[0]) => {
    // TODO: Implement settings navigation
    console.log('Navigate to:', setting.title);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={100}
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          containerStyle={styles.avatar}
        />
        <Text h4 style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {user?.role === 'provider' && (
          <View style={styles.providerStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>Jobs</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Completion</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settings.map((setting, index) => (
          <ListItem
            key={setting.title}
            onPress={() => setting.type === 'chevron' && handleSettingPress(setting)}
            containerStyle={[
              styles.listItem,
              index === settings.length - 1 && styles.lastListItem,
            ]}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.settingTitle}>
                <ListItem.Icon name={setting.icon} type="material" />
                <Text style={styles.settingText}>{setting.title}</Text>
              </ListItem.Title>
            </ListItem.Content>
            {setting.type === 'switch' ? (
              <Switch
                value={setting.value}
                onValueChange={() => handleSettingPress(setting)}
              />
            ) : (
              <ListItem.Chevron />
            )}
          </ListItem>
        ))}
      </View>

      <Button
        title="Sign Out"
        onPress={handleSignOut}
        type="outline"
        containerStyle={styles.signOutButton}
        titleStyle={styles.signOutButtonText}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    marginBottom: 15,
  },
  name: {
    marginBottom: 5,
  },
  email: {
    color: '#666',
    marginBottom: 15,
  },
  providerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2089dc',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#f0f0f0',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  listItem: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  lastListItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
  },
  signOutButton: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  signOutButtonText: {
    color: '#ff190c',
  },
}); 