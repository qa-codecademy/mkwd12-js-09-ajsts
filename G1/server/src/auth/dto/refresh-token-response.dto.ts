import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  @ApiProperty({
    description: 'Token of the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNDgyYTI5Zi0xODc3LTRiOTEtOTEzMS1kMTk5YzU0MWZhODYiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6Ikd1ZXN0IiwiaWF0IjoxNzIwNDYyNTA4LCJleHAiOjE3MjEwNjczMDh9.mbxLXyoPZxZ3yx9aEVlS6fd4_1I0jKclrRqDwwlgOZE',
  })
  token: string;

  @ApiProperty({
    description: 'Refresh token of the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNDgyYTI5Zi0xODc3LTRiOTEtOTEzMS1kMTk5YzU0MWZhODYiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6Ikd1ZXN0IiwiaWF0IjoxNzIwNDYyNTA4LCJleHAiOjE3MjEwNjczMDh9.mbxLXyoPZxZ3yx9aEVlS6fd4_1I0jKclrRqDwwlgOZE',
  })
  refreshToken: string;

  // Add these too types (as optional to not break the flow) so that we can return this data in the login api response
  email?: string;
  role?: string
}
