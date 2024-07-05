export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: File;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface UserUpdate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
