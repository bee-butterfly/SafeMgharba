"use client"

import { Scale, BookOpen, AlertCircle, Phone, Shield, Users, HomeIcon, Car } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { useState } from "react"

export function LawGuide() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [selectedCategory, setSelectedCategory] = useState("general")
  
  // Helper: get an illustrative image per category
  const getLawImage = (categoryId) => {
    switch (categoryId) {
      case "general":
        return "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop" // rights/constitution
      case "security":
        return "" // police/security
      case "traffic":
        return "" // traffic/roads
      case "property":
        return "" // property/house
      case "social":
        return "" // social/family
      default:
        return ""
    }

  // Get image for a specific law (fallback to category image)
  const getLawImageForLaw = (law, categoryId) => law?.image || getLawImage(categoryId)
  }

  const lawCategories = [
    {
      id: "general",
      title: "القوانين العامة",
      icon: Scale,
      color: "blue",
      laws: [
        {
          title: "حقوق المواطن الأساسية",
          content: "كل مواطن له الحق في الأمان والحماية والتعبير عن رأيه بحرية دون إيذاء الآخرين.",
          penalty: "انتهاك هذه الحقوق يعاقب عليه القانون",
          image: "",
        },
        {
          title: "واجبات المواطن",
          content: "احترام القانون، دفع الضرائب، احترام حقوق الآخرين، والمشاركة في الحياة المدنية.",
          penalty: "عدم أداء الواجبات قد يؤدي إلى عقوبات قانونية",
          image: "",
        },
        {
          title: "حرية التنقل",
          content: "حق كل مواطن في التنقل داخل المملكة والسفر للخارج وفق القوانين المعمول بها.",
          penalty: "منع التنقل بدون مبرر قانوني جريمة",
          image: "",
        },
      ],
    },
    {
      id: "security",
      title: "القوانين الأمنية",
      icon: Shield,
      color: "red",
      laws: [
        {
          title: "التبليغ عن الجرائم",
          content: "واجب على كل مواطن التبليغ عن الجرائم التي يشهدها أو يعلم بها للسلطات المختصة.",
          penalty: "عدم التبليغ عن جريمة خطيرة قد يعتبر تواطؤاً",
          image: "",
        },
        {
          title: "التعاون مع الأمن",
          content: "يجب التعاون مع رجال الأمن وتقديم المساعدة عند الطلب في إطار القانون.",
          penalty: "عرقلة عمل الأمن جريمة يعاقب عليها القانون",
          image: "",
        },
        {
          title: "حمل الهوية",
          content: "يجب حمل بطاقة الهوية الوطنية أو جواز السفر عند التنقل وإبرازها عند الطلب.",
          penalty: "عدم حمل الهوية قد يؤدي إلى غرامة مالية",
          image: "",
        },
      ],
    },
    {
      id: "traffic",
      title: "قوانين المرور",
      icon: Car,
      color: "orange",
      laws: [
        {
          title: "رخصة القيادة",
          content: "يمنع قيادة أي مركبة بدون رخصة قيادة سارية المفعول ومناسبة لنوع المركبة.",
          penalty: "القيادة بدون رخصة: غرامة من 300 إلى 1200 درهم",
          image: "",
        },
        {
          title: "احترام إشارات المرور",
          content: "يجب احترام جميع إشارات المرور والعلامات الطرقية وأوامر رجال المرور.",
          penalty: "مخالفة الإشارة الحمراء: غرامة 1400 درهم وسحب نقط",
          image: "",
        },
        {
          title: "السرعة المحددة",
          content: "يجب احترام حدود السرعة المحددة في كل منطقة (50 كم/س في المدن، 100 كم/س على الطرق).",
          penalty: "تجاوز السرعة: غرامة من 300 إلى 1400 درهم حسب المخالفة",
          image: "",
        },
        {
          title: "حزام الأمان",
          content: "إجباري لبس حزام الأمان لجميع ركاب السيارة في المقاعد الأمامية والخلفية.",
          penalty: "عدم لبس الحزام: غرامة 300 درهم",
          image: "",
        },
      ],
    },
    {
      id: "property",
      title: "قوانين الملكية",
      icon: HomeIcon,
      color: "green",
      laws: [
        {
          title: "حق الملكية",
          content: "الملكية الخاصة مضمونة ولا يمكن نزعها إلا للمنفعة العامة وبتعويض عادل.",
          penalty: "انتهاك حق الملكية جريمة يعاقب عليها القانون",
          image: "",
        },
        {
          title: "السرقة",
          content: "أخذ ممتلكات الغير بدون إذن جريمة سرقة مهما كانت قيمة المسروق.",
          penalty: "السرقة: من شهر إلى 5 سنوات حسب قيمة المسروق",
          image: "",
        },
        {
          title: "إتلاف الممتلكات",
          content: "تدمير أو إتلاف ممتلكات الغير عمداً أو بإهمال جريمة يعاقب عليها القانون.",
          penalty: "الإتلاف: تعويض مالي وعقوبة حبسية محتملة",
          image: "",
        },
      ],
    },
    {
      id: "social",
      title: "القوانين الاجتماعية",
      icon: Users,
      color: "purple",
      laws: [
        {
          title: "العنف الأسري",
          content: "العنف ضد أفراد الأسرة جريمة خطيرة ويحق للضحية طلب الحماية من المحكمة.",
          penalty: "العنف الأسري: من 6 أشهر إلى 3 سنوات حبس",
          image: "",
        },
        {
          title: "حقوق الطفل",
          content: "حماية الأطفال من العنف والاستغلال واجب على الجميع، والتبليغ عن انتهاكات حقوقهم إجباري.",
          penalty: "إيذاء الطفل: عقوبات مشددة تصل إلى 10 سنوات",
          image: "",
        },
        {
          title: "التحرش",
          content: "التحرش الجنسي أو المعنوي في أي مكان جريمة يعاقب عليها القانون بشدة.",
          penalty: "التحرش: من سنة إلى 5 سنوات حبس وغرامة مالية",
          image: "",
        },
      ],
    },
  ]

  const emergencyNumbers = [
    { number: "19", service: "الشرطة", icon: Shield },
    { number: "15", service: "الإسعاف", icon: AlertCircle },
    { number: "150", service: "الدرك الملكي", icon: Shield },
    { number: "177", service: "الوقاية المدنية", icon: AlertCircle },
  ]

  const selectedCategoryData = lawCategories.find((cat) => cat.id === selectedCategory)

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
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
          <div className="relative h-full flex items-center px-6">
            <div className="flex items-center space-x-4 space-x-reverse text-white">
              <Scale className="h-12 w-12" />
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">دليل القانون المغربي</h1>
                <p className="text-blue-100 mt-2">تعرف على حقوقك وواجباتك كمواطن مغربي</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {lawCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`h-auto p-4 flex flex-col items-center space-y-2 ${
              selectedCategory === category.id
                ? `bg-${category.color}-600 hover:bg-${category.color}-700`
                : "bg-transparent"
            }`}
          >
            <category.icon className="h-6 w-6" />
            <span className="text-sm text-center">{category.title}</span>
          </Button>
        ))}
      </div>

      {/* Selected Category Content with Flip Cards */}
      {selectedCategoryData && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <selectedCategoryData.icon className="h-6 w-6 mr-2" />
            {selectedCategoryData.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {selectedCategoryData.laws.map((law, index) => (
              <div key={index} className="group [perspective:1000px]">
                <div className="relative h-64 w-full rounded-xl shadow-lg transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-xl">
                    <img
                      src={getLawImage(selectedCategory)}
                      alt={law.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 p-4 text-white">
                      <h3 className="text-lg font-bold">{law.title}</h3>
                      <p className="text-xs text-gray-200 mt-1 line-clamp-2">{law.content}</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 rounded-xl bg-white p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] border">
                    <div className="h-full flex flex-col">
                      <h3 className="text-base font-bold text-gray-900 mb-2">{law.title}</h3>
                      <p className="text-sm text-gray-700 mb-3 flex-1">{law.content}</p>
                      <div className="mt-auto bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-900">العقوبة:</h4>
                            <p className="text-red-800 text-sm">{law.penalty}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Numbers */}
      <Card className="bg-red-50/60 border-red-200/70">
        <CardHeader>
          <CardTitle className="flex items-center text-red-900">
            <Phone className="h-5 w-5 mr-2" />
            أرقام الطوارئ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {emergencyNumbers.map((emergency, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                <emergency.icon className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-900">{emergency.number}</div>
                <div className="text-sm text-gray-600">{emergency.service}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legal Disclaimer */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-start">
            <BookOpen className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">تنبيه قانوني:</p>
              <p>
                هذا الدليل يقدم معلومات عامة عن القوانين المغربية لأغراض التوعية فقط. للحصول على استشارة قانونية دقيقة،
                يرجى مراجعة محامٍ مختص أو الجهات القانونية المختصة.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      
    </div>
  )
}
