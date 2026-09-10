# Write-up

## 1. What did you build for Part B, and why that?

I built a complete visit-tracking system that records orders and analyzes spending. The app was designed to track how much Brennen spends eating out, but it previously only displayed a list of restaurants without any way to log visits or expenses. I chose to add this feature because it directly supports the app’s main purpose. Users can now record what they ordered, see how much they spent, and use the analytics dashboard to better understand their dining habits over time.

## 2. What did you decide, and what did you rule out?

I built RESTful API endpoints for visits and order items using the same structure as the existing restaurant endpoints. I added two new migrations—one for expanded restaurant data and another for order items—instead of modifying the original migration. For the UI, I used CSS-only cloud animations to keep dependencies minimal. I decided not to include map integration, even though I added latitude and longitude data, so I could keep the project’s scope manageable. I also left out user authentication because the app is intended for a single user. One tradeoff I am still considering is making order items optional: it gives users more flexibility when logging visits, but it could also result in incomplete spending data.

## 3. Where did you cut corners?

The visit creation form is not finished yet, so users can view visits but cannot add new ones through the UI, even though the API already supports it. The restaurant detail page also displays “Visit History: Coming soon” instead of showing actual visit data. I did not have time to implement the planned favorite restaurants feature, and the analytics dashboard currently presents data as text rather than visual charts. With another day, I would prioritize building the visit creation form and connecting each restaurant’s detail page to its visit history.

---

## Part B: routes

| Method and path | What it does | Success | Errors |
| --------------- | ------------ | ------- | ------------ |
| `GET /api/visits` | List all visits (optional date range filter) | `200` + array | `400` on invalid date format |
| `POST /api/visits` | Create a new visit | `201` + visit object | `400` on invalid input |
| `GET /api/visits/:id` | Get single visit | `200` + visit object | `404` if not found or invalid id |
| `PUT /api/visits/:id` | Update a visit | `200` + visit object | `404` if not found, `400` on invalid input |
| `DELETE /api/visits/:id` | Delete a visit | `204` (no body) | `404` if not found or invalid id |
| `GET /api/visits/:id/items` | Get order items for a visit | `200` + array | `404` if visit not found |
| `POST /api/visits/:id/items` | Add order item to visit | `201` + item object | `404` if visit not found, `400` on invalid input |
| `PUT /api/order-items/:id` | Update an order item | `200` + item object | `404` if not found, `400` on invalid input |
| `DELETE /api/order-items/:id` | Delete an order item | `204` (no body) | `404` if not found or invalid id |
| `GET /api/stats/spending` | Overall spending statistics | `200` + stats object | - |
| `GET /api/stats/spending/monthly` | Monthly spending breakdown | `200` + array | - |
| `GET /api/stats/spending/by-restaurant` | Spending by restaurant | `200` + array | - |
| `GET /api/stats/spending/by-cuisine` | Spending by cuisine type | `200` + array | - |

**`POST /api/visits`**

```jsonc
// request
{
  "restaurantId": 1,
  "date": "2026-01-15",
  "amountSpent": 45.50,
  "notes": "Lunch with friends"
}

// 201 response
{
  "id": 6,
  "restaurantId": 1,
  "date": "2026-01-15",
  "amountSpent": 45.50,
  "notes": "Lunch with friends",
  "createdAt": "2026-01-15T12:00:00.000Z"
}
```

**`POST /api/visits/:id/items`**

```jsonc
// request
{
  "itemName": "Burger",
  "price": 15.00,
  "quantity": 2
}

// 201 response
{
  "id": 15,
  "visitId": 6,
  "itemName": "Burger",
  "price": 15.00,
  "quantity": 2,
  "createdAt": "2026-01-15T12:00:00.000Z"
}
```

## Schema changes

- `002_expand_restaurants.sql`: Added nullable columns to restaurants table: latitude, longitude, distance_from_home, price_range, phone, website, hours
- `003_order_items.sql`: Created new order_items table with id, visitId (FK), item_name, price, quantity, created_at
- Updated seed data to 20 restaurants with detailed information, 5 visits, and 14 order items

## How I verified this

**Part A** - the contract table in CHALLENGE.md, every row including the error cases:

```bash
curl -i http://localhost:3000/api/restaurants          # 200 + array
curl -i http://localhost:3000/api/restaurants/99999    # 404
curl -i http://localhost:3000/api/restaurants/abc      # 404
curl -i -X POST http://localhost:3000/api/restaurants \
  -H 'Content-Type: application/json' \
  -d '{"name":"Out Of Range","rating":6}'              # 400
```

**Part B** - the equivalent cases for what I built:

```bash
# Visit endpoints - happy paths
curl http://localhost:3000/api/visits
curl -X POST http://localhost:3000/api/visits \
  -H 'Content-Type: application/json' \
  -d '{"restaurantId":1,"date":"2026-01-15","amountSpent":50}'
curl http://localhost:3000/api/visits/1

# Visit endpoints - error cases
curl -i -X POST http://localhost:3000/api/visits \
  -H 'Content-Type: application/json' \
  -d '{"restaurantId":1,"date":"invalid-date","amountSpent":50}'  # 400
curl -i -X POST http://localhost:3000/api/visits \
  -H 'Content-Type: application/json' \
  -d '{"restaurantId":1,"date":"2026-01-15","amountSpent":-10}'  # 400
curl -i -X POST http://localhost:3000/api/visits \
  -H 'Content-Type: application/json' \
  -d '{"restaurantId":99999,"date":"2026-01-15","amountSpent":50}'  # 404
curl -i http://localhost:3000/api/visits/99999  # 404
curl -i http://localhost:3000/api/visits/abc  # 404
curl -i -X DELETE http://localhost:3000/api/visits/99999  # 404

# Order item endpoints - happy paths
curl http://localhost:3000/api/visits/1/items
curl -X POST http://localhost:3000/api/visits/1/items \
  -H 'Content-Type: application/json' \
  -d '{"itemName":"Test","price":10,"quantity":1}'

# Order item endpoints - error cases
curl -i -X POST http://localhost:3000/api/visits/99999/items \
  -H 'Content-Type: application/json' \
  -d '{"itemName":"Test","price":10,"quantity":1}'  # 404
curl -i -X POST http://localhost:3000/api/visits/abc/items \
  -H 'Content-Type: application/json' \
  -d '{"itemName":"Test","price":10,"quantity":1}'  # 404
curl -i -X POST http://localhost:3000/api/visits/1/items \
  -H 'Content-Type: application/json' \
  -d '{"itemName":"","price":10,"quantity":1}'  # 400
curl -i -X POST http://localhost:3000/api/visits/1/items \
  -H 'Content-Type: application/json' \
  -d '{"itemName":"Test","price":-10,"quantity":1}'  # 400

# Analytics endpoints
curl http://localhost:3000/api/stats/spending
curl http://localhost:3000/api/stats/spending/monthly
curl http://localhost:3000/api/stats/spending/by-restaurant
curl http://localhost:3000/api/stats/spending/by-cuisine
```

## Known issues / what I'd do next

- Visit creation form not implemented in UI (API exists)
- Restaurant detail page doesn't show actual visit history (placeholder text)
- No favorite restaurants feature (planned but not implemented)
- Analytics dashboard uses text instead of visual charts
- No edit forms for visits or order items in the UI
- Cloud animations may need performance optimization on mobile devices
