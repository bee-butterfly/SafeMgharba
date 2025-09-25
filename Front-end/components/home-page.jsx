"use client"

import { AlertTriangle, MapPin, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
export function HomePage({ onPageChange, incidents = [] }) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const recentIncidents = incidents.slice(0, 3)

  const getIncidentIcon = (type) => {
    switch (type) {
      case "theft":
        return "🚨"
      case "accident":
        return "🚗"
      case "riot":
        return "⚠️"
      case "fire":
        return "🔥"
      case "medical":
        return "🏥"
      default:
        return "📢"
    }
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return t("now")
    if (diffInMinutes < 60) return t("minutesAgo", { minutes: diffInMinutes })
    if (diffInMinutes < 1440) return t("hoursAgo", { hours: Math.floor(diffInMinutes / 60) })
    return t("daysAgo", { days: Math.floor(diffInMinutes / 1440) })
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("welcomeTitle")}</h1>
        <p className="text-gray-600 mb-6">{t("welcomeSubtitle")}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => onPageChange("report")} className="bg-red-600 hover:bg-red-700">
            <AlertTriangle className="mr-2 h-5 w-5" />
            {t("quickReport")}
          </Button>
          <Button size="lg" variant="outline" onClick={() => onPageChange("incidents")}>
            <MapPin className="mr-2 h-5 w-5" />
            {t("viewIncidents")}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-gray-600">خدمة متواصلة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {incidents.filter((i) => i.status === "resolved").length}
            </div>
            <div className="text-sm text-gray-600">تم الحل</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {incidents.filter((i) => i.status === "inProgress").length}
            </div>
            <div className="text-sm text-gray-600">قيد المعالجة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {incidents.filter((i) => i.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">قيد المراجعة</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            {t("nearbyIncidents")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{getIncidentIcon(incident.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{t(incident.type)}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        incident.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : incident.status === "inProgress"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {t(incident.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="mr-3">{incident.location.address}</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{getTimeAgo(incident.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={() => onPageChange("incidents")}>
            عرض جميع الأحداث
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <h3 className="font-bold text-red-900">حالة طوارئ؟</h3>
              <p className="text-sm text-red-700">اتصل بالرقم 19 للشرطة أو 15 للإسعاف</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
