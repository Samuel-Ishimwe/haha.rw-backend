import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number;
    @Column()
    name: string;
    @Column()
    login:string;
    @Column()
    password: string;
    @Column()
    email: string;
    @Column()
    phone:string;
    @Column()
    role: string;
    @Column({default: false})
    isActived : boolean;
}
