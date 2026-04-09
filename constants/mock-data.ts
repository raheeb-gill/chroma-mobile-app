export interface Dealer {
  id: string;
  name: string;
  subDealersCount?: number;
  vehiclesCount?: number;
  logo?: any;
}

export interface Vehicle {
  id: string;
  name: string;
  price: string;
  description: string;
  mileage: string;
  status: 'For Sale' | 'Sold';
  image: any;
}

const nalleyLogo = require('@/assets/images/react-logo.png');
const carImage = require('@/assets/images/90e68c6d8c10b8f23ed87d30dc72ba734d54764c.jpg');

export const mockMainDealers: Dealer[] = [
  { id: '1', name: 'Nalley Honda', subDealersCount: 4, logo: nalleyLogo },
  { id: '2', name: 'Nalley Honda', subDealersCount: 4, logo: nalleyLogo },
  { id: '3', name: 'Nalley Honda', subDealersCount: 4, logo: nalleyLogo },
  { id: '4', name: 'Nalley Honda', subDealersCount: 4, logo: nalleyLogo },
];

export const mockSubDealers: Dealer[] = [
  { id: 's1', name: 'Nalley Honda', vehiclesCount: 156, logo: nalleyLogo },
  { id: 's2', name: 'Nalley Honda', vehiclesCount: 156, logo: nalleyLogo },
  { id: 's3', name: 'Nalley Honda', vehiclesCount: 156, logo: nalleyLogo },
  { id: 's4', name: 'Nalley Honda', vehiclesCount: 156, logo: nalleyLogo },
];

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Grand Cherokee',
    price: '$56,991',
    description: '4WD Regular Cab Standard Box Pro',
    mileage: '35,100 mi',
    status: 'For Sale',
    image: carImage,
  },
  {
    id: 'v2',
    name: 'Grand Cherokee',
    price: '$56,991',
    description: '4WD Regular Cab Standard Box Pro',
    mileage: '35,100 mi',
    status: 'For Sale',
    image: carImage,
  },
  {
    id: 'v3',
    name: 'Grand Cherokee',
    price: '$56,991',
    description: '4WD Regular Cab Standard Box Pro',
    mileage: '35,100 mi',
    status: 'For Sale',
    image: carImage,
  },
  {
    id: 'v4',
    name: 'Grand Cherokee',
    price: '$56,991',
    description: '4WD Regular Cab Standard Box Pro',
    mileage: '35,100 mi',
    status: 'Sold',
    image: carImage,
  },
];