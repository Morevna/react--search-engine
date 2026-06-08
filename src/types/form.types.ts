export interface FormData {
  id?: string;
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  image: string;
  terms: boolean;
  submittedAt?: string;
}
