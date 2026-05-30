export type UserRole = 'explorer' | 'admin';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  level: number;
  savedLocations: string[];
  createdAt: Date;
}
