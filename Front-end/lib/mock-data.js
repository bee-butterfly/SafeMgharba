export const mockIncidents = [
  {
    id: "1",
    type: "theft",
    description: "سرقة دراجة نارية من أمام المحل",
    location: {
      lat: 33.5731,
      lng: -7.5898,
      address: "شارع محمد الخامس، الدار البيضاء",
      city: "casablanca",
    },
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "pending",
    anonymous: false,
    reporterId: "user1",
  },
  {
    id: "2",
    type: "accident",
    description: "حادث مرور بين سيارتين",
    location: {
      lat: 33.572,
      lng: -7.59,
      address: "تقاطع شارع الحسن الثاني",
      city: "casablanca",
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "inProgress",
    anonymous: true,
  },
  {
    id: "3",
    type: "fire",
    description: "حريق في محل تجاري",
    location: {
      lat: 33.574,
      lng: -7.588,
      address: "السوق المركزي",
      city: "casablanca",
    },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: "resolved",
    anonymous: false,
    reporterId: "user2",
  },
]
