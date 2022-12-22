import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    async create({ name }: TagDto) {
        const isExist = await this.tagRepository.exist({ select: ['id'], where: { name } });
        if (isExist) {
            throw new HttpException('이미 존재하는 태그입니다.', 400);
        }

        return await this.tagRepository.save({ name });
    }

    async findAll(): Promise<Tag[]> {
        const tags = await this.tagRepository.find();
        if (!tags) {
            throw new HttpException('태그가 존재하지 않습니다.', 404);
        }
        return tags;
    }

    async findOne(id: number): Promise<Tag> {
        const tag = await this.tagRepository.findOneBy({ id });
        if (!tag) {
            throw new HttpException('존재하지 않는 태그입니다.', 404);
        }
        return tag;
    }

    async update(id: number, tagDto: TagDto) {
        const tag = await this.tagRepository.findOneBy({ id });
        if (!tag) {
            throw new HttpException('존재하지 않는 태그입니다.', 404);
        }

        await this.tagRepository.merge(tag, tagDto);

        await this.tagRepository.save(tag);
        const newTag = await this.tagRepository.findOneBy({
            id,
        });

        if (newTag.name !== tagDto.name) {
            throw new HttpException('태그 이름 변경에 실패했습니다.', 400);
        }

        return newTag;
    }

    async remove(id: number): Promise<string> {
        const tag = await this.tagRepository.findOneBy({ id });
        if (!tag) {
            throw new HttpException('존재하지 않는 태그입니다.', 404);
        }

        await this.tagRepository.remove(tag);
        const isExist = await this.tagRepository.exist({ select: ['id'], where: { id } });
        if (isExist) {
            throw new HttpException('삭제에 실패했습니다.', 500);
        }

        return '삭제되었습니다.';
    }
}
