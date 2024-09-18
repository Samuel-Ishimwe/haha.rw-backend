import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

enum Roles {
    Admin = 'Admin',
    Client = "Client"
}

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    password: string;
    email: string;
    @IsNotEmpty()
    phone:string;
    @IsOptional()
    @IsEnum(Roles)
    readonly role: Roles;
    isActived : boolean;

    constructor(name,login){
        this.isActived = true;
        this.name = name;
    }
}
