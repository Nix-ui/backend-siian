import { Controller, Get, Param } from '@nestjs/common';
import { CarrerService } from './carrer.service';
import { ApiTags,ApiResponse, ApiParam } from '@nestjs/swagger';
import { Carrer } from 'src/entities/Carrer.entity';

@ApiTags('carrer')
@Controller('carrer')
export class CarrerController {
    constructor(private carrerService: CarrerService) {}
    @Get()
    @ApiResponse({ status: 200, description: 'Carrers retrieved successfully', type: [Carrer],example:[
        {
            "id": 1,
            "name": "Ingeniería de Sistemas",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        },
        {
            "id": 2,
            "name": "Ingeniería Electrónica",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        },
        {
            "id": 3,
            "name": "Ingeniería Mecánica",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        },
        {
            "id": 4,
            "name": "Ingeniería Civil",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        }
    ] })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getAllCarrers() {
        return await this.carrerService.getAllCarrers();
    }
    @Get('/:carrer_id')
    @ApiParam({ name: 'carrer_id', type: 'number', example: 1, description: 'id de la carrera' })
    @ApiResponse({ status: 200, description: 'Carrer retrieved successfully', type: Carrer,
        example: {
            "id": 1,
            "name": "Ingeniería de Sistemas",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getCarrerById(@Param('carrer_id') carrer_id: number) {
        return await this.carrerService.getCarrerById(carrer_id);
    }
    @Get('/:carrer_name')
    @ApiParam({ name: 'carrer_name', type: 'string', example: 'Ingeniería de Sistemas',description: 'Nombre de la carrera' })
    @ApiResponse({ status: 200, description: 'Carrer retrieved successfully',type:Carrer,
        example: {
            "id": 1,
            "name": "Ingeniería de Sistemas",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getCarrerByName(@Param('carrer_name') carrer_name: string) {
        return await this.carrerService.getCarrerByName(carrer_name);
    }
    @Get('/department/:department_id')
    @ApiParam({ name: 'department_id', type: 'number', example: 1, description: 'id del departamento' })
    @ApiResponse({ status: 200, description: 'Carrer retrieved successfully', type: [Carrer], 
        example: [
        {
            "id": 1,
            "name": "Ingeniería de Sistemas",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        },
        {
            "id": 2,
            "name": "Ingeniería Electrónica",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        },
        {
            "id": 3,
            "name": "Ingeniería Mecánica",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z"
        }]
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getCarrerByDepartmentId(@Param('department_id') department_id: number) {
        return await this.carrerService.getCarrerByDepartmentId(department_id);
    }
    @Get('/department/:department_name')
    @ApiParam({ name: 'department_name', type: 'string', example: 'Ingeniería', description: 'Nombre del departamento' })
    @ApiResponse({ status: 200, description: 'Carrer retrieved successfully',type:[Carrer],
        example: [
        {
            "id": 1,
            "name": "Ingeniería de Sistemas",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        },
        {
            "id": 2,
            "name": "Ingeniería Electrónica",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z",
        },
        {
            "id": 3,
            "name": "Ingeniería Mecánica",
            "totalSemester": 8,
            "departmentId": 1,
            "state": 'active',
            "creationDate": "2023-04-04T00:00:00.000Z"
        }
    ]
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getCarrerByDepartmentName(@Param('department_name') department_name: string) {
        return await this.carrerService.getCarrerByDepartment(department_name);
    }

}
