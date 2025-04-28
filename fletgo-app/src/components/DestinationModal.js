import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const DestinationModal = ({ visible, onClose, onSelectDestination }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      translateY.setValue(gesture.dy);
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dy > 50) {
        onClose();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View 
        style={[
          styles.modalContent,
          {
            transform: [{ translateY }]
          }
        ]}
      >
        <View {...panResponder.panHandlers} style={styles.dragBarContainer}>
          <View style={styles.dragBar} />
        </View>

        <GooglePlacesAutocomplete
          placeholder="¿A dónde vas?"
          onPress={(data, details = null) => {
            if (details && details.geometry) {
              onSelectDestination(data.description, {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
              onClose();
            }
          }}
          query={{
            key: 'AIzaSyAqy_G2t4hBh83VyH6UDaXUYeSnLS-v0ng',
            language: 'es',
            components: 'country:hn',
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.input,
            listView: styles.listView,
            row: styles.row,
            description: styles.description,
            separator: styles.separator,
          }}
          renderLeftButton={() => (
            <View style={styles.iconLeft}>
              <Ionicons name="location" size={24} color={colors.primary} />
            </View>
          )}
          renderRightButton={() => (
            <View style={styles.iconRight}>
              <Ionicons name="search" size={24} color={colors.primary} />
            </View>
          )}
          listViewDisplayed={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '20%', // Cambiado de 30% a 20%
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dragBarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  autocompleteContainer: {
    flex: 0,
  },
  input: {
    height: 50,
    fontSize: 16,
    backgroundColor: colors.inputBg,
    color: colors.primary,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 40,
  },
  iconLeft: {
    position: 'absolute',
    left: 10,
    top: 12,
    zIndex: 10,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    top: 12,
    zIndex: 10,
  },
  listView: {
    backgroundColor: colors.background,
    borderRadius: 8,
    marginTop: 5,
  },
  row: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBg,
  },
  description: {
    fontSize: 14,
    color: colors.primary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.inputBg,
  },
});

export default DestinationModal;
