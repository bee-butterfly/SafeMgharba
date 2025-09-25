"use client"

import { useState } from "react"
import { MapPin, Send, X, Upload, CreditCard, MapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function ReportForm({ onSubmit, onCancel }) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const [formData, setFormData] = useState({
    type: "theft",
    description: "",
    anonymous: false,
  })

  const [locationDetected, setLocationDetected] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const [idScanned, setIdScanned] = useState(false)
  const [idData, setIdData] = useState(null)
  const [uploadedIdImage, setUploadedIdImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const incidentTypes = [
    { value: "theft", label: t("theft"), icon: "🚨" },
    { value: "accident", label: t("accident"), icon: "🚗" },
    { value: "riot", label: t("riot"), icon: "⚠️" },
    { value: "fire", label: t("fire"), icon: "🔥" },
    { value: "medical", label: t("medical"), icon: "🏥" },
    { value: "other", label: t("other"), icon: "📢" },
  ]

  const moroccanCities = [
    { value: "casablanca", label: "الدار البيضاء - Casablanca" },
    { value: "rabat", label: "الرباط - Rabat" },
    { value: "fes", label: "فاس - Fès" },
    { value: "marrakech", label: "مراكش - Marrakech" },
    { value: "agadir", label: "أكادير - Agadir" },
    { value: "tangier", label: "طنجة - Tanger" },
    { value: "meknes", label: "مكناس - Meknès" },
    { value: "oujda", label: "وجدة - Oujda" },
    { value: "kenitra", label: "القنيطرة - Kénitra" },
    { value: "tetouan", label: "تطوان - Tétouan" },
    { value: "safi", label: "آسفي - Safi" },
    { value: "mohammedia", label: "المحمدية - Mohammedia" },
    { value: "khouribga", label: "خريبكة - Khouribga" },
    { value: "beni_mellal", label: "بني ملال - Béni Mellal" },
    { value: "el_jadida", label: "الجديدة - El Jadida" },
  ]

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: "الموقع الحالي",
            },
          }))
          setLocationDetected(true)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadedIdImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        // Simulate ID processing
        setTimeout(() => {
          setIdData({
            name: "أحمد محمد الحسني",
            idNumber: "AB123456",
            city: "الدار البيضاء",
            verified: true,
          })
          setIdScanned(true)
          setSelectedCity("casablanca")
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      city: selectedCity,
      idVerified: idScanned,
      idData: idData,
      idImage: uploadedIdImage,
    }
    onSubmit(submitData)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t("reportIncident")}
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Incident Type */}
            <div className="space-y-2">
              <Label htmlFor="type">{t("incidentType")}</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                placeholder="اكتب وصفاً مختصراً للحدث..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                required
                rows={4}
              />
            </div>

            
            {/* City Selection */}
            <div className="space-y-2">
              <Label htmlFor="city">المدينة</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {moroccanCities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <MapIcon className="h-4 w-4" />
                        <span>{city.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!selectedCity && (
                <p className="text-sm text-orange-600">يرجى اختيار المدينة للمساعدة في توجيه التبليغ للسلطات المحلية</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>{t("location")}</Label>
              <div className="flex space-x-2 space-x-reverse">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLocationDetect}
                  className="flex-1 bg-transparent"
                  disabled={locationDetected}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {locationDetected ? t("locationDetected") : "تحديد الموقع الحالي"}
                </Button>
              </div>
              {locationDetected && (
                <div className="text-sm text-green-600 bg-green-50 p-2 rounded">✓ تم تحديد موقعك بنجاح</div>
              )}
            </div>

            {/* ID Verification */}
            <div className="space-y-2">
              <Label>التحقق من الهوية (اختياري)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {!idScanned ? (
                  <div className="text-center">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">ارفع صورة بطاقة الهوية الوطنية لتسريع معالجة التبليغ</p>

                    {!imagePreview ? (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="id-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("id-upload").click()}
                          className="bg-transparent"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          رفع صورة بطاقة الهوية
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative inline-block">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="ID Preview"
                            className="max-w-full h-32 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setImagePreview(null)
                              setUploadedIdImage(null)
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600 rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-center space-x-2 space-x-reverse">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-blue-600">جاري معالجة الصورة...</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <CreditCard className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-green-900">تم التحقق من الهوية ✓</h4>
                        <p className="text-sm text-green-700">
                          {idData?.name} - {idData?.idNumber}
                        </p>
                        <p className="text-xs text-green-600">هذا سيساعد في تسريع معالجة تبليغك</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIdScanned(false)
                          setIdData(null)
                          setImagePreview(null)
                          setUploadedIdImage(null)
                        }}
                        className="text-green-600 hover:text-green-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">💡 رفع صورة بطاقة الهوية يساعد السلطات في التواصل معك بسرعة أكبر</p>
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="anonymous"
                checked={formData.anonymous}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, anonymous: checked }))}
              />
              <Label htmlFor="anonymous" className="text-sm">
                {t("anonymous")}
              </Label>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 space-x-reverse pt-4">
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={!selectedCity || !formData.description.trim()}
              >
                <Send className="mr-2 h-4 w-4" />
                {t("submitReport")}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                {t("cancel")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Emergency Notice */}
      <Card className="mt-4 bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <div className="text-center text-orange-800">
            <p className="font-medium">⚠️ في حالة الطوارئ</p>
            <p className="text-sm">اتصل مباشرة بالرقم 19 (الشرطة) أو 15 (الإسعاف)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
