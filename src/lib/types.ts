export interface User {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface Balance {
  balance: number;
}

export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}
