import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/theme';

export default function PaywallScreen({ route, navigation }) {
  const { landmarkName } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.lockCircle}>
          <Ionicons name="lock-closed" size={22} color={colors.forestDeep} />
        </View>
        <Text style={styles.title}>{landmarkName}</Text>
        <Text style={styles.body}>
          This story is part of Echovista Premium. Upgrade to unlock full narration, offline access, and every
          landmark in the city.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Plans')}>
          <Text style={styles.btnText}>View plans</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment, padding: 18, paddingTop: 60 },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 22, alignItems: 'center' },
  lockCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.parchmentDim, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  title: { fontSize: 18, fontWeight: '700', color: colors.forestDeep, marginBottom: 8 },
  body: { fontSize: 12.5, color: colors.inkSoft, textAlign: 'center', lineHeight: 19, marginBottom: 18 },
  btn: { backgroundColor: colors.gold, paddingVertical: 14, paddingHorizontal: 28, borderRadius: radius.pill },
  btnText: { color: '#1C1608', fontWeight: '700' },
});
