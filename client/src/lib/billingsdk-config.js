export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    credits: 100,
    features: [
      "100 text generations",
      "50 image generations",
      "Standard support",
      "Access to basic models"
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    credits: 500,
    features: [
      "500 text generations",
      "200 image generations",
      "Priority support",
      "Access to pro models",
      "Faster response time"
    ],
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    credits: 1000,
    features: [
      "1000 text generations",
      "500 image generations",
      "24/7 VIP support",
      "Access to premium models",
      "Dedicated account manager"
    ],
    popular: false,
  },
];