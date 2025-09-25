"use client"

import { User, Shield, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
 
export function ProfilePage({ incidents = [], user }) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const userReports = incidents.filter((incident) => incident.reporterId === (user?.id || ""))
  const resolvedReports = userReports.filter((incident) => incident.status === "resolved")

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="bg-blue-100 p-4 rounded-full">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">مستخدم SafeMgharba</h1>
              <p className="text-gray-600">عضو منذ يناير 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userReports.length}</div>
            <div className="text-gray-600">إجمالي التبليغات</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{resolvedReports.length}</div>
            <div className="text-gray-600">تم حلها</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {userReports.filter((r) => r.status === "pending" || r.status === "inProgress").length}
            </div>
            <div className="text-gray-600">قيد المعالجة</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>تبليغاتي الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userReports.length === 0 ? (
              <div className="text-center py-8 text-gray-500">لم تقم بأي تبليغات بعد</div>
            ) : (
              userReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{t(report.type)}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{report.location.address}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      report.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : report.status === "inProgress"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {t(report.status)}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card> 

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>الإعدادات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            تفعيل الإشعارات
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            تغيير كلمة المرور
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            إعدادات الخصوصية
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
            حذف الحساب
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

