import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, SearchBar, Button } from '@rneui/themed';
import { Card } from '../components/Card';

// Mock data - replace with API calls later
const allServices = [
  {
    id: '1',
    title: 'Professional House Cleaning',
    description: 'Experienced cleaners for your home',
    imageUrl: 'https://picsum.photos/400/300',
    price: '80',
    rating: 4.8,
    category: 'Cleaning',
  },
  {
    id: '2',
    title: 'Garden Maintenance',
    description: 'Complete garden care services',
    imageUrl: 'https://picsum.photos/400/301',
    price: '60',
    rating: 4.5,
    category: 'Gardening',
  },
  {
    id: '3',
    title: 'Plumbing Services',
    description: '24/7 emergency plumbing repairs',
    imageUrl: 'https://picsum.photos/400/302',
    price: '100',
    rating: 4.7,
    category: 'Plumbing',
  },
];

const categories = ['All', 'Cleaning', 'Gardening', 'Plumbing', 'Electrical', 'Moving', 'Painting'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredServices = allServices.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    let matchesPrice = true;

    const price = parseInt(service.price);
    if (priceRange === 'low') {
      matchesPrice = price <= 50;
    } else if (priceRange === 'medium') {
      matchesPrice = price > 50 && price <= 100;
    } else if (priceRange === 'high') {
      matchesPrice = price > 100;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search services..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        platform="default"
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        round
        lightTheme
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip,
            ]}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.selectedCategoryChipText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.priceFilterContainer}>
        <Text style={styles.filterTitle}>Price Range:</Text>
        <View style={styles.priceButtons}>
          <Button
            title="All"
            type={priceRange === 'all' ? 'solid' : 'outline'}
            onPress={() => setPriceRange('all')}
            containerStyle={styles.priceButton}
            size="sm"
          />
          <Button
            title="$"
            type={priceRange === 'low' ? 'solid' : 'outline'}
            onPress={() => setPriceRange('low')}
            containerStyle={styles.priceButton}
            size="sm"
          />
          <Button
            title="$$"
            type={priceRange === 'medium' ? 'solid' : 'outline'}
            onPress={() => setPriceRange('medium')}
            containerStyle={styles.priceButton}
            size="sm"
          />
          <Button
            title="$$$"
            type={priceRange === 'high' ? 'solid' : 'outline'}
            onPress={() => setPriceRange('high')}
            containerStyle={styles.priceButton}
            size="sm"
          />
        </View>
      </View>

      <ScrollView style={styles.resultsContainer}>
        {filteredServices.length === 0 ? (
          <Text style={styles.noResults}>No services found</Text>
        ) : (
          filteredServices.map((service) => (
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
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInputContainer: {
    backgroundColor: '#f0f0f0',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedCategoryChip: {
    backgroundColor: '#2089dc',
  },
  categoryChipText: {
    color: '#666',
    fontSize: 14,
  },
  selectedCategoryChipText: {
    color: '#fff',
  },
  priceFilterContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  priceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  resultsContainer: {
    flex: 1,
    padding: 15,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
}); 