import { Issue } from '../types/issue';

export const DUMMY_ISSUES: Issue[] = [
  {
    id: '1',
    title: 'Large pothole on Main St',
    description:
      'Deep pothole near the intersection of Main St and 3rd Ave. Causes damage to vehicles and is a safety hazard.',
    category: 'Pothole',
    status: 'not_done',
    imageUri: 'https://images.unsplash.com/photo-1515162305285-0293e4f12e5d?w=600&q=80',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: 'Main St & 3rd Ave, San Francisco, CA',
    },
    createdAt: '2025-05-28T09:15:00Z',
  },
  {
    id: '2',
    title: 'Broken street lamp',
    description:
      'Street lamp has been out for two weeks, making this block very dark and unsafe at night.',
    category: 'Lighting',
    status: 'in_progress',
    imageUri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    location: {
      latitude: 37.776,
      longitude: -122.418,
      address: '450 Oak St, San Francisco, CA',
    },
    createdAt: '2025-05-25T14:30:00Z',
  },
  {
    id: '3',
    title: 'Overflowing trash bins',
    description:
      'Trash bins in front of the park have been overflowing for days. Garbage is spilling onto the sidewalk.',
    category: 'Trash',
    status: 'completed',
    imageUri: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80',
    location: {
      latitude: 37.773,
      longitude: -122.421,
      address: 'Dolores Park, San Francisco, CA',
    },
    createdAt: '2025-05-20T11:00:00Z',
  },
  {
    id: '4',
    title: 'Graffiti on bridge wall',
    description:
      'Large graffiti tags covering the south wall of the underpass. Has been growing for several weeks.',
    category: 'Graffiti',
    status: 'not_done',
    imageUri: 'https://images.unsplash.com/photo-1555959830-7d1a91e6f9c1?w=600&q=80',
    location: {
      latitude: 37.778,
      longitude: -122.415,
      address: 'Market St Underpass, San Francisco, CA',
    },
    createdAt: '2025-05-30T08:00:00Z',
  },
  {
    id: '5',
    title: 'Cracked sidewalk',
    description:
      'Severely cracked sidewalk panel is a tripping hazard. Several people have already reported falls.',
    category: 'Other',
    status: 'in_progress',
    imageUri: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=600&q=80',
    location: {
      latitude: 37.7715,
      longitude: -122.4224,
      address: '210 Valencia St, San Francisco, CA',
    },
    createdAt: '2025-05-22T16:45:00Z',
  },
  {
    id: '6',
    title: 'Flooded intersection',
    description:
      'Water pools heavily after any rain, blocking pedestrian crossings. Drain appears to be clogged.',
    category: 'Other',
    status: 'not_done',
    imageUri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
    location: {
      latitude: 37.77,
      longitude: -122.423,
      address: 'Guerrero St & 18th St, San Francisco, CA',
    },
    createdAt: '2025-06-01T07:20:00Z',
  },
];
