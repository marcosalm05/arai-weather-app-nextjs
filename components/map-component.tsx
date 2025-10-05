"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Info, MapPin, MousePointer2 } from "lucide-react"

export function MapComponent({
  onZoneSelect,
  resetTrigger,
}: {
  onZoneSelect: (zone: [number, number][]) => void
  resetTrigger?: number
}) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [polygon, setPolygon] = useState<any>(null)
  const [points, setPoints] = useState<[number, number][]>([])
  const [markers, setMarkers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()
  const clickHandlerRef = useRef<any>(null)

  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      handleReset()
    }
  }, [resetTrigger])

  useEffect(() => {
    if (typeof window === "undefined") return

    import("leaflet").then((L) => {
      if (!mapRef.current || map) return

      const newMap = L.map(mapRef.current, {
        center: [-25.2637, -57.5759],
        zoom: 8,
        zoomControl: true,
        attributionControl: true,
      })

      const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 2,
      })

      tileLayer.addTo(newMap)

      tileLayer.on("load", () => {
        setIsLoading(false)
      })

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            newMap.setView([position.coords.latitude, position.coords.longitude], 10)
          },
          (error) => {
            console.log("[v0] Geolocation error:", error)
          },
        )
      }

      setMap(newMap)
      setIsLoading(false)
    })

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (!map) return

    import("leaflet").then((L) => {
      if (clickHandlerRef.current) {
        map.off("click", clickHandlerRef.current)
      }

      const handleClick = (e: any) => {
        if (points.length < 4) {
          const newPoints = [...points, [e.latlng.lat, e.latlng.lng] as [number, number]]
          setPoints(newPoints)

          const marker = L.marker([e.latlng.lat, e.latlng.lng], {
            icon: L.divIcon({
              className: "custom-marker",
              html: `<div style="background: oklch(0.60 0.20 240); color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${newPoints.length}</div>`,
              iconSize: [28, 28],
              iconAnchor: [14, 14],
            }),
          }).addTo(map)

          setMarkers((prev) => [...prev, marker])

          if (newPoints.length === 4) {
            if (polygon) {
              map.removeLayer(polygon)
              setPolygon(null)
            }
            const newPolygon = L.polygon(newPoints, {
              color: "oklch(0.60 0.20 240)",
              fillColor: "oklch(0.60 0.20 240)",
              fillOpacity: 0.25,
              weight: 3,
            }).addTo(map)
            setPolygon(newPolygon)

            map.fitBounds(newPolygon.getBounds(), { padding: [50, 50] })

            onZoneSelect(newPoints)
          }
        }
      }

      clickHandlerRef.current = handleClick
      map.on("click", handleClick)

      return () => {
        if (clickHandlerRef.current) {
          map.off("click", clickHandlerRef.current)
        }
      }
    })
  }, [map, points, polygon, onZoneSelect])

  const handleReset = () => {
    if (map) {
      markers.forEach((marker) => {
        if (map.hasLayer(marker)) {
          map.removeLayer(marker)
        }
      })
      if (polygon && map.hasLayer(polygon)) {
        map.removeLayer(polygon)
      }
      setMarkers([])
      setPoints([])
      setPolygon(null)
      onZoneSelect([])
    }
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-[1300] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">{t("loadingMap")}</p>
          </div>
        </div>
      )}

      {points.length === 0 && !isLoading && (
        <div className="absolute top-4 right-4 z-[900] pointer-events-none max-w-sm">
          <div className="bg-card/95 backdrop-blur-sm border-2 border-primary/50 rounded-lg p-6 shadow-2xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <MousePointer2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t("instructionTitle")}</h3>
                <p className="text-sm text-muted-foreground">{t("instructionDescription")}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                  1
                </div>
                <span className="text-muted-foreground">{t("step1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                  2
                </div>
                <span className="text-muted-foreground">{t("step2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                  3
                </div>
                <span className="text-muted-foreground">{t("step3")}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full rounded-lg" />

      {points.length > 0 && (
        <div className="absolute top-4 right-4 z-[950] bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg min-w-[200px]">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{t("zoneSelection")}</span>
          </div>
          <div className="space-y-2 mb-3">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    points.length >= num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {num}
                </div>
                <span className={`text-sm ${points.length >= num ? "text-foreground" : "text-muted-foreground"}`}>
                  {t(`point${num}`)}
                </span>
              </div>
            ))}
          </div>
          {points.length === 4 && (
            <div className="mb-3 p-2 bg-primary/10 border border-primary/20 rounded text-xs text-primary flex items-center gap-2">
              <Info className="w-3 h-3" />
              <span>{t("zoneComplete")}</span>
            </div>
          )}
          <Button size="sm" variant="outline" onClick={handleReset} className="w-full bg-transparent">
            {t("reset")}
          </Button>
        </div>
      )}
    </div>
  )
}
