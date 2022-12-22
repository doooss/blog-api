import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({
        example: 'Hello World',
        description: 'The title of the post',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: '<p>Hello World</p>',
        description: 'The content of the post',
    })
    @IsString()
    content: string;

    @ApiProperty({
        example: 1,
        description: 'The tag.ids of the post',
    })
    @IsNotEmpty()
    tags: number[];

    @ApiProperty({
        example: 1,
        description: 'The category.id of the post',
    })
    @IsNumber()
    category: number;
}
