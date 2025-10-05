"use client"

import { create } from "zustand"

type Language = "en" | "es"

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
}

const useLanguageStore = create<LanguageStore>((set) => ({
  language: "en",
  setLanguage: (lang) => set({ language: lang }),
}))

const translations = {
  en: {
    title: "Arai Project",
    subtitle: "Interactive meteorological predictions using NASA Earth observation data",
    selectZone: "Select a zone on the map (4 points)",
    selectDates: "Select date range",
    predictionFor: "Prediction for",
    temperature: "Temperature",
    precipitation: "Precipitation",
    predictions: "Predictions",
    conditions: "Meteorological Conditions",
    average: "Average",
    maximum: "Maximum",
    minimum: "Minimum",
    totalExpected: "Total Expected",
    windSpeed: "Wind Speed",
    humidity: "Humidity",
    pressure: "Atmospheric Pressure",
    airQuality: "Air Quality",
    viewHeatmap: "View Heatmaps",
    heatmapTitle: "Weather Heatmaps",
    temperatureHeatmap: "Temperature Distribution",
    precipitationHeatmap: "Precipitation Distribution",
    windHeatmap: "Wind Speed Distribution",
    close: "Close",
    pointsSelected: "Points selected",
    reset: "Reset",
    noDataTitle: "No data to display",
    noDataDescription: "Select a zone on the map and a date range to view weather predictions",
    extremeHeat: "Extreme Heat",
    intenseRain: "Intense Rain",
    strongWind: "Strong Wind",
    high: "High",
    medium: "Medium",
    low: "Low",
    good: "Good",
    moderate: "Moderate",
    poor: "Poor",
    zoneSelection: "Zone Selection",
    point1: "Point 1",
    point2: "Point 2",
    point3: "Point 3",
    point4: "Point 4",
    zoneComplete: "Zone complete! Now select a date range.",
    getPrediction: "Get Prediction",
    clickGetPrediction: "Click 'Get Prediction' to view the weather forecast",
    instructionTitle: "How to use",
    instructionDescription: "Click on the map to select 4 points that define your area of interest",
    step1: "Click 4 points on the map",
    step2: "Select a date range",
    step3: "Click 'Get Prediction'",
    loadingMap: "Loading map...",
    temperatureInfo:
      "T2M (Temperature at 2 meters): Surface air temperature measured at 2 meters above ground level. This is the standard height for meteorological temperature measurements.",
    precipitationInfo:
      "Total precipitation expected during the selected period, measured in millimeters. Includes rain, snow, and other forms of precipitation.",
    windSpeedInfo:
      "Average wind speed at 10 meters above ground level, measured in kilometers per hour. Important for outdoor activities and safety.",
    humidityInfo:
      "Relative humidity percentage. High humidity can make temperatures feel warmer and affect comfort levels.",
    pressureInfo:
      "Atmospheric pressure measured in hectopascals (hPa). Changes in pressure can indicate weather pattern shifts.",
    airQualityInfo:
      "Air quality index based on particulate matter and pollutants. Good quality is safe for all activities, moderate may affect sensitive individuals.",
  },
  es: {
    title: "Proyecto Arai",
    subtitle: "Predicciones meteorológicas interactivas usando datos de observación terrestre de la NASA",
    selectZone: "Selecciona una zona en el mapa (4 puntos)",
    selectDates: "Seleccionar rango de fechas",
    predictionFor: "Predicción para",
    temperature: "Temperatura",
    precipitation: "Precipitación",
    predictions: "Predicciones",
    conditions: "Condiciones Meteorológicas",
    average: "Promedio",
    maximum: "Máximo",
    minimum: "Mínimo",
    totalExpected: "Total Esperado",
    windSpeed: "Velocidad del Viento",
    humidity: "Humedad",
    pressure: "Presión Atmosférica",
    airQuality: "Calidad del Aire",
    viewHeatmap: "Ver Mapas de Calor",
    heatmapTitle: "Mapas de Calor Meteorológicos",
    temperatureHeatmap: "Distribución de Temperatura",
    precipitationHeatmap: "Distribución de Precipitación",
    windHeatmap: "Distribución de Velocidad del Viento",
    close: "Cerrar",
    pointsSelected: "Puntos seleccionados",
    reset: "Reiniciar",
    noDataTitle: "No hay datos para mostrar",
    noDataDescription: "Selecciona una zona en el mapa y un rango de fechas para ver las predicciones meteorológicas",
    extremeHeat: "Calor Extremo",
    intenseRain: "Lluvia Intensa",
    strongWind: "Viento Fuerte",
    high: "Alto",
    medium: "Medio",
    low: "Bajo",
    good: "Buena",
    moderate: "Moderada",
    poor: "Mala",
    zoneSelection: "Selección de Zona",
    point1: "Punto 1",
    point2: "Punto 2",
    point3: "Punto 3",
    point4: "Punto 4",
    zoneComplete: "¡Zona completa! Ahora selecciona un rango de fechas.",
    getPrediction: "Obtener Predicción",
    clickGetPrediction: "Haz clic en 'Obtener Predicción' para ver el pronóstico del tiempo",
    instructionTitle: "Cómo usar",
    instructionDescription: "Haz clic en el mapa para seleccionar 4 puntos que definan tu área de interés",
    step1: "Haz clic en 4 puntos del mapa",
    step2: "Selecciona un rango de fechas",
    step3: "Haz clic en 'Obtener Predicción'",
    loadingMap: "Cargando mapa...",
    temperatureInfo:
      "T2M (Temperatura a 2 metros): Temperatura del aire superficial medida a 2 metros sobre el nivel del suelo. Esta es la altura estándar para mediciones meteorológicas de temperatura.",
    precipitationInfo:
      "Precipitación total esperada durante el período seleccionado, medida en milímetros. Incluye lluvia, nieve y otras formas de precipitación.",
    windSpeedInfo:
      "Velocidad promedio del viento a 10 metros sobre el nivel del suelo, medida en kilómetros por hora. Importante para actividades al aire libre y seguridad.",
    humidityInfo:
      "Porcentaje de humedad relativa. La alta humedad puede hacer que las temperaturas se sientan más cálidas y afectar los niveles de comodidad.",
    pressureInfo:
      "Presión atmosférica medida en hectopascales (hPa). Los cambios en la presión pueden indicar cambios en los patrones climáticos.",
    airQualityInfo:
      "Índice de calidad del aire basado en material particulado y contaminantes. La buena calidad es segura para todas las actividades, la moderada puede afectar a individuos sensibles.",
  },
}

export function useLanguage() {
  const { language, setLanguage } = useLanguageStore()

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return { language, setLanguage, t }
}
