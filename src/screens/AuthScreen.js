import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius } from '../theme/theme';
import { useAppState } from '../data/AppState';

export default function AuthScreen({ navigation }) {
  const { setUserName } = useAppState();
  const [mode, setMode] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function submit() {
    // TODO: replace with Firebase Auth (createUserWithEmailAndPassword / signInWithEmailAndPassword)
    const resolvedName = name.trim() || (email ? email.split('@')[0] : 'Explorer');
    setUserName(resolvedName);
    navigation.navigate('Quiz');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</Text>
      <Text style={styles.sub}>Save stories, sync progress, unlock badges</Text>

      <View style={styles.toggleRow}>
        <TouchableOpacity style={[styles.toggleBtn, mode === 'signup' && styles.toggleBtnActive]} onPress={() => setMode('signup')}>
          <Text style={[styles.toggleText, mode === 'signup' && styles.toggleTextActive]}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleBtn, mode === 'login' && styles.toggleBtnActive]} onPress={() => setMode('login')}>
          <Text style={[styles.toggleText, mode === 'login' && styles.toggleTextActive]}>Log in</Text>
        </TouchableOpacity>
      </View>

      {mode === 'signup' && (
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Taha Siddiqui" />
        </View>
      )}
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="••••••••" secureTextEntry />
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={submit}>
        <Text style={styles.primaryBtnText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.skip}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment, padding: 28, paddingTop: 60 },
  heading: { fontSize: 24, fontWeight: '700', color: colors.forestDeep, textAlign: 'center' },
  sub: { fontSize: 11.5, color: colors.inkSoft, textAlign: 'center', marginTop: 6, marginBottom: 22 },
  toggleRow: { flexDirection: 'row', backgroundColor: colors.parchmentDim, borderRadius: 14, padding: 4, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: colors.card },
  toggleText: { fontWeight: '700', fontSize: 12.5, color: colors.inkSoft },
  toggleTextActive: { color: colors.forestDeep },
  field: { marginBottom: 14 },
  label: { fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 0.5, color: colors.inkSoft, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: 'rgba(78,115,96,0.25)', backgroundColor: colors.card, borderRadius: 12, padding: 12, fontSize: 14 },
  primaryBtn: { backgroundColor: colors.ochre, paddingVertical: 15, borderRadius: radius.pill, alignItems: 'center', marginTop: 8 },
  primaryBtnText: { color: '#1C1608', fontWeight: '700', fontSize: 15 },
  skip: { textAlign: 'center', marginTop: 16, color: colors.forestMid, textDecorationLine: 'underline', fontSize: 11.5 },
});
