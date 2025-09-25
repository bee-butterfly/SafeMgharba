"use client"

import { Shield, PlayCircle, BookOpen, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function LegalAwareness() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const videos = [
    {
      title: "حقوقك عند التوقيف وكيف تتصرف",
      channel: "ضابط سابق (توعوي)",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "كيف تبلغ عن جريمة بشكل قانوني وآمن",
      channel: "خبير قانوني مغربي",
      embedUrl: "https://www.youtube.com/embed/oHg5SJYRHA0",
    },
    {
      title: "نصائح مرورية من ضابط سابق",
      channel: "توعية مرورية",
      embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    },
  ]

  const rights = [
    "الحق في الأمان والحماية الشخصية",
    "الحق في التبليغ عن الجرائم دون خوف من الانتقام",
    "الحق في الحماية كشاهد أو مبلغ",
    "الحق في الحصول على المساعدة القانونية",
    "الحق في التعويض في حالة الضرر",
  ]

  const duties = [
    "التبليغ عن الجرائم الخطيرة التي تشهدها",
    "تقديم معلومات صحيحة للسلطات",
    "التعاون مع التحقيقات القضائية",
    "عدم عرقلة سير العدالة",
    "احترام حقوق الآخرين أثناء التبليغ",
  ]

  const crimeTypes = [
    "الجرائم ضد الأشخاص (القتل، الضرب، التهديد)",
    "الجرائم ضد الأموال (السرقة، النصب، التخريب)",
    "الجرائم ضد الأمن العام (الشغب، حمل السلاح)",
    "جرائم المرور (الحوادث، القيادة تحت تأثير الكحول)",
    "الجرائم الإلكترونية والاحتيال الرقمي",
  ]

  const emergencyNumbers = [
    { number: "19", service: "الشرطة", note: "للحالات الأمنية الطارئة" },
    { number: "177", service: "الدرك الملكي", note: "للمناطق الريفية والطرق السيارة" },
    { number: "15", service: "الإسعاف", note: "للحالات الطبية الطارئة" },
    { number: "15", service: "الحماية المدنية", note: "للحرائق والكوارث الطبيعية" },
    { number: "176", service: "الدرك البحري", note: "للحوادث البحرية" },
  ]

  const legalMandatory = [
    "الجرائم ضد أمن الدولة",
    "جرائم القتل والعنف الخطير",
    "الجرائم ضد القاصرين",
    "جرائم المخدرات والاتجار",
  ]

  const resources = [
    { title: "القانون الجنائي المغربي", desc: "النصوص الكاملة للقانون الجنائي", href: "#" },
    { title: "قانون المسطرة الجنائية", desc: "إجراءات التحقيق والمحاكمة", href: "#" },
    { title: "حقوق الضحايا", desc: "دليل حقوق ضحايا الجرائم", href: "#" },
    { title: "المساعدة القانونية", desc: "كيفية الحصول على محامي مجاني", href: "#" },
  ]

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div
          className="relative h-40 sm:h-52 md:h-64 w-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555375771-14b2f1df4e05?q=80&w=1400&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-green-600/60" />
          <div className="relative h-full flex items-center px-6 text-white">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Shield className="h-10 w-10" />
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  التوعية القانونية والأمنية
                </h1>
                <p className="text-blue-100 mt-2">
                  تعرف على حقوقك وواجباتك القانونية في المملكة المغربية وكيفية التعامل مع الأحداث الأمنية
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Videos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PlayCircle className="h-5 w-5 mr-2" />
            فيديوهات توعوية (قنوات ضباط سابقين وخبراء)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v, i) => (
              <div key={i} className="rounded-lg overflow-hidden border">
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={v.embedUrl}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm">{v.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{v.channel}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            ملاحظة: يمكنك تزويدنا بروابط القنوات المغربية لضباط سابقين وسنقوم بإضافتها هنا مباشرة.
          </p>
        </CardContent>
      </Card>

      {/* Rights & Duties */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" /> حقوقك كمواطن
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pr-5 text-gray-700">
              {rights.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" /> واجباتك القانونية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pr-5 text-gray-700">
              {duties.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Crime Types */}
      <Card>
        <CardHeader>
          <CardTitle>أنواع الجرائم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {crimeTypes.map((c, i) => (
              <div key={i} className="p-3 rounded-lg border bg-gray-50 text-gray-700">
                {c}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Numbers */}
      <Card className="bg-red-50/60 border-red-200/70">
        <CardHeader>
          <CardTitle className="flex items-center text-red-900">
            أرقام الطوارئ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {emergencyNumbers.map((e, i) => (
              <div key={i} className="bg-white rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-red-900">{e.service}</div>
                  <div className="text-2xl font-bold text-red-600">{e.number}</div>
                </div>
                <div className="text-xs text-red-700 mt-1">{e.note}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200 text-orange-800 text-sm">
            <div className="flex items-center gap-2 font-bold mb-1">
              <AlertTriangle className="h-4 w-4" /> تنبيه مهم
            </div>
            في حالات الطوارئ الحقيقية، اتصل مباشرة بأرقام الطوارئ. تطبيق SafeMgharba مخصص للتبليغ عن الأحداث غير الطارئة أو لتوثيق الأحداث بعد حدوثها.
          </div>
        </CardContent>
      </Card>

      {/* Legal Framework */}
      <Card>
        <CardHeader>
          <CardTitle>الإطار القانوني للتبليغ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-800">
          <div>
            <h3 className="font-bold mb-2">التبليغ الإجباري</h3>
            <ul className="list-disc pr-5 space-y-1">
              {legalMandatory.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">حماية المبلغين</h3>
            <ul className="list-disc pr-5 space-y-1">
              <li>سرية هوية المبلغ</li>
              <li>الحماية من الانتقام</li>
              <li>المساعدة القانونية المجانية</li>
              <li>برامج حماية الشهود</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg border p-4">
            <h3 className="font-bold mb-2">المادة 446 من القانون الجنائي</h3>
            <p className="text-sm leading-6">
              "كل من علم بارتكاب جناية أو جنحة ضد أمن الدولة الداخلي أو الخارجي ولم يشعر بها السلطات في الحال، يعاقب بالحبس من سنة إلى خمس سنوات وبغرامة من مائتين إلى ألف درهم."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>مصادر قانونية مفيدة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {resources.map((r, i) => (
              <div key={i} className="p-4 border rounded-lg bg-white">
                <div className="font-bold 
                text-gray-900">{r.title}</div>
                <div className="text-sm text-gray-600">{r.desc}</div>
                <Button variant="outline" className="mt-3 bg-transparent" asChild>
                  <a href={r.href} target="_blank" rel="noopener noreferrer">
                    اقرأ المزيد <ArrowRight className="h-4 w-4 mr-2" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
