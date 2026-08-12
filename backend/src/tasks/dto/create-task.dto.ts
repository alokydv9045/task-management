import { IsString, IsNotEmpty, IsOptional, IsDateString, IsIn, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['TODO', 'DOING', 'COMPLETED', 'ON_HOLD'])
  status?: string;

  @IsString()
  @IsOptional()
  @IsIn(['HIGH', 'MEDIUM', 'LOW'])
  priority?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  labels?: string; // Comma separated for simplicity, or JSON string

  @IsOptional()
  @IsInt()
  order?: number;
}
