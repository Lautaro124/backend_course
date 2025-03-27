import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ChangeEmailDto, UpdateUserDto } from './dto/update.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  async updateUserData(@Body() updateData: UpdateUserDto) {
    return await this.userService.updateUserData(updateData);
  }

  @Put('change-email')
  @UseGuards(AuthGuard('jwt'))
  async changeEmail(@Body() updateData: ChangeEmailDto) {
    return await this.userService.changeEmail(updateData);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getUserData(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return await this.userService.getUserData(req.user.sub as number);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('generate-link')
  @UseGuards(AuthGuard('jwt'))
  async generateLink(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return await this.userService.generateLink(req?.user.sub as number);
  }
}
