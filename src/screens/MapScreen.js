import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/theme';
import { useAppState } from '../data/AppState';
import { coords, mapRegion, itineraries } from '../data/itineraries';

export default function MapScreen({ navigation }) {
  const { userName, userTier, landmarks } = useAppState();

  function openLandmark(landmark) {
    if (landmark.premium && userTier === 'free') {
      navigation.navigate('Paywall', { landmarkName: landmark.name });
      return;
    }
    navigation.navigate('Detail', { id: landmark.id });
  }

  function openItinerary(itinerary) {
    // For now, open the first landmark in the itinerary — a dedicated
    // itinerary detail screen (multi-stop) is a natural next screen to add.
    const first = landmarks.find(l => l.id === itinerary.landmarkIds[0]);
    if (first) openLandmark(first);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={mapRegion}>
        {landmarks.map((l, i) => {
          const locked = l.premium && userTier === 'free';
          return (
            <Marker key={l.id} coordinate={coords[l.id]} onPress={() => openLandmark(l)}>
              <View style={[styles.pinBadge, locked && styles.pinBadgeLocked]}>
                <Text style={styles.pinBadgeText}>{i + 1}</Text>
              </View>
              <Callout onPress={() => openLandmark(l)} tooltip>
                <View style={styles.calloutCard}>
                  <Image source={{ uri: l.img }} style={styles.calloutThumb} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.calloutTitle} numberOfLines={1}>{l.name}</Text>
                    <Text style={styles.calloutMeta}>{locked ? 'Premium · Tap to unlock' : `${l.duration} audio tour`}</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.topOverlay}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(userName[0] || 'G').toUpperCase()}</Text>
        </View>
        <TouchableOpacity style={styles.searchPill} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={15} color={colors.inkSoft} />
          <Text style={styles.searchPillText}>Search stories in Karachi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="options-outline" size={17} color={colors.forestDeep} />
        </TouchableOpacity>
      </View>

      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>Available itineraries in Karachi</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 18, gap: 14 }}>
          {itineraries.map(it => (
            <TouchableOpacity key={it.id} style={styles.itCard} onPress={() => openItinerary(it)}>
              <Image source={{ uri: it.img }} style={styles.itImg} />
              <View style={styles.itBody}>
                <Text style={styles.itTitle} numberOfLines={1}>{it.title}</Text>
                <Text style={styles.itMeta}>{it.distance} away</Text>
                <View style={styles.itRow}>
                  <View style={styles.itStat}>
                    <Ionicons name="location-outline" size={12} color={colors.forestMid} />
                    <Text style={styles.itStatText}>{it.landmarkIds.length} stops</Text>
                  </View>
                  <View style={styles.itStat}>
                    <Ionicons name="time-outline" size={12} color={colors.forestMid} />
                    <Text style={styles.itStatText}>{it.duration}</Text>
                  </View>
                </View>
                <View style={styles.itFooter}>
                  <Text style={styles.itPrice}>{it.price}</Text>
                  <View style={styles.itBtn}><Text style={styles.itBtnText}>View</Text></View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment },
  map: { flex: 1 },

  topOverlay: {
    position: 'absolute', top: 54, left: 16, right: 16,
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.forestMid, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  avatarText: { color: colors.parchment, fontWeight: '700' },
  searchPill: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.card,
    borderRadius: 22, paddingVertical: 11, paddingHorizontal: 14,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 4,
  },
  searchPillText: { color: colors.inkSoft, fontSize: 12.5 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 },

  pinBadge: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: colors.card, borderWidth: 2, borderColor: colors.forestDeep,
    alignItems: 'center', justifyContent: 'center',
  },
  pinBadgeLocked: { borderColor: colors.gold },
  pinBadgeText: { fontWeight: '700', color: colors.forestDeep, fontSize: 13 },

  calloutCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.card, borderRadius: 14, padding: 8,
    width: 190, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6,
  },
  calloutThumb: { width: 40, height: 40, borderRadius: 10 },
  calloutTitle: { fontWeight: '700', fontSize: 12.5, color: colors.ink },
  calloutMeta: { fontSize: 9.5, color: colors.inkSoft, marginTop: 1 },

  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.parchment,
    borderTopLeftRadius: 26, borderTopRightRadius: 26, paddingTop: 16, paddingBottom: 18,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, elevation: 8,
  },
  sheetTitle: { fontSize: 17, fontWeight: '700', color: colors.forestDeep, marginBottom: 12, paddingHorizontal: 18 },

  itCard: { width: 190, backgroundColor: colors.card, borderRadius: 18, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  itImg: { width: '100%', height: 90 },
  itBody: { padding: 10 },
  itTitle: { fontWeight: '700', fontSize: 13, color: colors.ink },
  itMeta: { fontSize: 10, color: colors.inkSoft, marginTop: 2 },
  itRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  itStat: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  itStatText: { fontSize: 9.5, color: colors.forestMid },
  itFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  itPrice: { fontWeight: '700', fontSize: 12, color: colors.forestDeep },
  itBtn: { backgroundColor: colors.forestDeep, borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12 },
  itBtnText: { color: colors.parchment, fontSize: 10.5, fontWeight: '700' },
});
