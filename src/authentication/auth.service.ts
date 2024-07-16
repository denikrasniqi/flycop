import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/users/user.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.prismaService.user.findUnique({
      where: { username },
      include: { userRoles: { include: { role: true } } },
    });
    if (!username) {
      throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    user.password = undefined;
    const roles = user.userRoles.map((userRole) => userRole.role.id);

    const token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
      roles: roles,
    });
    return { token, user };
  }

  async register(createDto: RegisterUserDto): Promise<any> {
    const { name, email, username, password, role = 2 } = createDto;

    if (!username) {
      throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
    }
    let plainPassword;
    let hashedPassword;

    console.log(role);
    if (role != 1) {
      plainPassword = Math.random().toString(36).slice(-8);
      hashedPassword = await bcrypt.hash(plainPassword, 10);
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const createUser = new User();
    createUser.firstName = name;
    createUser.email = email;
    createUser.username = username;
    createUser.password = hashedPassword;

    const user = await this.userService.getUserByUsername(username);

    if (user) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userByEmail = await this.userService.getUserEmail(email);

    if (userByEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userService.createUser(createUser);

    // Assign the role to the user
    const roleRecord = await this.prismaService.role.findUnique({
      where: { id: role },
    });
    if (!roleRecord) {
      throw new NotFoundException('Role not found');
    }
    await this.prismaService.userRole.create({
      data: {
        user: { connect: { id: newUser.id } },
        role: { connect: { id: roleRecord.id } },
      },
    });

    const token = this.jwtService.sign({
      username: newUser.username,
      sub: newUser.id,
      roles: [role],
    });
    return { token, plainPassword };
  }
}
