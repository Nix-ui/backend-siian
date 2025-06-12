import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class StoredProcedureService {
    constructor(private readonly dataSource: DataSource) {}

    async executeProcedure<T>(
        procedureName: string,
        params: any[] = [],
        entityType?: new () => T
    ): Promise<T[] | any[]> {
        const queryRunner = this.dataSource.createQueryRunner();
        
        try {
            await queryRunner.connect();
            const placeholders = params.map(() => '?').join(', ');
            const result = await queryRunner.query(
                `CALL ${procedureName}(${placeholders})`,
                params
            );
            
            const rawResults = this.normalizeResults(result);
            
            return entityType 
                ? this.mapToEntities(rawResults, entityType)
                : rawResults;
        } finally {
            await queryRunner.release();
        }
    }

    private normalizeResults(results: any): any[] {
        if (!results) return [];
        if (Array.isArray(results) && results.length > 0 && Array.isArray(results[0])) {
            return results[0];
        }
        return results;
    }

    private mapToEntities<T>(rawResults: any[], entityType: new () => T): T[] {
        return rawResults.map(row => {
            const entity = new entityType();
            for (const [key, value] of Object.entries(row)) {
                entity[key] = value;
            }
            return entity;
        });
    }
}