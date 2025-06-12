import { IsNotEmpty, IsNumber,IsString} from 'class-validator';
export class AssignRoleByNamesDto {
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    roleName: string;
}