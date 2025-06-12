import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { StoredProcedureModule } from './storedprocedure/storedprocedure.module';
@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  imports: [StoredProcedureModule],
  exports: [DatabaseService, StoredProcedureModule],
})
export class DatabaseModule {}
