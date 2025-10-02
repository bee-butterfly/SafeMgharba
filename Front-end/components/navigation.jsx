"use client"

import { Shield, Home, AlertTriangle, List, User, Scale, LogIn, UserPlus, PlayCircle, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "./language-selector"
import { LoginModal } from "./login-modal"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { useState } from "react"

export function Navigation({ currentPage, onPageChange, user, onLogin, onLogout }) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const navItems = [
    { id: "home", icon: Home, label: t("home") },
    { id: "report", icon: AlertTriangle, label: t("report") },
    { id: "incidents", icon: List, label: t("incidents") },
    { id: "law-guide", icon: Scale, label: t("lawGuide") },
    { id: "awareness", icon: PlayCircle, label: language === "ar" ? "التوعية" : language === "fr" ? "Sensibilisation" : "Awareness" },
    { id: "rights", icon: Crown, label: language === "ar" ? "الحقوق" : language === "fr" ? "Droits" : "Rights" },
    { id: "profile", icon: User, label: t("profile") },
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t("appName")}</h1>
              <p className="text-xs text-gray-500">{t("appTagline")}</p>
            </div>
          </div>

          {/* Authenticated Navigation */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => onPageChange(item.id)}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}

              <div className="flex items-center space-x-3 space-x-reverse border-r pr-4">
                <span className="text-sm text-gray-600">مرحباً، {user.name}</span>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          ) : (
            /* Unauthenticated Navigation - Login/Signup buttons */
            <div className="hidden md:flex items-center space-x-3 space-x-reverse">
              <Button
                variant="outline"
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <LogIn className="h-4 w-4" />
                <span>{language === "ar" ? "تسجيل الدخول" : language === "fr" ? "Connexion" : "Login"}</span>
              </Button>
              <Button
                onClick={() => setShowSignupModal(true)}
                className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4" />
                <span>{language === "ar" ? "إنشاء حساب" : language === "fr" ? "Créer un compte" : "Sign Up"}</span>
              </Button>
            </div>
          )}

          <LanguageSelector />
        </div>

        {/* Mobile Navigation */}
        {user ? (
          <div className="md:hidden flex justify-around py-2 border-t">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(item.id)}
                className="flex flex-col items-center space-y-1 h-auto py-2"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        ) : (
          /* Mobile Login/Signup */
          <div className="md:hidden flex justify-center space-x-3 space-x-reverse py-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLoginModal(true)}
              className="flex items-center space-x-2 space-x-reverse"
            >
              <LogIn className="h-4 w-4" />
              <span>{language === "ar" ? "دخول" : "Login"}</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setShowSignupModal(true)}
              className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-4 w-4" />
              <span>{language === "ar" ? "تسجيل" : "Sign Up"}</span>
            </Button>
          </div>
        )}
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={onLogin} />
      <LoginModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onLogin={onLogin}
        isSignup={true}
      />
    </nav>
    )
  
  }
