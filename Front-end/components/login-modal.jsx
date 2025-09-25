"use client"

import { useState } from "react"
import { X, User, Lock, Eye, EyeOff, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function LoginModal({ isOpen, onClose, onLogin, isSignup = false }) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onLogin({
        name: isSignup ? formData.name : "مستخدم SafeMgharba",
        email: formData.email,
        id: "user123",
      })
      setIsLoading(false)
      onClose()
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {isSignup ? <UserPlus className="h-5 w-5 text-blue-600" /> : <User className="h-5 w-5 text-blue-600" />}
              {isSignup
                ? language === "ar"
                  ? "إنشاء حساب جديد"
                  : "Sign Up"
                : language === "ar"
                  ? "تسجيل الدخول"
                  : "Login"}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (only for signup) */}
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name">{language === "ar" ? "الاسم الكامل" : "Full Name"}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">{language === "ar" ? "البريد الإلكتروني" : "Email"}</Label>
              <Input
                id="email"
                type="email"
                placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">{language === "ar" ? "كلمة المرور" : "Password"}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Confirm Password Field (only for signup) */}
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={language === "ar" ? "أعد إدخال كلمة المرور" : "Confirm your password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isSignup
                    ? language === "ar"
                      ? "جاري إنشاء الحساب..."
                      : "Creating account..."
                    : language === "ar"
                      ? "جاري تسجيل الدخول..."
                      : "Logging in..."}
                </div>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  {isSignup
                    ? language === "ar"
                      ? "إنشاء حساب"
                      : "Sign Up"
                    : language === "ar"
                      ? "تسجيل الدخول"
                      : "Login"}
                </>
              )}
            </Button>

            {/* Demo Credentials (only for login) */}
            {!isSignup && (
              <div className="text-center text-sm text-gray-500 mt-4 p-3 bg-gray-50 rounded">
                <p className="font-medium mb-1">{language === "ar" ? "للتجربة استخدم:" : "Demo credentials:"}</p>
                <p>Email: demo@safemgharba.ma</p>
                <p>Password: demo123</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
