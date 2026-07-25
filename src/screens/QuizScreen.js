import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius } from '../theme/theme';
import { useAppState } from '../data/AppState';

const INTEREST_OPTIONS = [
  { icon: '🏛️', label: 'History & architecture', value: 'History & Architecture' },
  { icon: '🍲', label: 'Food & local culture', value: 'Food & Culture' },
  { icon: '🕯️', label: 'Hidden, untold stories', value: 'Hidden Stories' },
  { icon: '✨', label: 'A bit of everything', value: 'A bit of everything' },
];
const PACE_OPTIONS = [
  { icon: '🐢', label: 'Slow & deep — one story at a time', value: 'Slow & deep' },
  { icon: '⚡', label: 'Quick highlights on the move', value: 'Quick highlights' },
];

export default function QuizScreen({ navigation }) {
  const { setQuizAnswers } = useAppState();
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState(null);

  function pickInterest(value) {
    setInterest(value);
    setTimeout(() => setStep(2), 200);
  }

  function pickPace(value) {
    setQuizAnswers({ interest, pace: value });
    navigation.replace('Main');
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressRow}>
        <View style={[styles.seg, styles.segDone]} />
        <View style={[styles.seg, step === 2 && styles.segDone]} />
      </View>

      {step === 1 ? (
        <>
          <Text style={styles.eyebrow}>Question 1 of 2</Text>
          <Text style={styles.question}>What pulls you in when you explore a new place?</Text>
          {INTEREST_OPTIONS.map(opt => (
            <TouchableOpacity key={opt.value} style={styles.option} onPress={() => pickInterest(opt.value)}>
              <View style={styles.icon}><Text>{opt.icon}</Text></View>
              <Text style={styles.optionLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <>
          <Text style={styles.eyebrow}>Question 2 of 2</Text>
          <Text style={styles.question}>How do you like to explore?</Text>
          {PACE_OPTIONS.map(opt => (
            <TouchableOpacity key={opt.value} style={styles.option} onPress={() => pickPace(opt.value)}>
              <View style={styles.icon}><Text>{opt.icon}</Text></View>
              <Text style={styles.optionLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment, padding: 28, paddingTop: 60, justifyContent: 'center' },
  progressRow: { flexDirection: 'row', gap: 6, marginBottom: 26 },
  seg: { flex: 1, height: 4, borderRadius: 3, backgroundColor: colors.parchmentDim },
  segDone: { backgroundColor: colors.ochre },
  eyebrow: { fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 1, color: colors.inkSoft },
  question: { fontSize: 22, fontWeight: '700', color: colors.forestDeep, marginTop: 8, marginBottom: 22, lineHeight: 28 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: radius.md, padding: 14, marginBottom: 10 },
  icon: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.parchmentDim, alignItems: 'center', justifyContent: 'center' },
  optionLabel: { fontWeight: '600', fontSize: 13.5, color: colors.ink, flexShrink: 1 },
});
