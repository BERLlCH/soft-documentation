import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of your todo',
    example: 'Finish university',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'More details about your todo app.',
    example: 'Go to classes, communicate with teachers, take labs.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class DeleteTaskDto {
  @ApiProperty({
    description: 'ID of task that you want to delete.',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
