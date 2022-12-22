import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    create(@Body() tagDto: TagDto) {
        return this.tagsService.create(tagDto);
    }

    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() tagDto: TagDto) {
        return this.tagsService.update(+id, tagDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tagsService.remove(+id);
    }
}
