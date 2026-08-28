import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    RECEPTION = 'reception',
    DOCTOR = 'doctor',
    PATIENT = 'patient',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    passwordHash!: string;

    @Column({ type: 'enum', enum: UserRole })
    role!: UserRole;

    @CreateDateColumn()
    createdAt!: Date;
}
