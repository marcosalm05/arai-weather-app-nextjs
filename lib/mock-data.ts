export function generateMockData(zone: [number, number][], dateRange: { from: Date; to: Date }) {
  const days = Math.max(1, Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1)

  // Generate temperature data
  const temperature = Array.from({ length: Math.min(days, 30) }, (_, i) => {
    const date = new Date(dateRange.from)
    date.setDate(date.getDate() + i)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(20 + Math.random() * 15 + Math.sin(i / 3) * 5),
    }
  })

  // Generate precipitation data
  const precipitation = Array.from({ length: Math.min(days, 30) }, (_, i) => {
    const date = new Date(dateRange.from)
    date.setDate(date.getDate() + i)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(Math.random() * 80 + Math.sin(i / 2) * 20),
    }
  })

  // Generate predictions
  const predictions = [
    {
      type: "heat",
      name: "extremeHeat",
      probability: Math.round(60 + Math.random() * 20),
      severity: "high",
    },
    {
      type: "rain",
      name: "intenseRain",
      probability: Math.round(40 + Math.random() * 20),
      severity: "medium",
    },
    {
      type: "wind",
      name: "strongWind",
      probability: Math.round(15 + Math.random() * 15),
      severity: "low",
    },
  ]

  // Generate conditions
  const conditions = {
    windSpeed: Math.round(8 + Math.random() * 10),
    humidity: Math.round(55 + Math.random() * 20),
    pressure: Math.round(1010 + Math.random() * 10),
    airQuality: ["good", "moderate", "good"][Math.floor(Math.random() * 3)],
  }

  return {
    temperature,
    precipitation,
    predictions,
    conditions,
  }
}
