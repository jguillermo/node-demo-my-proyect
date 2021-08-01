import { IsInt, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('OrderInput')
export abstract class OrderDao {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  field?: string;

  @IsOptional()
  @IsInt()
  @Field({ nullable: true })
  direction?: string;
}

@InputType('PaginatorInput')
export abstract class PaginatorDao {
  @IsOptional()
  @IsInt()
  @Field({ nullable: true })
  page?: number;

  @IsOptional()
  @IsInt()
  @Field({ nullable: true })
  perPage?: number;
}