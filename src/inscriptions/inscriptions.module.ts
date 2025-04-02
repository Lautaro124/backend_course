import { Module } from '@nestjs/common';
import { InscriptionsController } from './inscriptions.controller';
import { InscriptionsService } from './inscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Inscriptions from 'src/common/entity/inscriptions.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inscriptions]), UserModule],
  controllers: [InscriptionsController],
  providers: [InscriptionsService],
})
export class InscriptionsModule {}
