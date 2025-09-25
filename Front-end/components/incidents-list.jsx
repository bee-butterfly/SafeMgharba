"use client"

import { useState } from "react"
import { MapPin, Clock, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
export function IncidentsList({ incidents = [] }) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

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

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || incident.type === filterType
    const matchesStatus = filterStatus === "all" || incident.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            {t("incidents")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الأحداث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="نوع الحدث" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="theft">{t("theft")}</SelectItem>
                <SelectItem value="accident">{t("accident")}</SelectItem>
                <SelectItem value="riot">{t("riot")}</SelectItem>
                <SelectItem value="fire">{t("fire")}</SelectItem>
                <SelectItem value="medical">{t("medical")}</SelectItem>
                <SelectItem value="other">{t("other")}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">{t("pending")}</SelectItem>
                <SelectItem value="inProgress">{t("inProgress")}</SelectItem>
                <SelectItem value="resolved">{t("resolved")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Incidents List */}
          <div className="space-y-4">
            {filteredIncidents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">لا توجد أحداث تطابق البحث</div>
            ) : (
              filteredIncidents.map((incident) => (
                <Card key={incident.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="text-3xl">{getIncidentIcon(incident.type)}</div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{t(incident.type)}</h3>
                          <span
                            className={`px-3 py-1 text-sm rounded-full font-medium ${
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

                        <p className="text-gray-700 mb-3">{incident.description}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{incident.location.address}</span>
                          </div>

                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{getTimeAgo(incident.timestamp)}</span>
                          </div>
                        </div>

                        {incident.anonymous && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              🔒 تبليغ مجهول
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
