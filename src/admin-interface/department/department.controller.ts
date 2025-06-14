import { Controller,Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiTags,ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
    constructor(private departmentService: DepartmentService) {}
    @Get()
    @ApiResponse({ status: 200, description: 'Departments retrieved successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getAllDepartments() {
        return await this.departmentService.getDepartments();
    }
    @Get('/:department_id')
    @ApiParam({ name: 'department_id', type: 'number' })
    @ApiResponse({ status: 200, description: 'Department retrieved successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getDepartmentById(@Param('department_id') department_id: number) {
        return await this.departmentService.getDepartmentById(department_id);
    }
    @Get('/:department_name')
    @ApiParam({ name: 'department_name', type: 'string' })
    @ApiResponse({ status: 200, description: 'Department retrieved successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getDepartmentByName(@Param('department_name') department_name: string) {
        return await this.departmentService.getDepartmentByName(department_name);
    }
}
