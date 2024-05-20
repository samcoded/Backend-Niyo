import { IsString, IsBoolean, IsOptional } from 'class-validator';

class CreateTaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;
}

export { CreateTaskDto };
