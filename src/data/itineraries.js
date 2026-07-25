import { landmarks } from './landmarks';

// Approximate real-world coordinates for each landmark, Karachi
export const coords = {
  0: { latitude: 24.8394, longitude: 67.0287 }, // Frere Hall
  1: { latitude: 24.8563, longitude: 67.0181 }, // Empress Market
  2: { latitude: 24.8135, longitude: 67.0327 }, // Mohatta Palace
  3: { latitude: 24.8422, longitude: 67.0270 }, // Merewether Clock Tower
};

export const mapRegion = {
  latitude: 24.8380,
  longitude: 67.0270,
  latitudeDelta: 0.09,
  longitudeDelta: 0.09,
};

export const itineraries = [
  {
    id: 'colonial-karachi',
    title: 'Colonial Karachi Walk',
    landmarkIds: [0, 1, 3],
    distance: '3.2 km',
    duration: '2 hours',
    img: landmarks[0].img,
    price: 'Free',
  },
  {
    id: 'palace-and-culture',
    title: "Palace & Clifton Culture",
    landmarkIds: [2],
    distance: '4.7 km',
    duration: '1.5 hours',
    img: landmarks[2].img,
    price: 'Rs 500',
  },
  {
    id: 'full-city',
    title: 'Full City Story',
    landmarkIds: [0, 1, 2, 3],
    distance: '9.1 km',
    duration: '4 hours',
    img: landmarks[3].img,
    price: 'Rs 500',
  },
];
