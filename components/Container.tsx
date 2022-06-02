import React from "react";
import { View, StyleSheet, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

export const Container = ({ children }: Props) => {

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['rgb(250, 119, 69)', 'rgb(243, 196, 66)']} style={styles.colorGradient}>
      </LinearGradient>
      <LinearGradient colors={[
        'rgba(255, 255, 255, 0)',
        'rgba(253, 253, 253, 0.2)',
        'rgba(249, 249, 249, 0.85)',
        'rgb(248, 248, 248)'
      ]}
        style={styles.transparentGradient} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.wrapper} >
        {children}
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(248, 248, 248)',
  },
  colorGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 157
  },
  transparentGradient: {
    position: 'absolute',
    top: 79,
    left: 0,
    right: 0,
    height: 80
  },
  logo: {
    position: 'relative',
    marginLeft: 20
  },
  wrapper: {
    flex: 1,
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 1,
  }
});