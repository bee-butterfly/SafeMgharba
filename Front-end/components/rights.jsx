"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

export function RightsPage() {
  const { language } = useLanguage()

  const t = {
    // default values while fetching
    title: language === 'ar' ? 'حقوق المواطن الأساسية' : language === 'fr' ? 'Droits essentiels du citoyen' : 'Essential Citizen Rights',
    subtitle: language === 'ar'
      ? 'تسعى المملكة المغربية إلى تعزيز الكرامة والعدالة والمساواة، كما ينص عليها الدستور والقوانين التنظيمية.'
      : language === 'fr'
      ? 'Le Royaume du Maroc promeut la dignité, la justice et l’égalité, telles que garanties par la Constitution et les lois.'
      : 'The Kingdom of Morocco upholds dignity, justice, and equality as guaranteed by the Constitution and laws.',
    constitution: language === 'ar' ? 'الدستور' : language === 'fr' ? 'Constitution' : 'Constitution',
    rights: language === 'ar' ? 'الحقوق الأساسية' : language === 'fr' ? 'Droits essentiels' : 'Key Rights',
    education: language === 'ar' ? 'التعليم' : language === 'fr' ? 'Éducation' : 'Education',
    health: language === 'ar' ? 'الصحة' : language === 'fr' ? 'Santé' : 'Health',
    housing: language === 'ar' ? 'السكن' : language === 'fr' ? 'Habitation' : 'Housing',
    expression: language === 'ar' ? 'حرية التعبير' : language === 'fr' ? "Liberté d'expression" : 'Freedom of Expression',
    learnMore: language === 'ar' ? 'تعرف أكثر' : language === 'fr' ? 'En savoir plus' : 'Learn more',
    videosTitle: language === 'ar' ? 'الخطب الملكية' : language === 'fr' ? 'Discours Royaux' : 'Royal Speeches',
    videosSubtitle: language === 'ar'
      ? 'مختارات من الخطب الملكية لجلالة الملك محمد السادس نصره الله.'
      : language === 'fr'
      ? 'Sélection de discours de Sa Majesté le Roi Mohammed VI.'
      : 'Selected speeches of His Majesty King Mohammed VI.',
    watchMore: language === 'ar' ? 'مشاهدة المزيد' : language === 'fr' ? 'Voir plus' : 'Watch more',
  }

  const [remote, setRemote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // rotating images of the King
  const kingImages = [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Mohammed_VI_of_Morocco.jpg",
      altAr: "الملك محمد السادس",
      altFr: "Roi Mohammed VI",
      altEn: "King Mohammed VI",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mohammed_VI_and_Mohammed_bin_Zayed_2015.jpg/640px-Mohammed_VI_and_Mohammed_bin_Zayed_2015.jpg",
      altAr: "جلالة الملك في مناسبة رسمية",
      altFr: "Sa Majesté lors d'une cérémonie officielle",
      altEn: "His Majesty at an official ceremony",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/King_Mohammed_VI.jpg/640px-King_Mohammed_VI.jpg",
      altAr: "صورة لجلالة الملك محمد السادس",
      altFr: "Photo de SM le Roi Mohammed VI",
      altEn: "Photo of HM King Mohammed VI",
    },
  ]
  const [imageIndex, setImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    // prefer an explicit FRONTEND env var if available; fall back to relative path
    const base = process.env.NEXT_PUBLIC_API_URL || ''
    const lang = language || 'en'
    setLoading(true)
    setError(null)
    fetch(`${base}/rights?lang=${encodeURIComponent(lang)}`)
      .then((r) => {
        if (!r.ok) throw new Error(`status:${r.status}`)
        return r.json()
      })
      .then((data) => setRemote(data))
      .catch((err) => setError(err.message || 'fetch error'))
      .finally(() => setLoading(false))
  }, [language])

  // Auto-rotate images every 5 seconds when auto-playing
  useEffect(() => {
    if (!isAutoPlaying) return
    const id = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % kingImages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [kingImages.length, isAutoPlaying])

  const goToSlide = (index) => {
    setImageIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setImageIndex((prev) => (prev + 1) % kingImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setImageIndex((prev) => (prev - 1 + kingImages.length) % kingImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-3 py-2 rounded-md z-50">{language === 'ar' ? 'تخطي إلى المحتوى' : language === 'fr' ? 'Passer au contenu' : 'Skip to content'}</a>

      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-tight">{t.title}</h1>
            <p className="text-gray-700 mt-4 text-lg md:text-xl max-w-4xl mx-auto">{t.subtitle}</p>
            <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto"></div>
          </div>
        </div>
      </header>

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* King Images Carousel - Clean Display */}
        <section aria-label={language === 'ar' ? 'صور الملك' : language === 'fr' ? "Images du Roi" : 'King images'} className="mb-8">
          <div className="relative w-full h-96 md:h-[550px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl group bg-gray-100">
            {/* Carousel Images - Enhanced Visibility */}
            <div className="relative w-full h-full">
              {kingImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === imageIndex
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-110 z-0'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={language === 'ar' ? image.altAr : language === 'fr' ? image.altFr : image.altEn}
                    fill
                    className="object-cover brightness-100 contrast-105"
                    priority={index === 0}
                    quality={95}
                  />
                </div>
              ))}
            </div>

            {/* Enhanced Navigation Arrows - Always Visible */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-4 transition-all duration-300 z-20 border border-gray-200"
              aria-label={language === 'ar' ? 'الصورة السابقة' : language === 'fr' ? 'Image précédente' : 'Previous image'}
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-4 transition-all duration-300 z-20 border border-gray-200"
              aria-label={language === 'ar' ? 'الصورة التالية' : language === 'fr' ? 'Image suivante' : 'Next image'}
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Enhanced Carousel Dots - More Prominent */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
              {kingImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                    index === imageIndex
                      ? 'bg-white border-white scale-125 shadow-lg'
                      : 'bg-white/70 border-white/70 hover:bg-white hover:border-white hover:scale-110'
                  }`}
                  aria-label={`${language === 'ar' ? 'اذهب إلى الصورة' : language === 'fr' ? 'Aller à l\'image' : 'Go to image'} ${index + 1}`}
                />
              ))}
            </div>

            {/* Image Counter Display */}
            <div className="absolute top-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
              {imageIndex + 1} / {kingImages.length}
            </div>
          </div>

          {/* Constitution enhanced card below hero */}
          <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-white to-blue-50 rounded-3xl shadow-xl p-6 md:p-8 ring-1 ring-blue-100 border border-white/50 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">{remote?.constitution || t.constitution}</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{loading && !remote ? (language === 'ar' ? 'جارٍ التحميل…' : language === 'fr' ? 'Chargement…' : 'Loading…') : error ? (language === 'ar' ? 'فشل تحميل المحتوى' : language === 'fr' ? "Échec du chargement" : 'Failed to load content') : (remote?.subtitle || t.subtitle)}</p>
            </div>
          </div>
        </section>

        {/* Essential Rights section following */}
        <section className="mb-10">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 rounded-3xl shadow-2xl p-8 ring-1 ring-white/20 border border-white/50 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent tracking-tight mb-4">{t.rights}</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-4" />
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">{language === 'ar' ? 'قوائم الحقوق الأساسية للمواطن' : language === 'fr' ? 'Liste des droits essentiels du citoyen' : 'A list of essential citizen rights'}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <RightCard 
                  icon={<IconEducation />} 
                  title={t.education} 
                  description={
                    language === "ar"
                      ? "حق الولوج إلى تعليم جيد ومنصف للجميع"
                      : language === "fr"
                      ? "Droit à un enseignement de qualité et équitable pour tous"
                      : "Right to quality and equitable education for all"
                  }
                  language={language}
                  onClick={() => alert(language === 'ar' ? 'قريباً: تفاصيل حق التعليم' : language === 'fr' ? 'Bientôt: Détails du droit à l\'éducation' : 'Coming soon: Education rights details')}
                />
                <RightCard 
                  icon={<IconHealth />} 
                  title={t.health} 
                  description={
                    language === "ar"
                      ? "حق الاستفادة من خدمات صحية ملائمة"
                      : language === "fr"
                      ? "Droit à des services de santé adéquats"
                      : "Right to adequate healthcare services"
                  }
                  language={language}
                  onClick={() => alert(language === 'ar' ? 'قريباً: تفاصيل حق الصحة' : language === 'fr' ? 'Bientôt: Détails du droit à la santé' : 'Coming soon: Health rights details')}
                />
                <RightCard 
                  icon={<IconHousing />} 
                  title={t.housing} 
                  description={
                    language === "ar"
                      ? "حق السكن اللائق والعيش الكريم"
                      : language === "fr"
                      ? "Droit à un logement décent et à une vie digne"
                      : "Right to decent housing and dignified living"
                  }
                  language={language}
                  onClick={() => alert(language === 'ar' ? 'قريباً: تفاصيل حق السكن' : language === 'fr' ? 'Bientôt: Détails du droit au logement' : 'Coming soon: Housing rights details')}
                />
                <RightCard 
                  icon={<IconExpression />} 
                  title={t.expression} 
                  description={
                    language === "ar"
                      ? "حق التعبير عن الرأي في إطار القانون"
                      : language === "fr"
                      ? "Droit d'exprimer son opinion dans le cadre de la loi"
                      : "Right to express opinions within the framework of the law"
                  }
                  language={language}
                  onClick={() => alert(language === 'ar' ? 'قريباً: تفاصيل حق التعبير' : language === 'fr' ? 'Bientôt: Détails du droit d\'expression' : 'Coming soon: Expression rights details')}
                />
              </div>
              <div className="mt-8 flex items-center justify-center gap-4">
                <a href="/report" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">{language === 'ar' ? 'أبلغ الآن' : language === 'fr' ? 'Signaler' : 'Report now'}</a>
                <a href="/law-guide" className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-800 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">{language === 'ar' ? 'اقرأ المزيد' : language === 'fr' ? 'Lire plus' : 'Read more'}</a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-xl p-6 text-amber-900 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-base font-medium">
                  {language === "ar"
                    ? "تنبيه: هذه الصفحة لأغراض توعوية وتبسيطية. للمعلومات الرسمية، يرجى الرجوع إلى النصوص القانونية المنشورة."
                    : language === "fr"
                    ? "Note: Cette page est à titre informatif et simplifié. Pour des informations officielles, consultez les textes juridiques publiés."
                    : "Note: This page is informative and simplified. For official information, refer to published legal texts."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Rights & Sources */}
        <section className="bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 rounded-3xl shadow-2xl p-8 ring-1 ring-white/20 border border-white/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent tracking-tight mb-4">
              {language === 'ar' ? 'تفصيل الحقوق ومراجع خارجية' : language === 'fr' ? 'Détails des droits et sources externes' : 'Detailed Rights & External Sources'}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-4" />
          </div>
          <p className="text-gray-600 text-lg mb-8 text-center max-w-3xl mx-auto">
            {language === 'ar'
              ? 'شرح موجز لكل حق أساسي مع روابط لمصادر موثوقة.'
              : language === 'fr'
              ? 'Un bref aperçu de chaque droit fondamental avec des liens vers des sources fiables.'
              : 'A brief overview of each fundamental right with links to reliable sources.'}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <RightDetailCard
              title={t.education}
              icon={<IconEducation />}
              description={
                language === 'ar'
                  ? 'يضمن الدستور حق الولوج إلى تعليم جيد ومنصف. تشمل السياسات تعميم التعليم الأساسي، ومحاربة الهدر المدرسي، وتحسين جودة المناهج.'
                  : language === 'fr'
                  ? "La Constitution garantit l'accès à une éducation de qualité et équitable. Politiques: généralisation de l'enseignement de base, lutte contre le décrochage, amélioration des curricula."
                  : 'The Constitution guarantees access to quality and equitable education. Policies include universal basic education, dropout prevention, and curriculum quality.'
              }
              sourcesLabel={language === 'ar' ? 'مراجع:' : language === 'fr' ? 'Sources:' : 'Sources:'}
              sources={[
                { label: language === 'ar' ? 'وزارة التربية الوطنية' : language === 'fr' ? 'Ministère de l’Éducation' : 'Ministry of Education', href: 'https://www.men.gov.ma/' },
                { label: language === 'ar' ? 'بوابة حكامة التعليم' : language === 'fr' ? 'Portail de gouvernance éducative' : 'Education Governance Portal', href: 'https://www.education.gov.ma/' },
              ]}
            />
            <RightDetailCard
              title={t.health}
              icon={<IconHealth />}
              description={
                language === 'ar'
                  ? 'الحق في الصحة يشمل الولوج إلى الخدمات الأساسية والتغطية الصحية. تطورت البرامج نحو تعميم نظام الحماية الاجتماعية.'
                  : language === 'fr'
                  ? 'Le droit à la santé inclut l’accès aux services essentiels et la couverture sanitaire. Les programmes évoluent vers une protection sociale universelle.'
                  : 'The right to health covers access to essential services and health coverage. Programs are evolving toward universal social protection.'
              }
              sourcesLabel={language === 'ar' ? 'مراجع:' : language === 'fr' ? 'Sources:' : 'Sources:'}
              sources={[
                { label: language === 'ar' ? 'وزارة الصحة والحماية الاجتماعية' : language === 'fr' ? 'Ministère de la Santé' : 'Ministry of Health', href: 'https://www.sante.gov.ma/' },
                { label: language === 'ar' ? 'التغطية الصحية الإجبارية' : language === 'fr' ? 'AMO' : 'Compulsory Health Coverage', href: 'https://www.amal.ma/' },
              ]}
            />
            <RightDetailCard
              title={t.housing}
              icon={<IconHousing />}
              description={
                language === 'ar'
                  ? 'يشمل الحق في السكن اللائق برامج محاربة السكن غير اللائق، وتوفير بدائل سكنية، ودعم الفئات الهشة.'
                  : language === 'fr'
                  ? 'Le droit au logement décent englobe la lutte contre l’habitat précaire, des alternatives de logement, et le soutien aux ménages vulnérables.'
                  : 'The right to decent housing includes programs against substandard housing, alternative housing, and support for vulnerable households.'
              }
              sourcesLabel={language === 'ar' ? 'مراجع:' : language === 'fr' ? 'Sources:' : 'Sources:'}
              sources={[
                { label: language === 'ar' ? 'وزارة إعداد التراب الوطني والإسكان' : language === 'fr' ? 'Ministère de l’Habitat' : 'Ministry of Housing', href: 'https://www.muat.gov.ma/' },
              ]}
            />
            <RightDetailCard
              title={t.expression}
              icon={<IconExpression />}
              description={
                language === 'ar'
                  ? 'حرية التعبير مضمونة في إطار القانون الذي يحمي النظام العام وحقوق الآخرين. يشمل ذلك الصحافة والإعلام والفضاء الرقمي.'
                  : language === 'fr'
                  ? "La liberté d'expression est garantie dans le cadre de la loi protégeant l'ordre public et les droits d'autrui. Cela inclut la presse, les médias et l’espace numérique."
                  : 'Freedom of expression is guaranteed within the law protecting public order and the rights of others, including press, media, and the digital space.'
              }
              sourcesLabel={language === 'ar' ? 'مراجع:' : language === 'fr' ? 'Sources:' : 'Sources:'}
              sources={[
                { label: language === 'ar' ? 'بوابة الأمانة العامة للحكومة' : language === 'fr' ? 'Secrétariat Général du Gouvernement' : 'General Secretariat of the Government', href: 'https://www.sgg.gov.ma/' },
              ]}
            />
          </div>
        </section>
        {/* Royal Speeches (Videos) */}
        <section className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 rounded-3xl shadow-2xl p-8 ring-1 ring-white/20 border border-white/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent tracking-tight mb-4">{t.videosTitle}</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t.videosSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <VideoCard
              title={
                language === 'ar'
                  ? 'خطاب العرش'
                  : language === 'fr'
                  ? 'Discours du Trône'
                  : 'Throne Day Address'
              }
              src="https://www.youtube.com/embed/0HI1R_2O6jE"
            />
            <VideoCard
              title={
                language === 'ar'
                  ? 'خطاب المسيرة الخضراء'
                  : language === 'fr'
                  ? 'Discours de la Marche Verte'
                  : 'Green March Speech'
              }
              src="https://www.youtube.com/embed/0v1DkP9q3iM"
            />
            <VideoCard
              title={
                language === 'ar'
                  ? 'افتتاح الدورة البرلمانية'
                  : language === 'fr'
                  ? 'Ouverture de la session parlementaire'
                  : 'Opening of Parliamentary Session'
              }
              src="https://www.youtube.com/embed/8l8kItzWm1w"
            />
          </div>
          <div className="mt-6">
            <a
              href="https://www.youtube.com/results?search_query=Mohammed+VI+speech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-700 font-medium"
            >
              {t.watchMore} →
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

function RightCard({ title, description, icon, onClick, language }) {
  return (
    <div 
      onClick={onClick}
      className="group p-6 border border-white/20 rounded-2xl bg-gradient-to-br from-white to-blue-50/50 hover:shadow-2xl hover:shadow-blue-500/10 active:scale-95 transform transition-all duration-300 backdrop-blur-sm cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
          <p className="text-gray-600 text-base leading-relaxed">{description}</p>
          {onClick && (
            <div className="mt-3 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
              <span>{language === 'ar' ? 'انقر للمزيد من التفاصيل' : language === 'fr' ? 'Cliquer pour plus de détails' : 'Click for more details'}</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function VideoCard({ title, src }) {
  return (
    <div className="group">
      <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video shadow-xl ring-1 ring-white/20 transform group-hover:scale-105 transition-all duration-300">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
    </div>
  )
}

function RightDetailCard({ title, description, sources = [], sourcesLabel, icon }) {
  return (
    <div className="group p-6 border border-white/20 rounded-2xl bg-gradient-to-br from-white to-slate-50/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h3>
      </div>
      <p className="text-gray-700 mb-4 text-base leading-relaxed">{description}</p>
      {sources.length > 0 && (
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">{sourcesLabel}</span>
          <ul className="list-none mt-3 space-y-2">
            {sources.map((s, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <a className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Inline SVG Icons (no external deps)
function IconEducation() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 3L2 8l10 5 8-4.062V17h2V8L12 3z"/>
      <path d="M4 10.5v3c0 1.657 3.582 3 8 3s8-1.343 8-3v-3l-8 3-8-3z" opacity=".4"/>
    </svg>
  )
}

function IconHealth() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12.1 21.35l-1.1-1.02C5.14 14.24 2 11.39 2 7.92 2 5.1 4.24 3 6.9 3c1.74 0 3.41.81 4.47 2.09C12.69 3.81 14.36 3 16.1 3 18.76 3 21 5.1 21 7.92c0 3.47-3.14 6.32-8.9 12.41l-.99 1.02z"/>
    </svg>
  )
}

function IconHousing() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 3l9 8h-2v10h-6v-6H11v6H5V11H3l9-8z"/>
    </svg>
  )
}

function IconExpression() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M20 2H4a2 2 0 00-2 2v14l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/>
    </svg>
  )
}
