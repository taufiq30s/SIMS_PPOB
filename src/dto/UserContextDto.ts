export interface ContextDto {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
  aud: string;
  context: UserContextDto;
}

export interface UserContextDto {
  userId: string;
  member_id: string;
  displayName: string;
}
