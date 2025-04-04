import { Module } from '@nestjs/common';
import { InscriptionsController } from './inscriptions.controller';
import { InscriptionsService } from './inscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Inscriptions from 'src/common/entity/inscriptions.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/common/entity/user.entitry';
import Course from 'src/common/entity/course.entity';
import ModuleDB from 'src/common/entity/modules.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscriptions, User, Course, ModuleDB]),
    UserModule,
  ],
  controllers: [InscriptionsController],
  providers: [InscriptionsService],
})
export class InscriptionsModule {}
