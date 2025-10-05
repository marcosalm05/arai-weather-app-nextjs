"use client"

import { Button } from "./ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "es" : "en")} className="gap-2">
      <Languages className="w-4 h-4" />
      {language === "en" ? "ES" : "EN"}
    </Button>
  )
}
