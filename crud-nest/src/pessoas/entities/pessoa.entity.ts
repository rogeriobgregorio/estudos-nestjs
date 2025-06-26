import { IsEmail } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Recado } from '../../recados/entites/recado.entity';

@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @OneToMany(() => Recado, (recado: Recado) => recado.de)
  recadosEnviados: Recado[];

  @OneToMany(() => Recado, (recado: Recado) => recado.para)
  recadosRecebidos: Recado[];

  @Column({ default: true })
  active: boolean;
}
