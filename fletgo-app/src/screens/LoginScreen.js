import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import PhoneInput from '../components/PhoneInput';
import CustomButton from '../components/CustomButton';
import RegisterLink from '../components/RegisterLink';
import { colors } from '../theme/colors';

const Logo = () => (
  <Svg width="280" height="100" viewBox="0 0 1000 300">
    <Rect width="1000" height="300" fill="#000000" />
    <SvgText x="50" y="200" fill="#808080" fontSize="200" fontFamily="Arial">
      fletgo
    </SvgText>
    <SvgText x="50" y="250" fill="#808080" fontSize="40" fontFamily="Arial">
      el flete inteligente
    </SvgText>
    <Rect x="900" y="0" width="100" height="300" fill="#40E0D0" />
  </Svg>
);

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (phoneNumber.length < 8) {
      setError('Por favor ingresa un número válido');
      return;
    }
    setError('');
    navigation.replace('Home');
  };

  const handleRegister = () => {
    // Aquí iría la navegación a la pantalla de registro
    console.log('Navegar a registro');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Logo />
          </View>

          <View style={styles.formContainer}>
            <PhoneInput
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setError('');
              }}
              error={error}
            />

            <CustomButton
              title="Iniciar Sesión"
              onPress={handleLogin}
              disabled={!phoneNumber}
            />

            <RegisterLink onPress={handleRegister} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
});

export default LoginScreen;
