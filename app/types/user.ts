export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  email: string;
  phone: string;
  username: string;
  password?: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  role: "admin" | "moderator" | "user";
  gender: "male" | "female";
  age: number;

  // Виртуальное поле для UI
  isActive?: boolean;
}

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
