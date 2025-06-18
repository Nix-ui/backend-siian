import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/entities/Class.entity';
import { CourseModule } from 'src/admin-interface/course/course.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    CourseModule,
    DatabaseModule
  ],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
