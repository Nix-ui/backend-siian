import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notes } from 'src/entities/Notes.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notes]),
    DatabaseModule
  ],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
