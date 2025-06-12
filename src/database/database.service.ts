import { Injectable } from '@nestjs/common';
import { StoredProcedureService } from './storedprocedure/storedprocedure.service';

@Injectable()
export class DatabaseService {
    constructor(
        private readonly storedProcedureService: StoredProcedureService
    ) {}

    /**
     * Executes a stored procedure and optionally maps results to an entity
     * @param procedureName Name of the stored procedure
     * @param params Array of input parameters
     * @param entityType Optional entity class for result mapping
     * @returns Promise with mapped results (T[]) or raw results (any[])
     */
    async executeStoredProcedure<T>(
        procedureName: string,
        params: (string | number | Date | boolean)[] = [],
        entityType?: new () => T
    ): Promise<any> {
        if (!procedureName?.trim()) {
            throw new Error('Procedure name is required');
        }

        try {
            const result = await this.storedProcedureService.executeProcedure(
                procedureName,
                params,
                entityType
            );
            return result;
        } catch (error) {
            const errorMessage = `Error executing procedure ${procedureName}: ${error.message}`;
            console.error(errorMessage, error.stack);
            throw new Error(errorMessage);
        }
    }
}