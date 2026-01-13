export interface Address {
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Company {
  name: string;
  title: string;
  department: string;
}

export interface UserFormState {
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number | undefined; // undefined чтобы input был пустым изначально
  gender: string | undefined;
  email: string;
  phone: string;
  username: string;
  birthDate: string; // YYYY-MM-DD
  image: string;
  bloodGroup: string | undefined;
  height: number | undefined;
  weight: number | undefined;
  eyeColor: string | undefined;
  role: string | undefined;

  address: Address;
  company: Company;
  university: string;
}
