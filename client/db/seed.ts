import { pool } from './pool';

/**
 * Seed the database with sample data: 20 restaurants, 5 visits, and order items.
 *
 * Run with: npm run seed
 *
 * Clears existing rows first so re-seeding gives you a clean, predictable set.
 */

const restaurants = [
  {
    name: 'The Rusty Spoon',
    cuisine: 'American',
    address: '12 Main St',
    rating: 4.5,
    latitude: 37.7749,
    longitude: -122.4194,
    distance_from_home: 2.3,
    price_range: '$$',
    phone: '(555) 123-4567',
    website: 'https://rustyspoon.com',
    hours: 'Mon-Sun 11am-10pm'
  },
  {
    name: 'Sakura House',
    cuisine: 'Japanese',
    address: '88 Cherry Ln',
    rating: 4.8,
    latitude: 37.7899,
    longitude: -122.4014,
    distance_from_home: 3.1,
    price_range: '$$$$',
    phone: '(555) 234-5678',
    website: 'https://sakurahouse.com',
    hours: 'Tue-Sun 5pm-11pm'
  },
  {
    name: 'Bella Napoli',
    cuisine: 'Italian',
    address: '301 Olive Ave',
    rating: 4.2,
    latitude: 37.7849,
    longitude: -122.4094,
    distance_from_home: 1.8,
    price_range: '$$',
    phone: '(555) 345-6789',
    website: 'https://bellanapoli.com',
    hours: 'Mon-Sun 12pm-10pm'
  },
  {
    name: 'El Fuego',
    cuisine: 'Mexican',
    address: '47 Sol Blvd',
    rating: 4.6,
    latitude: 37.7699,
    longitude: -122.4294,
    distance_from_home: 4.2,
    price_range: '$',
    phone: '(555) 456-7890',
    website: 'https://elfuego.com',
    hours: 'Mon-Sun 10am-9pm'
  },
  {
    name: 'Green Bowl',
    cuisine: 'Vegetarian',
    address: '5 Garden Way',
    rating: 3.9,
    latitude: 37.7999,
    longitude: -122.3994,
    distance_from_home: 2.7,
    price_range: '$$',
    phone: '(555) 567-8901',
    website: 'https://greenbowl.com',
    hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm'
  },
  {
    name: 'Golden Dragon',
    cuisine: 'Chinese',
    address: '999 Dragon St',
    rating: 4.1,
    latitude: 37.7749,
    longitude: -122.4294,
    distance_from_home: 3.5,
    price_range: '$$',
    phone: '(555) 678-9012',
    website: 'https://goldendragon.com',
    hours: 'Mon-Sun 11am-9:30pm'
  },
  {
    name: 'Spice Route',
    cuisine: 'Indian',
    address: '42 Curry Lane',
    rating: 4.7,
    latitude: 37.7899,
    longitude: -122.4194,
    distance_from_home: 2.1,
    price_range: '$$$',
    phone: '(555) 789-0123',
    website: 'https://spiceroute.com',
    hours: 'Tue-Sun 5pm-10pm'
  },
  {
    name: 'Le Petit Bistro',
    cuisine: 'French',
    address: '15 Rue Street',
    rating: 4.9,
    latitude: 37.7849,
    longitude: -122.4294,
    distance_from_home: 5.8,
    price_range: '$$$$',
    phone: '(555) 890-1234',
    website: 'https://lepetitbistro.com',
    hours: 'Wed-Sun 6pm-11pm'
  },
  {
    name: 'Seaside Grill',
    cuisine: 'Seafood',
    address: '100 Ocean Dr',
    rating: 4.3,
    latitude: 37.7699,
    longitude: -122.3994,
    distance_from_home: 6.2,
    price_range: '$$$',
    phone: '(555) 901-2345',
    website: 'https://seasidegrill.com',
    hours: 'Mon-Sun 11:30am-10pm'
  },
  {
    name: 'Mountain View Cafe',
    cuisine: 'American',
    address: '500 Peak Ave',
    rating: 4.0,
    latitude: 37.7999,
    longitude: -122.4294,
    distance_from_home: 8.5,
    price_range: '$$',
    phone: '(555) 012-3456',
    website: 'https://mountainviewcafe.com',
    hours: 'Mon-Sun 7am-8pm'
  },
  {
    name: 'Tokyo Ramen',
    cuisine: 'Japanese',
    address: '77 Noodle St',
    rating: 4.4,
    latitude: 37.7749,
    longitude: -122.3994,
    distance_from_home: 1.5,
    price_range: '$',
    phone: '(555) 123-4568',
    website: 'https://tokyoramen.com',
    hours: 'Mon-Sun 11am-11pm'
  },
  {
    name: 'Mama Mia Pizza',
    cuisine: 'Italian',
    address: '22 Cheese Way',
    rating: 4.5,
    latitude: 37.7899,
    longitude: -122.4094,
    distance_from_home: 2.9,
    price_range: '$$',
    phone: '(555) 234-5679',
    website: 'https://mamamiapizza.com',
    hours: 'Mon-Sun 11am-10pm'
  },
  {
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    address: '33 Salsa Blvd',
    rating: 4.2,
    latitude: 37.7699,
    longitude: -122.4194,
    distance_from_home: 3.8,
    price_range: '$',
    phone: '(555) 345-6780',
    website: 'https://tacofiesta.com',
    hours: 'Mon-Sun 10am-9pm'
  },
  {
    name: 'Thai Orchid',
    cuisine: 'Thai',
    address: '44 Pad Thai Ln',
    rating: 4.6,
    latitude: 37.7849,
    longitude: -122.3994,
    distance_from_home: 4.1,
    price_range: '$$',
    phone: '(555) 456-7891',
    website: 'https://thaiorchid.com',
    hours: 'Tue-Sun 11am-10pm'
  },
  {
    name: 'BBQ Smokehouse',
    cuisine: 'American',
    address: '55 Rib Street',
    rating: 4.3,
    latitude: 37.7999,
    longitude: -122.4194,
    distance_from_home: 5.3,
    price_range: '$$$',
    phone: '(555) 567-8902',
    website: 'https://bbqsmokehouse.com',
    hours: 'Wed-Sun 4pm-10pm'
  },
  {
    name: 'Sushi Zen',
    cuisine: 'Japanese',
    address: '66 Fish Ave',
    rating: 4.7,
    latitude: 37.7749,
    longitude: -122.4094,
    distance_from_home: 2.4,
    price_range: '$$$$',
    phone: '(555) 678-9013',
    website: 'https://sushizen.com',
    hours: 'Tue-Sun 5pm-11pm'
  },
  {
    name: 'Pasta Palace',
    cuisine: 'Italian',
    address: '77 Noodle Blvd',
    rating: 4.1,
    latitude: 37.7899,
    longitude: -122.4294,
    distance_from_home: 3.6,
    price_range: '$$',
    phone: '(555) 789-0124',
    website: 'https://pastapalace.com',
    hours: 'Mon-Sun 12pm-10pm'
  },
  {
    name: 'Burger Joint',
    cuisine: 'American',
    address: '88 Patty Lane',
    rating: 4.4,
    latitude: 37.7699,
    longitude: -122.4094,
    distance_from_home: 1.2,
    price_range: '$',
    phone: '(555) 890-1235',
    website: 'https://burgerjoint.com',
    hours: 'Mon-Sun 11am-11pm'
  },
  {
    name: 'Curry House',
    cuisine: 'Indian',
    address: '99 Spice St',
    rating: 4.5,
    latitude: 37.7849,
    longitude: -122.4194,
    distance_from_home: 3.3,
    price_range: '$$',
    phone: '(555) 901-2346',
    website: 'https://curryhouse.com',
    hours: 'Tue-Sun 11am-10pm'
  },
  {
    name: 'Steakhouse Prime',
    cuisine: 'American',
    address: '111 Meat Ave',
    rating: 4.8,
    latitude: 37.7999,
    longitude: -122.4094,
    distance_from_home: 6.7,
    price_range: '$$$$',
    phone: '(555) 012-3457',
    website: 'https://steakhouseprime.com',
    hours: 'Thu-Sun 5pm-11pm'
  }
];

const visits = [
  { restaurantIndex: 0, date: '2026-01-12', amountSpent: 42.5, notes: 'Burger night with the crew.' },
  { restaurantIndex: 1, date: '2026-02-03', amountSpent: 88.0, notes: 'Omakase. Worth every penny.' },
  { restaurantIndex: 3, date: '2026-03-21', amountSpent: 31.75, notes: 'Tacos to go.' },
  { restaurantIndex: 2, date: '2026-04-15', amountSpent: 55.0, notes: 'Date night pasta.' },
  { restaurantIndex: 10, date: '2026-05-02', amountSpent: 28.5, notes: 'Quick ramen lunch.' }
];

const orderItems = [
  // Visit 0 - The Rusty Spoon
  { visitIndex: 0, items: [
    { item_name: 'Classic Burger', price: 16.0, quantity: 2 },
    { item_name: 'Fries', price: 5.5, quantity: 2 },
    { item_name: 'Soft Drink', price: 3.0, quantity: 2 }
  ]},
  // Visit 1 - Sakura House
  { visitIndex: 1, items: [
    { item_name: 'Omakase Tasting', price: 85.0, quantity: 1 },
    { item_name: 'Sake', price: 3.0, quantity: 1 }
  ]},
  // Visit 2 - El Fuego
  { visitIndex: 2, items: [
    { item_name: 'Taco Plate (3)', price: 12.0, quantity: 2 },
    { item_name: 'Guacamole', price: 4.5, quantity: 1 },
    { item_name: 'Mexican Coke', price: 3.25, quantity: 1 }
  ]},
  // Visit 3 - Bella Napoli
  { visitIndex: 3, items: [
    { item_name: 'Spaghetti Carbonara', price: 22.0, quantity: 2 },
    { item_name: 'Tiramisu', price: 9.0, quantity: 1 },
    { item_name: 'House Wine', price: 2.0, quantity: 2 }
  ]},
  // Visit 4 - Tokyo Ramen
  { visitIndex: 4, items: [
    { item_name: 'Tonkotsu Ramen', price: 14.5, quantity: 1 },
    { item_name: 'Gyoza (6)', price: 8.0, quantity: 1 },
    { item_name: 'Iced Tea', price: 3.0, quantity: 2 }
  ]}
];

async function seed(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Wipe and reset identity so ids are stable between seeds.
    await client.query('TRUNCATE order_items, visits, restaurants RESTART IDENTITY CASCADE');

    const restaurantIds: number[] = [];
    for (const r of restaurants) {
      const { rows } = await client.query(
        `INSERT INTO restaurants (name, cuisine, address, rating, latitude, longitude, distance_from_home, price_range, phone, website, hours)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING id`,
        [r.name, r.cuisine, r.address, r.rating, r.latitude, r.longitude, r.distance_from_home, r.price_range, r.phone, r.website, r.hours]
      );
      restaurantIds.push(rows[0].id);
    }

    const visitIds: number[] = [];
    for (const v of visits) {
      const { rows } = await client.query(
        `INSERT INTO visits ("restaurantId", date, "amountSpent", notes)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [restaurantIds[v.restaurantIndex], v.date, v.amountSpent, v.notes]
      );
      visitIds.push(rows[0].id);
    }

    // Insert order items
    let totalOrderItems = 0;
    for (const oi of orderItems) {
      const visitId = visitIds[oi.visitIndex];
      for (const item of oi.items) {
        await client.query(
          `INSERT INTO order_items ("visitId", item_name, price, quantity)
           VALUES ($1, $2, $3, $4)`,
          [visitId, item.item_name, item.price, item.quantity]
        );
        totalOrderItems++;
      }
    }

    await client.query('COMMIT');
    console.log(`Seeded ${restaurants.length} restaurants, ${visits.length} visits, and ${totalOrderItems} order items.`);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

seed()
  .then(() => pool.end())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    pool.end().finally(() => process.exit(1));
  });
