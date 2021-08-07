import { IsOptional, Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';
import { OrderDao, PaginatorDao } from '../../../share/application/filter.dto';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { DomainValidator, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';

@ArgsType()
export class UserListDao extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UUIDTypeImp])
  @Field({ nullable: true })
  id?: string;

  @Validate(DomainValidator, [StringTypeImp])
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Validate(DomainValidator, [PaginatorTypeImp])
  @Field(() => PaginatorDao, { nullable: true })
  paginator?: PaginatorDao;

  @IsOptional()
  @Validate(DomainValidator, [OrderTypeImp])
  @Field(() => OrderDao, { nullable: true })
  order?: OrderDao;
}
