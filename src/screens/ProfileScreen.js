import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, radius } from '../theme/theme';
import { useAppState } from '../data/AppState';

const TIERS = ['free', 'premium', 'vip'];

export default function ProfileScreen({ navigation }) {
  const { userName, userTier, setUserTier } = useAppState();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{(userName[0] || 'G').toUpperCase()}</Text></View>
        <View>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.tier}>{userTier.toUpperCase()} MEMBER · KARACHI</Text>
        </View>
      </View>

      <View style={styles.statRow}>
        <View style={styles.statBox}><Text style={styles.statNum}>1</Text><Text style={styles.statLbl}>VISITED</Text></View>
        <View style={styles.statBox}><Text style={styles.statNum}>3</Text><Text style={styles.statLbl}>SAVED</Text></View>
        <View style={styles.statBox}><Text style={styles.statNum}>42m</Text><Text style={styles.statLbl}>LISTENED</Text></View>
      </View>

      <TouchableOpacity style={styles.upgrade} onPress={() => navigation.navigate('Plans')}>
        <View>
          <Text style={styles.upgradeTitle}>Unlock every story</Text>
          <Text style={styles.upgradeSub}>Premium starts at Rs 500/mo</Text>
        </View>
        <Text style={{ color: colors.parchment, fontSize: 18 }}>›</Text>
      </TouchableOpacity>

      <View style={styles.demoBox}>
        <Text style={styles.demoLabel}>DEMO CONTROL — simulate membership tier</Text>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {TIERS.map(t => (
            <TouchableOpacity key={t} style={[styles.tierBtn, userTier === t && styles.tierBtnActive]} onPress={() => setUserTier(t)}>
              <Text style={[styles.tierBtnText, userTier === t && styles.tierBtnTextActive]}>{t.charAt(0).toUpperCase() + t.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment, paddingTop: 56 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, marginBottom: 16 },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.forestMid, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.parchment, fontSize: 20, fontWeight: '700' },
  name: { fontSize: 18, fontWeight: '700', color: colors.ink },
  tier: { fontSize: 10, color: colors.inkSoft, marginTop: 2 },
  statRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 18, marginBottom: 18 },
  statBox: { flex: 1, backgroundColor: colors.card, borderRadius: 16, padding: 12, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '700', color: colors.forestDeep },
  statLbl: { fontSize: 9, color: colors.inkSoft, marginTop: 2 },
  upgrade: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.forestDeep, borderRadius: 18, padding: 16, marginHorizontal: 18, marginBottom: 20 },
  upgradeTitle: { color: colors.parchment, fontWeight: '700', fontSize: 14 },
  upgradeSub: { color: 'rgba(242,236,220,0.7)', fontSize: 10, marginTop: 2 },
  demoBox: { marginHorizontal: 18, backgroundColor: colors.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(78,115,96,0.3)', borderStyle: 'dashed', marginBottom: 30 },
  demoLabel: { fontSize: 9.5, color: colors.inkSoft, marginBottom: 8 },
  tierBtn: { flex: 1, backgroundColor: colors.parchmentDim, borderRadius: 9, paddingVertical: 7, alignItems: 'center' },
  tierBtnActive: { backgroundColor: colors.forestDeep },
  tierBtnText: { fontSize: 10.5, fontWeight: '700', color: colors.inkSoft },
  tierBtnTextActive: { color: colors.parchment },
});
