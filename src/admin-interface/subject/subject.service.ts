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
        return this.subjectRepository.save(newSubject);
    }
    async getAllSubjects(): Promise<Subject[]> {
        return await this.subjectRepository.find();
    }
    async 
}
