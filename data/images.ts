/**
 * Curated Unsplash image pools used across the demo. Sizes are requested via
 * query params so Next/Image can optimise them. Replace with your own CDN.
 */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImages = [
  u("1476514525535-07fb3b4ae5f1", 2000),
  u("1507525428034-b723cf961d3e", 2000),
  u("1501785888041-af3ef285b470", 2000),
];

export const travelImages = [
  u("1501785888041-af3ef285b470"),
  u("1506905925346-21bda4d32df4"),
  u("1502602898657-3e91760cbb34"),
  u("1520250497591-112f2f40a3f4"),
  u("1528127269322-539801943592"),
  u("1476514525535-07fb3b4ae5f1"),
  u("1512453979798-5ea266f8880c"),
  u("1533105079780-92b9be482077"),
  u("1518548419970-58e3b4079ab2"),
  u("1530789253388-582c481c54b0"),
  u("1507525428034-b723cf961d3e"),
  u("1519046904884-53103b34b206"),
  u("1544644181-1484b3fdfc62"),
  u("1548013146-72479768bada"),
  u("1571896349842-33c89424de2d"),
  u("1439066615861-d1af74d74000"),
  u("1502086223501-7ea6ecd79368"),
  u("1551632811-561732d1e306"),
  u("1469474968028-56623f02e42e"),
  u("1470071459604-3b5ec3a7fe05"),
];

export const avatars = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80",
];

export const blogCovers = [
  u("1488646953014-85cb44e25828"),
  u("1503220317375-aaad61436b1b"),
  u("1469854523086-cc02fe5d8800"),
  u("1502602898657-3e91760cbb34"),
  u("1530789253388-582c481c54b0"),
  u("1526772662000-3f88f10405ff"),
];
