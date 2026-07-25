import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/theme';
import { useAppState } from '../data/AppState';

export default function ReviewsScreen({ route, navigation }) {
  const { id } = route.params;
  const { landmarks, addReview, userName } = useAppState();
  const landmark = landmarks.find(l => l.id === id);
  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');

  function submit() {
    if (!stars || !text.trim()) return;
    addReview(id, { name: userName === 'Guest' ? 'You (Guest)' : userName, stars, text: text.trim() });
    setStars(0);
    setText('');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={colors.forestDeep} />
        </TouchableOpacity>
        <Text style={styles.h2}>{landmark.name}</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.summary}>
        <Text style={styles.score}>{landmark.rating}</Text>
        <View>
          <Text style={{ color: colors.gold }}>★★★★★</Text>
          <Text style={styles.count}>{landmark.reviewCount} reviews</Text>
        </View>
      </View>

      {landmark.reviews.map((r, i) => (
        <View key={i} style={styles.reviewItem}>
          <View style={styles.rhead}>
            <View style={styles.ravatar}><Text style={{ color: colors.parchment, fontWeight: '700' }}>{r.name[0]}</Text></View>
            <View>
              <Text style={styles.rname}>{r.name}</Text>
              <Text style={{ color: colors.gold, fontSize: 11 }}>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</Text>
            </View>
          </View>
          <Text style={styles.rtext}>{r.text}</Text>
        </View>
      ))}

      <View style={styles.addBox}>
        <Text style={{ fontWeight: '700', marginBottom: 8 }}>Leave a review</Text>
        <View style={{ flexDirection: 'row', gap: 4, marginBottom: 10 }}>
          {[1, 2, 3, 4, 5].map(v => (
            <TouchableOpacity key={v} onPress={() => setStars(v)}>
              <Text style={{ fontSize: 22, color: v <= stars ? colors.gold : '#D8D2BE' }}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="What did you think?"
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          <Text style={{ color: colors.parchment, fontWeight: '700', fontSize: 12 }}>Post review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment, paddingTop: 56 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 12 },
  h2: { fontSize: 18, fontWeight: '700', color: colors.forestDeep },
  summary: { flexDirection: 'row', gap: 16, alignItems: 'center', backgroundColor: colors.card, borderRadius: 18, padding: 16, marginHorizontal: 18, marginBottom: 16 },
  score: { fontSize: 32, fontWeight: '700', color: colors.forestDeep },
  count: { fontSize: 10, color: colors.inkSoft, marginTop: 2 },
  reviewItem: { backgroundColor: colors.card, borderRadius: 16, padding: 14, marginHorizontal: 18, marginBottom: 12 },
  rhead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  ravatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.forestMid, alignItems: 'center', justifyContent: 'center' },
  rname: { fontWeight: '700', fontSize: 12.5 },
  rtext: { fontSize: 12.5, lineHeight: 19, color: colors.ink },
  addBox: { backgroundColor: colors.parchmentDim, borderRadius: 16, padding: 14, marginHorizontal: 18, marginBottom: 30 },
  input: { backgroundColor: colors.card, borderRadius: 12, padding: 10, fontSize: 12.5, height: 60, textAlignVertical: 'top', borderWidth: 1, borderColor: 'rgba(78,115,96,0.25)' },
  submitBtn: { backgroundColor: colors.forestDeep, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16, alignSelf: 'flex-start', marginTop: 10 },
});
