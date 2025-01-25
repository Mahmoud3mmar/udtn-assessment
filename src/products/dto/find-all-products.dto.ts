import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllProductsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => {
    const page = parseInt(value, 10);
    return isNaN(page) || page < 1 ? 1 : page; // Default to 1 if invalid
  })
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => {
    const limit = parseInt(value, 10);
    return isNaN(limit) || limit < 1 ? 10 : limit; // Default to 10 if invalid
  })
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy?: string = 'name';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
} 