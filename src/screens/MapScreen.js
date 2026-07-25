import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/theme';
import { useAppState } from '../data/AppState';

export default function MapScreen({ navigation }) {
  const { userName, userTier, landmarks, quizAnswers } = useAppState();

  const greetingName = userName === 'Guest' ? 'Nearby echoes' : `${userName.split(' ')[0]}'s echoes`;
  const recommended = useMemo(
    () => landmarks.find(l => l.category === quizAnswers.interest) || null,
    [landmarks, quizAnswers]
  );

  function openLandmark(landmark) {
    if (landmark.premium && userTier === 'free') {
      navigation.navigate('Paywall', { landmarkName: landmark.name });
      return;
    }
    navigation.navigate('Detail', { id: landmark.id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <View>
          <Text style={styles.eyebrow}>Good evening</Text>
          <Text style={styles.h2}>{greetingName}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(userName[0] || 'G').toUpperCase()}</Text>
        </View>
      </View>

      {recommended && (
        <TouchableOpacity style={styles.reco} onPress={() => openLandmark(recommended)}>
          <Text style={styles.recoTag}>Because you love it</Text>
          <Text style={styles.recoText}>
            Start with <Text style={{ color: colors.gold, fontWeight: '700' }}>{recommended.name}</Text> — picked for you
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionLabel}>{landmarks.length} stories within walking distance</Text>
      <FlatList
        data={landmarks}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ padding: 16, paddingTop: 4 }}
        renderItem={({ item }) => {
          const locked = item.premium && userTier === 'free';
          return (
            <TouchableOpacity style={styles.card} onPress={() => openLandmark(item)}>
              <Image source={{ uri: item.img }} style={styles.thumb} />
              {locked && (
                <View style={styles.lockOverlay}>
                  <Ionicons name="lock-closed" size={16} color={colors.parchment} />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>
                  {item.name} {item.premium ? <Text style={styles.premiumTag}> PREMIUM </Text> : null}
                </Text>
                <Text style={styles.cardMeta}>{item.year} · {item.distance}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.inkSoft} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 56 },
  eyebrow: { fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 1, color: colors.inkSoft },
  h2: { fontSize: 21, fontWeight: '700', color: colors.forestDeep },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.forestMid, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.parchment, fontWeight: '700' },
  reco: { marginHorizontal: 16, marginBottom: 12, backgroundColor: colors.forestDeep, borderRadius: 18, padding: 14 },
  recoTag: { color: 'rgba(242,236,220,0.65)', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 },
  recoText: { color: colors.parchment, fontSize: 14, marginTop: 4 },
  sectionLabel: { fontWeight: '700', fontSize: 14, color: colors.forestDeep, marginLeft: 16, marginTop: 4 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginBottom: 10 },
  thumb: { width: 52, height: 52, borderRadius: 12, backgroundColor: colors.parchmentDim },
  lockOverlay: { position: 'absolute', left: 10, top: 10, width: 52, height: 52, borderRadius: 12, backgroundColor: 'rgba(15,20,17,0.45)', alignItems: 'center', justifyContent: 'center' },
  cardName: { fontWeight: '700', fontSize: 14.5, color: colors.ink },
  premiumTag: { fontSize: 8, backgroundColor: colors.gold, color: '#1C1608', borderRadius: 5, overflow: 'hidden' },
  cardMeta: { fontSize: 11, color: colors.inkSoft, marginTop: 2 },
});
