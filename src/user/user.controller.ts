import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
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

  @Get('details/:id')
  @UseGuards(AuthGuard('jwt'))
  async getUserDetails(@Param('id') id: string) {
    if (!id || id === 'undefined') {
      return null;
    }

    return await this.userService.getUserDetails(id);
  }

  @Get('search')
  async searchUser(@Query('name') name: string) {
    if (name) {
      return await this.userService.searchUser(name);
    }
    console.log(
      '🚀 ~ UserController ~ searchUser ~ await this.userService.getAllUsers():',
      await this.userService.getAllUsers(),
    );
    return await this.userService.getAllUsers();
  }

  @Post('generate-link')
  @UseGuards(AuthGuard('jwt'))
  async generateLink(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return await this.userService.generateLink(req?.user.sub as number);
  }
}
