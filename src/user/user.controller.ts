import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ChangeEmailDto, UpdateUserDto } from './dto/update.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update')
  @UseGuards(AuthGuard)
  async updateUserData(@Body() updateData: UpdateUserDto) {
    return await this.userService.updateUserData(updateData);
  }

  @Put('change-email')
  @UseGuards(AuthGuard)
  async changeEmail(@Body() updateData: ChangeEmailDto) {
    return await this.userService.changeEmail(updateData);
  }
}
