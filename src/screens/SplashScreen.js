import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../theme/theme';

export default function SplashScreen({ navigation }) {
  return (
    <LinearGradient colors={[colors.forestDeep, '#142720']} style={styles.container}>
      <View style={styles.ringWrap}>
        <View style={styles.core}>
          <Text style={{ fontSize: 22 }}>🎧</Text>
        </View>
      </View>
      <Text style={styles.title}>
        Where history speaks{'\n'}& <Text style={styles.em}>landmarks</Text> listen.
      </Text>
      <Text style={styles.tag}>Karachi, in your ears.</Text>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Auth')}>
        <Text style={styles.primaryBtnText}>Get started</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ghostBtn} onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.ghostBtnText}>Continue as guest</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 34 },
  ringWrap: { width: 90, height: 90, borderRadius: 45, borderWidth: 1.5, borderColor: 'rgba(242,236,220,0.35)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  core: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: '700', color: colors.parchment, textAlign: 'center', lineHeight: 36 },
  em: { color: colors.gold, fontStyle: 'italic' },
  tag: { fontSize: 15, fontStyle: 'italic', color: 'rgba(242,236,220,0.75)', marginTop: 10, marginBottom: 34 },
  primaryBtn: { backgroundColor: colors.gold, paddingVertical: 15, paddingHorizontal: 32, borderRadius: radius.pill, width: '100%', alignItems: 'center' },
  primaryBtnText: { color: '#1C1608', fontWeight: '700', fontSize: 15 },
  ghostBtn: { marginTop: 12, borderWidth: 1, borderColor: 'rgba(242,236,220,0.4)', borderRadius: radius.pill, paddingVertical: 11, paddingHorizontal: 22 },
  ghostBtnText: { color: colors.parchment, fontWeight: '600', fontSize: 13 },
});
