import {Column,Entity,Index,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {Class} from './Class.entity'
import {Subject} from './Subject.entity'
import {Teacher} from './Teacher.entity'
import {Academicperiod} from './Academicperiod.entity'
import {Enrollment} from './Enrollment.entity'


@Index("course_index_11",["subjectCode",],{  })
@Index("course_index_12",["teacherUuid",],{  })
@Index("course_index_13",["academicPeriod",],{  })
@Entity("course" ,{schema:"siian" } )
export  class Course {

@PrimaryGeneratedColumn({ type:"int", name:"id" })
id:number;

@Column("varchar",{ name:"subjectCode",length:7 })
subjectCode:string;

@Column("varchar",{ name:"teacherUuid",length:100 })
teacherUuid:string;

@Column("int",{ name:"paralelNumber" })
paralelNumber:number;

@Column("int",{ name:"academicPeriod" })
academicPeriod:number;

@Column("int",{ name:"capacity" })
capacity:number;

@OneToMany(()=>Class,(_class)=>_class.course)


classes:Class[];

@ManyToOne(()=>Subject,subject=>subject.courses,{ onDelete:"NO ACTION",onUpdate:"NO ACTION" })
@JoinColumn([{ name: "subjectCode", referencedColumnName: "code" },
])

subjectCode2:Subject;

@ManyToOne(()=>Teacher,teacher=>teacher.courses,{ onDelete:"NO ACTION",onUpdate:"NO ACTION" })
@JoinColumn([{ name: "teacherUuid", referencedColumnName: "userUuid" },
])

teacherUu:Teacher;

@ManyToOne(()=>Academicperiod,academicperiod=>academicperiod.courses,{ onDelete:"NO ACTION",onUpdate:"NO ACTION" })
@JoinColumn([{ name: "academicPeriod", referencedColumnName: "id" },
])

academicPeriod2:Academicperiod;

@OneToMany(()=>Enrollment,enrollment=>enrollment.course)


enrollments:Enrollment[];

}
