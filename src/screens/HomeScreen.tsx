import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Text, SearchBar } from '@rneui/themed';
import { Card } from '../components/Card';
import { useAuth } from '../context/AuthContext';

// Mock data - replace with API calls later
const featuredServices = [
  {
    id: '1',
    title: 'Professional House Cleaning',
    description: 'Experienced cleaners for your home',
    imageUrl: 'https://picsum.photos/400/300',
    price: '80',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Garden Maintenance',
    description: 'Complete garden care services',
    imageUrl: 'https://picsum.photos/400/301',
    price: '60',
    rating: 4.5,
  },
  {
    id: '3',
    title: 'Plumbing Services',
    description: '24/7 emergency plumbing repairs',
    imageUrl: 'https://picsum.photos/400/302',
    price: '100',
    rating: 4.7,
  },
];

const categories = [
  { id: '1', title: 'Cleaning', icon: '🧹' },
  { id: '2', title: 'Gardening', icon: '🌱' },
  { id: '3', title: 'Plumbing', icon: '🔧' },
  { id: '4', title: 'Electrical', icon: '⚡' },
  { id: '5', title: 'Moving', icon: '📦' },
  { id: '6', title: 'Painting', icon: '🎨' },
];

export default function HomeScreen() {
  const { user } = useAuth();

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={styles.greeting}>
          Welcome back, {user?.name}!
        </Text>
        <SearchBar
          placeholder="Search services..."
          platform="default"
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          round
          lightTheme
        />
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Featured Services</Text>
        {featuredServices.map((service) => (
          <Card
            key={service.id}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
            price={service.price}
            rating={service.rating}
            onPress={() => {
              // TODO: Navigate to service details
              console.log('Navigate to service:', service.id);
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    marginBottom: 15,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  searchInputContainer: {
    backgroundColor: '#f0f0f0',
  },
  categoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  featuredContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
}); 