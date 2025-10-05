"use client"

import { Card } from "./ui/card"
import { AlertTriangle, CloudRain, Wind } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function PredictionCards({ predictions }: { predictions: any[] }) {
  const { t } = useLanguage()

  const getIcon = (type: string) => {
    switch (type) {
      case "heat":
        return <AlertTriangle className="w-5 h-5" />
      case "rain":
        return <CloudRain className="w-5 h-5" />
      case "wind":
        return <Wind className="w-5 h-5" />
      default:
        return null
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-warning"
      case "low":
        return "text-success"
      default:
        return "text-muted-foreground"
    }
  }

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10"
      case "medium":
        return "bg-warning/10"
      case "low":
        return "bg-success/10"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t("predictions")}</h3>
      <div className="space-y-3">
        {predictions.map((pred, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className={`${getSeverityColor(pred.severity)}`}>{getIcon(pred.type)}</div>
              <div>
                <p className="font-medium text-foreground">{t(pred.name)}</p>
                <p className="text-xs text-muted-foreground">{pred.probability}%</p>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(pred.severity)} ${getSeverityBg(pred.severity)}`}
            >
              {t(pred.severity)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
