declare interface AuthCredentials {
  username: string;
  password: string;
}

declare interface AuthResponse {
  accessToken: string;
}

declare interface SignUpCredentials {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

declare interface SignUpResponse {
  accessToken: string;
}
