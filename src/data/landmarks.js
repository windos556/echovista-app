export const IMG = {
  frere: 'https://commons.wikimedia.org/wiki/Special:FilePath/Frere%20Hall%2C%20Fatima%20Jinnah%20Rd%2C%20Karachi.jpg?width=900',
  empress: 'https://commons.wikimedia.org/wiki/Special:FilePath/Empress%20Market%2C%20Karachi.jpg?width=900',
  mohatta: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mohatta%20Palace%20Clifton.jpg?width=900',
  merewether: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mereweather%20Clock%20Tower%2C%20Karachi.jpg?width=900',
};

export const landmarks = [
  {
    id: 0,
    name: 'Frere Hall',
    year: 'Built 1865',
    img: IMG.frere,
    premium: false,
    narrator: 'Narrated by Amna K. — local historian',
    category: 'History & Architecture',
    blurb:
      "A Gothic revival hall raised as a farewell gift to a departing commissioner, its stone arches now shelter a secret garden library and a ceiling of murals painted decades later by one of the country's most restless artists.",
    duration: '3:42',
    distance: '4 min walk from you',
    listens: '1,204 listens this month',
    rating: 4.7,
    reviewCount: 128,
    reviews: [
      { name: 'Ayesha M.', stars: 5, text: 'Sat on the lawn for an hour just listening. The mural story genuinely surprised me.' },
      { name: 'Bilal K.', stars: 4, text: 'Great narration, wish the audio was a bit longer honestly.' },
    ],
  },
  {
    id: 1,
    name: 'Empress Market',
    year: 'Built 1889',
    img: IMG.empress,
    premium: false,
    narrator: 'Narrated by Saad R. — market vendor, 3rd generation',
    category: 'Food & Culture',
    blurb:
      "A colonial market tower built on the site of 1857 uprising reprisals, its clocktower has watched over spice traders and fishmongers for well over a century — the city's loudest, oldest bazaar.",
    duration: '4:10',
    distance: '11 min walk from you',
    listens: '2,031 listens this month',
    rating: 4.5,
    reviewCount: 96,
    reviews: [
      { name: 'Hamza T.', stars: 4, text: 'Loud, chaotic, wonderful. The history bit about 1857 hit different while standing right there.' },
    ],
  },
  {
    id: 2,
    name: 'Mohatta Palace',
    year: 'Built 1927',
    img: IMG.mohatta,
    premium: true,
    narrator: 'Narrated by Dr. Nasreen F. — museum curator',
    category: 'History & Architecture',
    blurb:
      'A Rajasthani-pink summer palace built for a Hindu merchant, later home to Fatima Jinnah, now a museum holding the quiet weight of a city that changed hands more than once.',
    duration: '5:05',
    distance: '18 min walk from you',
    listens: '860 listens this month',
    rating: 4.9,
    reviewCount: 64,
    reviews: [
      { name: 'Imran S.', stars: 5, text: 'The pink stone against the sky at sunset is worth the trip alone.' },
    ],
  },
  {
    id: 3,
    name: 'Merewether Clock Tower',
    year: 'Built 1892',
    img: IMG.merewether,
    premium: true,
    narrator: 'Narrated by Amna K. — local historian',
    category: 'Hidden Stories',
    blurb:
      "Named for a commissioner few remember fondly, this Gothic-Italianate tower has stood at the heart of Karachi's busiest traffic circle for over a hundred years, indifferent to the honking below.",
    duration: '2:58',
    distance: '22 min walk from you',
    listens: '512 listens this month',
    rating: 4.3,
    reviewCount: 41,
    reviews: [
      { name: 'Fatima J.', stars: 4, text: 'Never noticed this tower properly until this tour made me actually look up.' },
    ],
  },
];
