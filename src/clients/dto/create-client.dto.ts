import { IsNotEmpty, IsOptional } from "class-validator";
export class CreateClientDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    password: string;
    email: string;
    @IsNotEmpty()
    phone:string; 
}
