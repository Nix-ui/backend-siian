import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/entities/Subject.entity';
import { CarrerModule } from '../carrer/carrer.module';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [TypeOrmModule.forFeature([Subject]),CarrerModule,DatabaseModule],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
