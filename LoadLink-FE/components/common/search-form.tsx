"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Calendar } from "lucide-react"

interface SearchFormProps {
  onSearch?: (searchData: {
    origin: string
    destination: string
    date: string
  }) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    date: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchData)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>From</span>
              </Label>
              <Input
                id="origin"
                placeholder="Origin city"
                value={searchData.origin}
                onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>To</span>
              </Label>
              <Input
                id="destination"
                placeholder="Destination city"
                value={searchData.destination}
                onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Date</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={searchData.date}
                onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            <Search className="h-4 w-4 mr-2" />
            Search Trips
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
