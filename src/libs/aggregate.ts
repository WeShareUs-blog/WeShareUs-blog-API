import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class Aggregate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ select: false })
  private createdAt!: Date;

  @UpdateDateColumn({ select: false })
  private updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  private deletedAt!: Date;
}
