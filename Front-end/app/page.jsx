"use client"

import { useState } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { Navigation } from "@/components/navigation"
import { HomePage } from "@/components/home-page"
import { ReportForm } from "@/components/report-form"
import { IncidentsList } from "@/components/incidents-list"
import { ProfilePage } from "@/components/profile-page"
import { LawGuide } from "@/components/law-guide" // Import LawGuide component
import { LegalAwareness } from "@/components/legal-awareness"
import { Shield, MapPin, Eye, Smartphone, Clock, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockIncidents } from "@/lib/mock-data"

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [user, setUser] = useState(null) // Move user state here
  const [incidents, setIncidents] = useState(mockIncidents) // Add incidents state

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentPage("awareness") // Redirect to awareness after login
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage("home") // Redirect to home after logout
  }

  const handleReportSubmit = (data) => {
    console.log("Report submitted:", data)
    
    // Create new incident from submitted data
    const newIncident = {
      id: Date.now().toString(), // Simple ID generation
      type: data.type,
      description: data.description,
      location: data.location || {
        lat: 33.5731, // Default to Casablanca coordinates if no location
        lng: -7.5898,
        address: data.city ? `المدينة: ${data.city}` : "موقع غير محدد",
        city: data.city || "unknown",
      },
      timestamp: new Date(),
      status: "pending", // New reports start as pending
      anonymous: data.anonymous || false,
      reporterId: user?.id || null,
      idVerified: data.idVerified || false,
      idData: data.idData || null,
    }
    
    // Add new incident to the beginning of the list
    setIncidents(prevIncidents => [newIncident, ...prevIncidents])
    
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      setCurrentPage("incidents") // Redirect to incidents page to see the new report
    }, 2000)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">SafeMgharba</span>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                      المميزات
                    </a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                      كيف يعمل
                    </a>
                    <a href="#download" className="text-gray-600 hover:text-blue-600 transition-colors">
                      تحميل
                    </a>
                  </nav>
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-right">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                      بلغ بسهولة
                      <span className="block text-blue-600">واحمي مجتمعك</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                      تطبيق SafeMgharba يخليك تبلغ على الأحداث الأمنية بكليك واحد. سرقة، حادث، أو أي مشكل أمني - بلغ
                      بسرعة وأمان.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                        <Smartphone className="mr-2 h-5 w-5" />
                        حمل التطبيق الآن
                      </Button>
                      <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                        شاهد كيف يعمل
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-8 shadow-2xl">
                      <div className="bg-white rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900">تبليغ سريع</h3>
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-gray-700">سرقة</span>
                          </div>
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-gray-700">حادث مرور</span>
                          </div>
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-700">شغب</span>
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">بلغ الآن</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">مميزات التطبيق</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">SafeMgharba مصمم باش يكون سهل وآمن للجميع</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">تبليغ سريع</h3>
                      <p className="text-gray-600">بلغ على أي حدث أمني بكليك واحد فقط</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">تبليغ مجهول</h3>
                      <p className="text-gray-600">إمكانية التبليغ بدون كشف الهوية</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">موقع دقيق</h3>
                      <p className="text-gray-600">إرسال الموقع مباشرة للأمن</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">تنبيهات قريبة</h3>
                      <p className="text-gray-600">شاهد الأحداث في منطقتك</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كيف يعمل التطبيق؟</h2>
                  <p className="text-xl text-gray-600">ثلاث خطوات بسيطة للتبليغ</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">اختر نوع الحدث</h3>
                    <p className="text-gray-600">سرقة، حادث، شغب، أو غيرها من الأحداث الأمنية</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">أضف التفاصيل</h3>
                    <p className="text-gray-600">وصف مختصر والموقع (يتم إرساله تلقائياً)</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">أرسل التبليغ</h3>
                    <p className="text-gray-600">يصل التبليغ فوراً للسلطات المختصة</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-blue-600 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2">10K+</div>
                    <div className="text-blue-100">مستخدم نشط</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">5K+</div>
                    <div className="text-blue-100">تبليغ تم حله</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-blue-100">خدمة متواصلة</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">95%</div>
                    <div className="text-blue-100">معدل الرضا</div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section id="download" className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">ابدأ في حماية مجتمعك اليوم</h2>
                <p className="text-xl mb-8 text-blue-100">حمل SafeMgharba وكن جزء من مجتمع آمن</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                    <Smartphone className="mr-2 h-5 w-5" />
                    تحميل للأندرويد
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent"
                  >
                    <Smartphone className="mr-2 h-5 w-5" />
                    تحميل للآيفون
                  </Button>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="h-8 w-8 text-blue-400" />
                      <span className="text-2xl font-bold">SafeMgharba</span>
                    </div>
                    <p className="text-gray-400">تطبيق التبليغ الأمني الأول في المغرب</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          الرئيسية
                        </a>
                      </li>
                      <li>
                        <a href="#features" className="hover:text-white transition-colors">
                          المميزات
                        </a>
                      </li>
                      <li>
                        <a href="#how-it-works" className="hover:text-white transition-colors">
                          كيف يعمل
                        </a>
                      </li>
                      <li>
                        <a href="#download" className="hover:text-white transition-colors">
                          تحميل
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">الدعم</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          مركز المساعدة
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          اتصل بنا
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          الأسئلة الشائعة
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">قانوني</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          سياسة الخصوصية
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          شروط الاستخدام
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  <p>&copy; 2024 SafeMgharba. جميع الحقوق محفوظة.</p>
                </div>
              </div>
            </footer>
          </div>
        )
      case "law-guide":
        return <LawGuide />
      case "report":
        return <ReportForm onSubmit={handleReportSubmit} onCancel={() => setCurrentPage("home")} />
      case "incidents":
        return <IncidentsList incidents={incidents} />
      case "awareness":
        return <LegalAwareness />
      case "profile":
        return <ProfilePage incidents={incidents} user={user} />
      default:
        return user ? <HomePage onPageChange={setCurrentPage} incidents={incidents} /> : renderCurrentPage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {showSuccessMessage && (
        <div className="bg-green-500 text-white text-center py-3">
          ✅ تم إرسال التبليغ بنجاح! سيتم مراجعته من قبل السلطات المختصة.
        </div>
      )}

      <main className="pb-20">{renderCurrentPage()}</main>
    </div>
  )
}

export default function SafeMgharbaApp() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
