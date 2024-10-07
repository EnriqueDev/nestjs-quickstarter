import { TEST_USER_DATA } from '~utils/testing';
import { UserDTO } from '../user.dto';

describe('UserDTO', () => {
  it('should be able to create a DTO from data', () => {
    const dto = UserDTO.fromEntity({});
    expect(dto).toBeDefined();
    expect(dto).toBeInstanceOf(UserDTO);
  });

  it('should be able to return a user with no password', () => {
    const dto = UserDTO.fromEntity({ ...TEST_USER_DATA, password: 'TEST' });
    expect(dto.toResponseUser()).not.toHaveProperty('password');
  });
});
