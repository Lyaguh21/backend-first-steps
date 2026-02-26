export type AuthUser = {
  userId: number;
  email: string;
};

export type AuthUserWithRefresh = AuthUser & {
  refreshToken: string;
};
