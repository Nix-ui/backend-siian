import { Module } from '@nestjs/common';
import { StoredProcedureService } from './storedprocedure.service';

@Module({
  providers: [StoredProcedureService],
  exports: [StoredProcedureService],
  imports: [],
})
export class StoredProcedureModule {}
