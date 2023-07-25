import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Todo {
  @ApiProperty({ description: 'Primary key as Option ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Task title.', example: 'Do something.' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Task description.', example: 'Do something but with more details.' })
  @Column()
  description: string;
}
