# Write-up

## 1. What did you build for Part B, and why that?

I built a complete visit tracking system with order item tracking and spending analytics. The app's core purpose is "tracking what Brennen spends eating out," but the existing implementation only listed restaurants with no way to record visits or spending. I chose this because it directly addresses the app's stated purpose - without visit tracking, the app doesn't actually fulfill its function. The addition of order items provides detailed spending insights (what was ordered, not just how much), and the analytics dashboard gives Brennen visibility into his dining patterns over time.

## 2. What did you decide, and what did you rule out?

I decided to build RESTful API endpoints for visits and order items following the same patterns as the existing restaurant endpoints. I added two new migrations (002 for expanded restaurant data, 003 for order items) rather than editing 001. I chose CSS-only cloud animations for the UI theme to keep dependencies minimal. I ruled out map integration (even though I added lat/long data) to keep scope manageable. I also ruled out user authentication since this is a personal single-user app. A tradeoff I'm unsure about: I made order items optional in the UI (visits can exist without items), which adds flexibility but might lead to incomplete data.

## 3. Where did you cut corners?

The visit creation form is not yet implemented - users can only view visits, not create them through the UI (though the API supports it). The restaurant detail page shows "Visit History: Coming soon" instead of the actual visit history. I didn't implement the favorite restaurants feature mentioned in the plan. The analytics dashboard uses simple text displays instead of visual charts. With another day, I'd prioritize the visit creation form and connecting restaurant detail pages to their actual visit history.

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
