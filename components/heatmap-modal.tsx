"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function HeatmapModal({ zone, data, onClose }: { zone: [number, number][]; data: any; onClose: () => void }) {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1200] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">{t("heatmapTitle")}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{t("temperatureHeatmap")}</h3>
              <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
                <img
                  src="/temperature-heatmap-visualization-with-red-and-ora.jpg"
                  alt="Temperature Heatmap"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{t("precipitationHeatmap")}</h3>
              <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
                <img
                  src="/precipitation-heatmap-visualization-with-blue-grad.jpg"
                  alt="Precipitation Heatmap"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{t("windHeatmap")}</h3>
              <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
                <img
                  src="/wind-speed-heatmap-visualization-with-green-to-yel.jpg"
                  alt="Wind Heatmap"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>{t("close")}</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
