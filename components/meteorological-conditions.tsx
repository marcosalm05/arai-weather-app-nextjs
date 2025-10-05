"use client"

import { Card } from "./ui/card"
import { Wind, Droplets, Gauge, Leaf, Info } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"

export function MeteorologicalConditions({ conditions }: { conditions: any }) {
  const { t } = useLanguage()

  const getAirQualityColor = (quality: string) => {
    switch (quality) {
      case "good":
        return "text-success bg-success/10"
      case "moderate":
        return "text-warning bg-warning/10"
      case "poor":
        return "text-destructive bg-destructive/10"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t("conditions")}</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{t("windSpeed")}</span>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="w-3 h-3 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <p className="text-sm text-foreground">{t("windSpeedInfo")}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <span className="font-semibold text-foreground">{conditions.windSpeed} km/h</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{t("humidity")}</span>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="w-3 h-3 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <p className="text-sm text-foreground">{t("humidityInfo")}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <span className="font-semibold text-foreground">{conditions.humidity}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{t("pressure")}</span>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="w-3 h-3 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <p className="text-sm text-foreground">{t("pressureInfo")}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <span className="font-semibold text-foreground">{conditions.pressure} hPa</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{t("airQuality")}</span>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="w-3 h-3 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <p className="text-sm text-foreground">{t("airQualityInfo")}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAirQualityColor(conditions.airQuality)}`}>
            {t(conditions.airQuality)}
          </span>
        </div>
      </div>
    </Card>
  )
}
