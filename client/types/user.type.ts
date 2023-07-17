export interface IStandardUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  defaultTenantId: string;
  permissions: string[];
  role: string;
  userPreferences: UserPreferences;
  tenantId: string;
  userTenantId: string;
  status: number;
}

export interface IUser extends IStandardUser {
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
  iss: string;
}

export interface UserPreferences {
  locale: string;
}
