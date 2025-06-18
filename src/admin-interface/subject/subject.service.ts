import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/entities/Subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto, RegisterSubjectDto } from './dto/register-subject.dto';
import { DatabaseService } from 'src/database/database.service';
import { CarrerService } from '../carrer/carrer.service';
import { Carrer } from 'src/entities/Carrer.entity';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
        private databaseService: DatabaseService,
        private carrerService: CarrerService,
    ) {}
    async createSubject(subject: CreateSubjectDto): Promise<Subject> {
        const newSubject: Subject = {
            name: subject.name,
            code: subject.code,
            courses: [],
            teachers: [],
            carrers: [],
        }
        return this.subjectRepository.save(newSubject);
    }
    async registerSubject(subject: RegisterSubjectDto): Promise<Subject> {
        const carrer = await this.carrerService.getCarrerByName(subject.carrer) as Carrer;
        let newSubject: Subject = {
            name: subject.name,
            code: subject.code,
            courses: [],
            teachers: [],
            carrers: [],
        }
        newSubject.carrers.push(carrer);
        const responseSubject = this.subjectRepository.save(newSubject);
        console.log(responseSubject);
        const asignSubject =this.asignSubjectToCarrer(subject.code,carrer.id);
        return asignSubject;
        
    }
    async getAllSubjects(): Promise<Subject[]> {
        return await this.subjectRepository.find();
    }
    async getSubjectByCarrer(carrerName: string): Promise<Subject[]> {
        const carrer = await this.carrerService.getCarrerByName(carrerName);
        if (!carrer) {
            throw new Error('Carrer not found');
        }
        return await this.subjectRepository.find({
            where: {
                carrers: {
                    id: carrer.id,
                },
            },
        });
    }
    async getSubjectByCarrerId(carrerId: number): Promise<Subject[]> {
        const carrer = await this.carrerService.getCarrerById(carrerId);
        if (!carrer) {
            throw new Error('Carrer not found');
        }
        return await this.subjectRepository.find({
            where: {
                carrers: {
                    id: carrer.id,
                },
            },
        });
    }
    async getSubjectByCode(code: string): Promise<Subject | null> {
        return await this.subjectRepository.findOne({
            where: {
                code: code,
            },
        });
    }
    async asignSubjectToCarrer(subjectCode: string, carrerId: number): Promise<Subject> {
        return this.databaseService.executeStoredProcedure('asignCarrerToSubject', [subjectCode, carrerId]);
    }
}
