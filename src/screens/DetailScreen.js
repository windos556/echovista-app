import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/theme';
import { useAppState } from '../data/AppState';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const { landmarks } = useAppState();
  const landmark = landmarks.find(l => l.id === id);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      Speech.stop();
      clearInterval(timerRef.current);
    };
  }, []);

  function togglePlay() {
    if (playing) {
      Speech.stop();
      clearInterval(timerRef.current);
      setPlaying(false);
      return;
    }
    setElapsed(0);
    setPlaying(true);
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    Speech.speak(landmark.blurb, {
      rate: 0.95,
      onDone: () => { setPlaying(false); clearInterval(timerRef.current); },
      onStopped: () => { setPlaying(false); clearInterval(timerRef.current); },
      onError: () => { setPlaying(false); clearInterval(timerRef.current); },
    });
  }

  const mm = Math.floor(elapsed / 60);
  const ss = String(elapsed % 60).padStart(2, '0');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image source={{ uri: landmark.img }} style={StyleSheet.absoluteFill} />
        <View style={styles.heroOverlay} />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={18} color={colors.parchment} />
        </TouchableOpacity>
        <View style={styles.heroText}>
          <Text style={styles.heroTag}>{landmark.year}</Text>
          <Text style={styles.heroTitle}>{landmark.name}</Text>
        </View>
      </View>
      <Text style={styles.credit}>Photo via Wikimedia Commons</Text>

      <View style={styles.audioBlock}>
        <Text style={styles.narrator}>{landmark.narrator.toUpperCase()}</Text>
        <View style={styles.playRow}>
          <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
            <Ionicons name={playing ? 'pause' : 'play'} size={18} color={colors.parchment} />
          </TouchableOpacity>
          <View style={styles.waveform}>
            {Array.from({ length: 20 }).map((_, i) => (
              <View key={i} style={[styles.bar, playing && { height: 6 + ((i * 7) % 20) }]} />
            ))}
          </View>
        </View>
        <Text style={styles.timeStatus}>{playing ? `${mm}:${ss} elapsed` : elapsed > 0 ? 'Finished — tap to replay' : 'Tap play to listen'}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.blurb}>{landmark.blurb}</Text>
        <View style={styles.factsRow}>
          <View style={styles.chip}><Text style={styles.chipText}>{landmark.distance}</Text></View>
          <View style={styles.chip}><Text style={styles.chipText}>{landmark.listens}</Text></View>
        </View>
      </View>

      <TouchableOpacity style={styles.reviewsCta} onPress={() => navigation.navigate('Reviews', { id: landmark.id })}>
        <Text style={styles.reviewsText}>★ {landmark.rating} · {landmark.reviewCount} reviews</Text>
        <Text style={styles.reviewsText}>See all ›</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment },
  hero: { height: 230, justifyContent: 'flex-end', padding: 18 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(12,18,14,0.55)' },
  backBtn: { position: 'absolute', top: 50, left: 16, width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  heroText: {},
  heroTag: { color: colors.parchment, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.85 },
  heroTitle: { color: colors.parchment, fontSize: 25, fontWeight: '700', marginTop: 4 },
  credit: { fontSize: 9, color: colors.inkSoft, paddingHorizontal: 18, paddingTop: 5, opacity: 0.7 },
  audioBlock: { margin: 18, marginTop: 12, backgroundColor: colors.card, borderRadius: radius.lg, padding: 16 },
  narrator: { fontSize: 10, color: colors.inkSoft, marginBottom: 12 },
  playRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  playBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.forestMid, alignItems: 'center', justifyContent: 'center' },
  waveform: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 3, height: 30 },
  bar: { width: 3, height: 6, borderRadius: 2, backgroundColor: colors.forestLine },
  timeStatus: { fontSize: 10, color: colors.inkSoft, marginTop: 8 },
  body: { paddingHorizontal: 18 },
  blurb: { fontSize: 13.5, lineHeight: 21, color: colors.ink },
  factsRow: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  chip: { backgroundColor: colors.parchmentDim, borderRadius: 10, paddingVertical: 6, paddingHorizontal: 10 },
  chipText: { fontSize: 10, color: colors.forestDeep },
  reviewsCta: { flexDirection: 'row', justifyContent: 'space-between', margin: 18, backgroundColor: colors.card, borderRadius: radius.md, padding: 13, borderWidth: 1, borderColor: 'rgba(78,115,96,0.15)' },
  reviewsText: { fontWeight: '700', fontSize: 12.5, color: colors.forestDeep },
});
