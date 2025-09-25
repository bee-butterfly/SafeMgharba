export interface Incident {
  id: string
  type: "theft" | "accident" | "riot" | "fire" | "medical" | "other"
  description: string
  location: {
    lat: number
    lng: number
    address: string
    city?: string
  }
  timestamp: Date
  status: "pending" | "inProgress" | "resolved"
  anonymous: boolean
  reporterId?: string
  idVerified?: boolean
}

export interface ReportFormData {
  type: Incident["type"]
  description: string
  anonymous: boolean
  city?: string
  idVerified?: boolean
  idImage?: File | null
  idData?: {
    name: string
    idNumber: string
    city: string
    verified: boolean
  }
  location?: {
    lat: number
    lng: number
    address: string
    city?: string
  }
}
