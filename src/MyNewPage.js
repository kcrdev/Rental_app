// CheckoutPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const InfoScreen = ({ selectedCar }) => {
  const { make, model, type, transmission, price_per_day, id } = selectedCar;

  const getImage = (id) => {
    switch (id) {
      case 1:
        return require('./assets/vehicles/v-1.png');
      case 2:
        return require('./assets/vehicles/v-2.png');
      case 3:
        return require('./assets/vehicles/v-3.png');
      case 4:
        return require('./assets/vehicles/v-4.png');
      default:
        return null; // You can provide a default image or handle this case as needed
    }
  };

  return (
    <View style={styles.infoScreenContainer}>
      <Image source={getImage(id)} style={styles.carImage} resizeMode="contain" />
      <Text style={styles.infoText}>{`${make} ${model}`}</Text>
      <Text style={styles.infoText}>{`${type} - ${transmission}`}</Text>
      <Text style={styles.infoText}>{`$${price_per_day} /day`}</Text>
    </View>
  );
};

const MyNewPage = ({route, navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupDateTime, setPickupDateTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const selectedCar = route.params ? route.params.selectedCar : null;


  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || pickupDateTime;
    setShowDatePicker(false);
    setPickupDateTime(currentDate);
  };
  const handleDatePress = () => {
    setShowDatePicker(true);
  };



  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleCheckout = () => {
    // Perform validation on user inputs
    if (!fullName || !email || !address || !paymentMethod) {
      Alert.alert('Incomplete Information', 'Please fill in all fields before checking out.');
      return;
    }

    // Perform further checkout logic (e.g., send data to server, process payment, etc.)
    // For this example, we'll just show an alert with the collected information
    Alert.alert('Checkout Successful', `Thank you, ${fullName}! Your order has been placed.`);
    
    // You can navigate to your MyNewPage component or any other screen after successful checkout
    navigation.navigate('MyNewPage');
  };

  const vehicles = [
    // Your dataset here
    {
      "vehicles": [
        {
          "id": 1,
          "make": "Peugeot",
          "model": "3008",
          "type": "SUV",
          "transmission": "Automatic",
          "price_per_day": 100,
          "description": "Discover the PEUGEOT SUV 3008 with its unique design with innovative SUV codes. Its characteristic and original design combines power and elegance with dynamism and flowing lines.",
          "properties": {
            "motor_power_hp": 120,
            "fuel_type": "Diesel",
            "engine_capacity_cc": 1560,
            "traction": "4x2"
          }
        },
        {
          "id": 2,
          "make": "Ford",
          "model": "Focus",
          "type": "Hatchback",
          "transmission": "Automatic",
          "price_per_day": 70,
          "description": "The Ford Focus, known for its sharp handling and expressive design, offers an exciting driving experience. It's a versatile hatchback that's both efficient and fun to drive.",
          "properties": {
            "motor_power_hp": 150,
            "fuel_type": "Petrol",
            "engine_capacity_cc": 2000,
            "traction": "FWD"
          }
        },
        {
          "id": 3,
          "make": "Renault",
          "model": "Megane",
          "type": "Sedan",
          "transmission": "Automatic",
          "price_per_day": 80,
          "description": "Renault Megane stands out with its sleek contours and sophisticated style. The sedan is equipped with advanced technology for a comfortable and safe journey.",
          "properties": {
            "motor_power_hp": 130,
            "fuel_type": "Hybrid",
            "engine_capacity_cc": 1400,
            "traction": "AWD"
          }
        },
        {
          "id": 4,
          "make": "Fiat",
          "model": "Fiorino",
          "type": "MPV",
          "transmission": "Manual",
          "price_per_day": 50,
          "description": "Fiat Fiorino is a compact MPV that offers a practical and economical solution for city driving and small cargo transport. Its compact dimensions make it ideal for navigating narrow streets.",
          "properties": {
            "motor_power_hp": 95,
            "fuel_type": "Petrol",
            "engine_capacity_cc": 1300,
            "traction": "FWD"
          }
        }
      ]
  }
  
  ];
  
  const selectedCarId = route.params ? route.params.id : null;
  

  if (selectedCarId) {
    // Assuming you have a dataset named "vehicles" with car details
    selectedCar = vehicles.find((car) => car.id === selectedCarId);

    if (!selectedCar) {
      Alert.alert('Error', 'Selected car not found in the dataset.');
    }
  } else {
    Alert.alert('Error', 'No car selected.');
  }
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Checkout</Text>
          <TextInput
            style={styles.input}
            placeholder="Pickup Location"
            value={pickupLocation}
            onChangeText={(text) => setPickupLocation(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Drop Location"
            value={dropLocation}
            onChangeText={(text) => setDropLocation(text)}
          />
          <TouchableOpacity style={styles.input} onPress={handleDatePress}>
                <Text style={styles.inputText}>{pickupDateTime.toLocaleString()}</Text>
              </TouchableOpacity>

              {showDatePicker && Platform.OS !== 'web' && (
                <DateTimePicker
                  value={pickupDateTime}
                  mode="datetime"
                  is24Hour={true}
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            
        



          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Payment Method"
            value={paymentMethod}
            onChangeText={(text) => setPaymentMethod(text)}
          />

          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoScreenContainer}>
          <InfoScreen selectedCar={selectedCar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#000', // Black background color for outer space
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    width: '80%', // Adjust the width of the inner container as needed
    backgroundColor: '#fff', // White background color for inner box
    borderRadius: 10,
    elevation: 5, // Adds a shadow to the box (Android only)
    overflow: 'hidden', // Ensures the inner content doesn't overflow the container
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  infoScreenContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Dark text color
  },
  input: {
    height: 50,
    borderColor: '#ccc', // Light border color
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#fff', // White background color
    color: '#333', // Dark text color
  },
  checkoutButton: {
    backgroundColor: '#4caf50', // Green color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  carImage: {
    width: 200, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#333', // Dark text color
    marginBottom: 10,
  },
});

export default MyNewPage;
