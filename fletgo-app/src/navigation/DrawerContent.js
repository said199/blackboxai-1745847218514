import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const menuItems = [
  { label: 'Inicio', icon: 'home-outline' },
  { label: 'Mis Viajes', icon: 'car-outline' },
  { label: 'Historial', icon: 'time-outline' },
  { label: 'Métodos de Pago', icon: 'card-outline' },
  { label: 'Soporte', icon: 'help-circle-outline' },
  { label: 'Configuración', icon: 'settings-outline' },
];

export function DrawerContent(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {menuItems.map((item, index) => (
            <DrawerItem
              key={index}
              icon={({ color, size }) => (
                <Ionicons name={item.icon} size={size} color={color} />
              )}
              label={item.label}
              onPress={() => {
                // Por ahora solo cerramos el drawer ya que las otras pantallas no están implementadas
                props.navigation.closeDrawer();
              }}
              activeTintColor={colors.secondary}
              inactiveTintColor={colors.text}
              style={styles.drawerItem}
            />
          ))}
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    marginVertical: 0,
  },
});
