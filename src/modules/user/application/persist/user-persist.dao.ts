import { Validate, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';
import { DomainValidator } from 'base-ddd';
import { BaseDao } from '../../../share/application/base.dao';

@ArgsType()
export class UserPersistDao extends BaseDao {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UserId])
  @Field()
  id: string;

  @Validate(DomainValidator, [UserName])
  @Field()
  name: string;

  @IsOptional()
  @Field({ nullable: true, defaultValue: false })
  showEntity?: boolean;
}
