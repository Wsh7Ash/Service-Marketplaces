import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Card as RNECard, Text, Image } from '@rneui/themed';

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  price?: string;
  rating?: number;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  price,
  rating,
  style,
  onPress,
}) => {
  return (
    <RNECard containerStyle={[styles.container, style]} onPress={onPress}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
        <View style={styles.footer}>
          {price && <Text style={styles.price}>${price}</Text>}
          {rating && (
            <View style={styles.rating}>
              <Text style={styles.ratingText}>{rating.toFixed(1)} ★</Text>
            </View>
          )}
        </View>
      </View>
    </RNECard>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 0,
    margin: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2089dc',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#f1c40f',
    fontWeight: '600',
  },
}); 