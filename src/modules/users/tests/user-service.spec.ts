import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { TEST_USER_DATA } from '~utils/testing';
import { UnprocessableEntityException } from '@nestjs/common';
import { QueryError } from 'mysql2';

describe('UserService', () => {
  const usersRepositoryToken = getRepositoryToken(User);
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ConfigService,
        {
          provide: usersRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get<Repository<User>>(usersRepositoryToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const data = { ...TEST_USER_DATA, password: 'test' };
      const returnData = {
        id: 1,
        password: 'test',
        ...TEST_USER_DATA,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(usersRepository, 'create').mockReturnValueOnce(returnData);

      await usersService.add(data);

      expect(usersRepository.create).toHaveBeenCalledWith(data);
    });

    it('should throw exception if user already exists', async () => {
      const DuplicatedError = new UnprocessableEntityException(
        'duplicated email',
      );
      const data = { ...TEST_USER_DATA, password: 'test' };

      jest.spyOn(usersRepository, 'create').mockImplementationOnce(() => {
        throw new QueryFailedError('', [], {
          code: 'ER_DUP_ENTRY',
        } as QueryError);
      });

      await expect(usersService.add(data)).rejects.toThrow(DuplicatedError);
    });
  });
});
