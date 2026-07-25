import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/theme';
import { useAppState } from '../data/AppState';

const FILTERS = ['all', 'free', 'premium'];

export default function SearchScreen({ navigation }) {
  const { landmarks, userTier } = useAppState();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const results = useMemo(() => {
    let r = landmarks.filter(l =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.category.toLowerCase().includes(query.toLowerCase())
    );
    if (filter === 'free') r = r.filter(l => !l.premium);
    if (filter === 'premium') r = r.filter(l => l.premium);
    return r;
  }, [landmarks, query, filter]);

  function openLandmark(l) {
    if (l.premium && userTier === 'free') {
      navigation.navigate('Paywall', { landmarkName: l.name });
      return;
    }
    navigation.navigate('Detail', { id: l.id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={colors.forestDeep} />
        </TouchableOpacity>
        <Text style={styles.h2}>Search stories</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={15} color={colors.inkSoft} />
        <TextInput
          style={styles.input}
          placeholder="Try 'Palace' or 'Market'"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity key={f} style={[styles.chip, filter === f && styles.chipActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>{f[0].toUpperCase() + f.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={results}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ padding: 16, paddingTop: 4 }}
        ListEmptyComponent={<Text style={styles.empty}>No stories match that search yet.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openLandmark(item)}>
            <Image source={{ uri: item.img }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name} {item.premium ? <Text style={styles.premTag}> PREMIUM </Text> : null}</Text>
              <Text style={styles.meta}>{item.category} · ★ {item.rating}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.inkSoft} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment, paddingTop: 56 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 12 },
  h2: { fontSize: 18, fontWeight: '700', color: colors.forestDeep },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.card, borderRadius: 16, padding: 12, marginHorizontal: 16, marginBottom: 12 },
  input: { flex: 1, fontSize: 13.5 },
  filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 12 },
  chip: { backgroundColor: colors.parchmentDim, borderRadius: 16, paddingVertical: 7, paddingHorizontal: 13 },
  chipActive: { backgroundColor: colors.forestDeep },
  chipText: { fontSize: 10.5, color: colors.inkSoft, fontWeight: '600' },
  chipTextActive: { color: colors.parchment },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginBottom: 10 },
  thumb: { width: 52, height: 52, borderRadius: 12, backgroundColor: colors.parchmentDim },
  name: { fontWeight: '700', fontSize: 14.5, color: colors.ink },
  premTag: { fontSize: 8, backgroundColor: colors.gold, color: '#1C1608', borderRadius: 5, overflow: 'hidden' },
  meta: { fontSize: 11, color: colors.inkSoft, marginTop: 2 },
  empty: { textAlign: 'center', color: colors.inkSoft, marginTop: 40, fontSize: 13 },
});
