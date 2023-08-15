import { IsNotEmpty, IsString } from 'class-validator';

export class FileResponseDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
