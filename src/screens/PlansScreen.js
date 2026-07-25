import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, radius } from '../theme/theme';
import { useAppState } from '../data/AppState';

const PLANS = [
  { key: 'free', tag: 'Basic', title: 'Free', monthly: 'Rs 0', annual: 'Rs 0', features: ['Limited historical sites', 'Standard audio in English', 'Basic map, ad-supported'] },
  { key: 'premium', tag: 'Premium', title: 'Full access', monthly: 'Rs 500/mo', annual: 'Rs 5,000/yr', save: 'Save Rs 1,000', features: ['All landmarks, ad-free', 'Offline downloads', 'Multilingual audio guides'] },
  { key: 'vip', tag: 'VIP', title: 'Everything, plus people', monthly: 'Rs 1,200/mo', annual: 'Rs 12,000/yr', save: 'Save Rs 2,400', features: ['Live guided tours', 'AR + VR exclusive content', 'Monthly in-app credits'] },
];

export default function PlansScreen() {
  const { userTier, setUserTier } = useAppState();
  const [billing, setBilling] = useState('monthly');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h2}>Choose your access</Text>
      <View style={styles.toggleRow}>
        <TouchableOpacity style={[styles.toggleBtn, billing === 'monthly' && styles.toggleBtnActive]} onPress={() => setBilling('monthly')}>
          <Text style={[styles.toggleText, billing === 'monthly' && styles.toggleTextActive]}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleBtn, billing === 'annual' && styles.toggleBtnActive]} onPress={() => setBilling('annual')}>
          <Text style={[styles.toggleText, billing === 'annual' && styles.toggleTextActive]}>Annual</Text>
        </TouchableOpacity>
      </View>

      {PLANS.map(plan => (
        <View key={plan.key} style={[styles.card, plan.key === userTier && styles.cardActive]}>
          <Text style={styles.tag}>{plan.tag}</Text>
          <Text style={styles.title}>{plan.title}</Text>
          <Text style={styles.price}>{billing === 'monthly' ? plan.monthly : plan.annual}</Text>
          {plan.features.map(f => <Text key={f} style={styles.feature}>—  {f}</Text>)}
          <TouchableOpacity style={styles.chooseBtn} onPress={() => setUserTier(plan.key)}>
            <Text style={styles.chooseText}>{plan.key === userTier ? 'Current plan' : `Choose ${plan.tag}`}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment, paddingTop: 56 },
  h2: { fontSize: 21, fontWeight: '700', color: colors.forestDeep, marginHorizontal: 18, marginBottom: 14 },
  toggleRow: { flexDirection: 'row', backgroundColor: colors.parchmentDim, borderRadius: 16, padding: 4, marginHorizontal: 18, marginBottom: 18 },
  toggleBtn: { flex: 1, paddingVertical: 9, borderRadius: 12, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: colors.card },
  toggleText: { fontWeight: '700', fontSize: 12.5, color: colors.inkSoft },
  toggleTextActive: { color: colors.forestDeep },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 18, marginHorizontal: 18, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(78,115,96,0.12)' },
  cardActive: { borderColor: colors.ochre, borderWidth: 1.5 },
  tag: { fontSize: 9.5, textTransform: 'uppercase', letterSpacing: 1, color: colors.inkSoft },
  title: { fontSize: 19, fontWeight: '700', color: colors.forestDeep, marginVertical: 4 },
  price: { fontSize: 22, fontWeight: '700', color: colors.forestDeep, marginBottom: 10 },
  feature: { fontSize: 12.5, color: colors.ink, opacity: 0.85, marginBottom: 3 },
  chooseBtn: { backgroundColor: colors.forestDeep, borderRadius: 14, paddingVertical: 12, alignItems: 'center', marginTop: 10 },
  chooseText: { color: colors.parchment, fontWeight: '700', fontSize: 13 },
});
