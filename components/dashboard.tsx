"use client"

import { useState } from "react"
import { MapComponent } from "./map-component"
import { DateRangePicker } from "./date-range-picker"
import { PredictionCards } from "./prediction-cards"
import { MeteorologicalConditions } from "./meteorological-conditions"
import { HeatmapModal } from "./heatmap-modal"
import { LanguageToggle } from "./language-toggle"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Download, Calendar, MapPin, Sparkles, Thermometer, Droplets, Info } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { generateMockData } from "@/lib/mock-data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export function Dashboard() {
  const { t } = useLanguage()
  const [selectedZone, setSelectedZone] = useState<[number, number][] | null>(null)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null)
  const [showData, setShowData] = useState(false)
  const [weatherData, setWeatherData] = useState<any>(null)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(0)

  const handleGetPrediction = () => {
    if (selectedZone && dateRange) {
      const data = generateMockData(selectedZone, dateRange)
      setWeatherData(data)
      setShowData(true)
    }
  }

  const handleReset = () => {
    setSelectedZone(null)
    setDateRange(null)
    setShowData(false)
    setWeatherData(null)
    setResetTrigger((prev) => prev + 1)
  }

  const handleExport = (format: "csv" | "json") => {
    if (!weatherData) return

    const dataStr = format === "json" ? JSON.stringify(weatherData, null, 2) : convertToCSV(weatherData)

    const blob = new Blob([dataStr], { type: format === "json" ? "application/json" : "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `arai-weather-data.${format}`
    link.click()
  }

  const convertToCSV = (data: any) => {
    const headers = ["Date", "Temperature (°C)", "Precipitation (mm)", "Wind Speed (km/h)", "Humidity (%)"]
    const rows = data.temperature.map((temp: any, i: number) => [
      temp.date,
      temp.value,
      data.precipitation[i]?.value || 0,
      data.conditions.windSpeed,
      data.conditions.humidity,
    ])
    return [headers, ...rows].map((row) => row.join(",")).join("\n")
  }

  const canGetPrediction = selectedZone && selectedZone.length === 4 && dateRange

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{t("title")}</h1>
              <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{t("selectZone")}</span>
                </div>
                <DateRangePicker value={dateRange} onChange={setDateRange} />

                {canGetPrediction && !showData && (
                  <Button onClick={handleGetPrediction} className="gap-2 bg-primary hover:bg-primary/90">
                    <Sparkles className="w-4 h-4" />
                    {t("getPrediction")}
                  </Button>
                )}

                {showData && (
                  <>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      {t("reset")}
                    </Button>
                    <div className="ml-auto flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowHeatmap(true)}>
                        {t("viewHeatmap")}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                        <Download className="w-4 h-4 mr-2" />
                        CSV
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExport("json")}>
                        <Download className="w-4 h-4 mr-2" />
                        JSON
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
            <Card className="flex-1 overflow-hidden">
              <MapComponent onZoneSelect={setSelectedZone} resetTrigger={resetTrigger} />
            </Card>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto">
            {showData && weatherData ? (
              <>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t("predictionFor")}</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {dateRange?.from.toLocaleDateString()} - {dateRange?.to.toLocaleDateString()}
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">{t("temperature")}</h3>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("temperatureInfo")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t("average")}</p>
                      <p className="text-2xl font-bold text-foreground">
                        {(
                          weatherData.temperature.reduce((sum: number, d: any) => sum + d.value, 0) /
                          weatherData.temperature.length
                        ).toFixed(1)}
                        °C
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t("maximum")}</p>
                      <p className="text-2xl font-bold text-red-500">
                        {Math.max(...weatherData.temperature.map((d: any) => d.value)).toFixed(1)}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t("minimum")}</p>
                      <p className="text-2xl font-bold text-cyan-400">
                        {Math.min(...weatherData.temperature.map((d: any) => d.value)).toFixed(1)}°C
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">{t("precipitation")}</h3>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("precipitationInfo")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t("totalExpected")}</p>
                    <p className="text-3xl font-bold text-primary">
                      {weatherData.precipitation.reduce((sum: number, d: any) => sum + d.value, 0).toFixed(1)} mm
                    </p>
                  </div>
                </Card>

                <PredictionCards predictions={weatherData.predictions} />
                <MeteorologicalConditions conditions={weatherData.conditions} />
              </>
            ) : (
              <Card className="p-8 flex flex-col items-center justify-center text-center h-full">
                <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{t("noDataTitle")}</h3>
                <p className="text-sm text-muted-foreground max-w-sm">{t("noDataDescription")}</p>
                {canGetPrediction && (
                  <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm text-primary font-medium mb-3">{t("clickGetPrediction")}</p>
                    <Button onClick={handleGetPrediction} className="gap-2">
                      <Sparkles className="w-4 h-4" />
                      {t("getPrediction")}
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>

      {showHeatmap && weatherData && (
        <HeatmapModal zone={selectedZone!} data={weatherData} onClose={() => setShowHeatmap(false)} />
      )}
    </div>
  )
}
