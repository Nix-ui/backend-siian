import { Controller, Get, Param } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { ApiTags,ApiResponse, ApiParam } from '@nestjs/swagger';
import { Subject } from 'src/entities/Subject.entity';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
    constructor(private subjectService: SubjectService) {}
    @Get()
    @ApiResponse({ status: 200, description: 'Subjects retrieved successfully', type:[Subject],
        example:[
            {
                "code": "MAT-102",
                "name": "Matemáticas Discretas",
            },
            {
                "code": "FIS-101",
                "name": "Física General",
            },
            {
                "code": "ING-101",
                "name": "Introducción a la Ingeniería",
            }
        ]
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getAllSubjects() {
        return await this.subjectService.getAllSubjects();
    }
    @Get('/carrer/:carrerId')
    @ApiParam({ name: 'carrerId', type: 'number', example: 1, description: 'ID de la carrera' })
    @ApiResponse({ status: 200, description: 'Subject retrieved successfully', type: [Subject] ,
        example: [{
            "code": "MAT-102",
            "name": "Matemáticas Discretas",
        },
        {
            "code": "FIS-101",
            "name": "Física General",
        }
    ]
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getSubjectsByCarrer(@Param('carrerId') carrerId: number) {
        return await this.subjectService.getSubjectByCarrerId(carrerId);
    }
    @Get('carrerr/:carrerName')
    @ApiParam({ name: 'carrerName', type: 'string', example: 'Ingeniería de Sistemas', description: 'Nombre de la carrera' })
    @ApiResponse({ status: 200, description: 'Subject retrieved successfully',type:[Subject],
        example:[
            {
                "code": "MAT-102",
                "name": "Matemáticas Discretas",
            },
            {
                "code": "FIS-101",
                "name": "Física General",
            },
            {
                "code": "ING-101",
                "name": "Introducción a la Ingeniería",
            }
        ]
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async getSubjectsByCarrerName(@Param('carrerName') carrerName: string) {
        return await this.subjectService.getSubjectByCarrer(carrerName);
    }
}
