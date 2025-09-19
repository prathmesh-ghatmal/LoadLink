"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Copy, Check } from "lucide-react"
import { useState } from "react"

interface QRCodeDisplayProps {
  amount: number
  bookingId: string
  onClose: () => void
}

export function QRCodeDisplay({ amount, bookingId, onClose }: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`Payment for Booking #${bookingId}: $${amount}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <QrCode className="h-5 w-5" />
          <span>Payment QR Code</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dummy QR Code - In real app, this would be generated */}
        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="w-48 h-48 bg-black flex items-center justify-center">
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-white" : "bg-black"}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Amount: ${amount.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Booking #{bookingId}</p>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleCopy} className="flex-1 bg-transparent">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy Details"}
          </Button>
          <Button onClick={onClose} className="flex-1">
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
