
export interface Car {
  id: string
  model_name: string
  price: number
  currency: string
  image_url: string
  features: string[]
  is_featured: boolean
}

export interface Dealer {
  id: string
  name: string
  address: string
  phone: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
  image_url: string
}
