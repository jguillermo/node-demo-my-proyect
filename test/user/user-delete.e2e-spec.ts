import { UserRepository } from '../../src/user/domain/user.repository';
import { UserMother } from './user-object-mother';
import { TestingE2eModule } from '../testing-e2e-module';

describe('User repository', () => {
  let repository: UserRepository;
  beforeEach(async () => {
    ({ userRepository: repository } = await TestingE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });

  it('persist', async () => {
    const user = UserMother.create();
    await repository.persist(user);
    const userDb = await repository.findById(user.id);
    expect(userDb.id).toEqual(user.id);
    expect(userDb.name).toEqual(user.name);
  });
});
