export interface Dealer {
  id: string;
  name: string;
  subDealersCount?: number;
  vehiclesCount?: number;
  logo?: any;
}

const nalleyLogo = require('@/assets/images/react-logo.png');

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