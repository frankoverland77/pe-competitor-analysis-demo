# Technical Context

## Integration with Existing System
```
Current System:
- Gravitate Pricing Engine (main product)
- Quote Book (primary interface where pricing happens)
- This feature is a separate research tool
- Users will navigate here from main nav

Tech Stack to Match:
- React
- Similar to existing Pricing Engine
- Green color scheme (#10B981)
- Professional, dense data presentation
```

## Data Structure Example
```javascript
// Competitor data structure
{
  competitor: "Marathon",
  location: "Des Moines",
  product: "#2 ULSD",
  strategy: "Fast Follower",
  spotDelta: 0.031,
  captureRate: 83.9,
  predictability: 91,
  upMovementCapture: 83.9,
  downMovementCapture: 153.1,
  lagDays: 1
}
```

## Key Calculations
- **Capture Rate**: (Competitor Price Change / Spot Market Change) × 100%
- **Predictability**: R² value from regression analysis
- **Tomorrow's Prediction**: Today's Spot Move × Historical Capture Rate