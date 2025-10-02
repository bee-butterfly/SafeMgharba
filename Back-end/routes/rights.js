const express = require('express');
const router = express.Router();

// Simple localized rights content (no DB required)
const RIGHTS = {
  en: {
    title: "Essential Citizen Rights",
    subtitle: "The Constitution of the Kingdom of Morocco guarantees citizens' dignity and rights",
    constitution: "Constitution",
    rights: "Key Rights",
    education: "Education",
    health: "Health",
    housing: "Housing",
    expression: "Freedom of Expression",
    learnMore: "Learn more",
    reportNow: "Report now",
    readMore: "Read more",
    note: "Note: This page is informative and simplified. For official information, refer to published legal texts."
  },
  fr: {
    title: "Droits essentiels du citoyen",
    subtitle: "La Constitution du Royaume du Maroc garantit la dignité et les droits du citoyen",
    constitution: "Constitution",
    rights: "Droits essentiels",
    education: "Éducation",
    health: "Santé",
    housing: "Habitation",
    expression: "Liberté d'expression",
    learnMore: "En savoir plus",
    reportNow: "Signaler",
    readMore: "Lire plus",
    note: "Note: Cette page est à titre informatif et simplifié. Pour des informations officielles, consultez les textes juridiques publiés."
  },
  ar: {
    title: "حقوق المواطن الأساسية",
    subtitle: "دستور المملكة المغربية يضمن كرامة المواطن وحقوقه",
    constitution: "الدستور",
    rights: "الحقوق الأساسية",
    education: "التعليم",
    health: "الصحة",
    housing: "السكن",
    expression: "حرية التعبير",
    learnMore: "تعرف أكثر",
    reportNow: "أبلغ الآن",
    readMore: "اقرأ المزيد",
    note: "تنبيه: هذه الصفحة لأغراض توعوية وتبسيطية. للمعلومات الرسمية، يرجى الرجوع إلى النصوص القانونية المنشورة."
  }
};

// GET /rights?lang=ar|fr|en
router.get('/', (req, res) => {
  const lang = (req.query.lang || 'en').toLowerCase();
  const data = RIGHTS[lang] || RIGHTS['en'];
  res.json({ lang, ...data });
});

module.exports = router;
