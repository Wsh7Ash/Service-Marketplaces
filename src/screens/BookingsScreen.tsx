import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Tab, TabView, Button, Avatar } from '@rneui/themed';
import { useAuth } from '../context/AuthContext';

// Mock data - replace with API calls later
const mockBookings = {
  upcoming: [
    {
      id: '1',
      serviceName: 'House Cleaning',
      providerName: 'Maria Garcia',
      providerAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      date: '2024-03-25',
      time: '14:00',
      status: 'confirmed',
      price: '80',
    },
    {
      id: '2',
      serviceName: 'Garden Maintenance',
      providerName: 'John Smith',
      providerAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      date: '2024-03-28',
      time: '10:00',
      status: 'pending',
      price: '60',
    },
  ],
  past: [
    {
      id: '3',
      serviceName: 'Plumbing Repair',
      providerName: 'Mike Johnson',
      providerAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      date: '2024-03-15',
      time: '11:00',
      status: 'completed',
      price: '120',
      rating: 5,
    },
    {
      id: '4',
      serviceName: 'House Cleaning',
      providerName: 'Maria Garcia',
      providerAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      date: '2024-03-10',
      time: '09:00',
      status: 'completed',
      price: '80',
      rating: 4,
    },
  ],
};

type Booking = typeof mockBookings.upcoming[0] | typeof mockBookings.past[0];

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'completed':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View style={styles.providerInfo}>
          <Avatar
            rounded
            source={{ uri: booking.providerAvatar }}
            size={50}
          />
          <View style={styles.providerText}>
            <Text style={styles.serviceName}>{booking.serviceName}</Text>
            <Text style={styles.providerName}>{booking.providerName}</Text>
          </View>
        </View>
        <Text style={[styles.status, { color: getStatusColor(booking.status) }]}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Text>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{formatDate(booking.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time:</Text>
          <Text style={styles.detailValue}>{booking.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>${booking.price}</Text>
        </View>
      </View>

      {'rating' in booking ? (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rating: {'⭐'.repeat(booking.rating)}</Text>
        </View>
      ) : (
        <View style={styles.actionsContainer}>
          <Button
            title={booking.status === 'pending' ? 'Cancel' : 'Reschedule'}
            type="outline"
            containerStyle={styles.actionButton}
          />
          <Button
            title="Message"
            containerStyle={styles.actionButton}
          />
        </View>
      )}
    </View>
  );
};

export default function BookingsScreen() {
  const [index, setIndex] = useState(0);
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>My Bookings</Text>

      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={styles.tabIndicator}
        variant="primary"
      >
        <Tab.Item
          title="Upcoming"
          titleStyle={styles.tabTitle}
        />
        <Tab.Item
          title="Past"
          titleStyle={styles.tabTitle}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabContent}>
          <ScrollView>
            {mockBookings.upcoming.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </ScrollView>
        </TabView.Item>

        <TabView.Item style={styles.tabContent}>
          <ScrollView>
            {mockBookings.past.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </ScrollView>
        </TabView.Item>
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    padding: 20,
    paddingBottom: 10,
  },
  tabIndicator: {
    backgroundColor: '#2089dc',
    height: 3,
  },
  tabTitle: {
    fontSize: 14,
    color: '#666',
  },
  tabContent: {
    width: '100%',
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerText: {
    marginLeft: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  bookingDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  ratingContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
}); 