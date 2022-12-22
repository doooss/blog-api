import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async create({ name }: CategoryDto) {
        const isExist = await this.categoryRepository.exist({ select: ['id'], where: { name } });
        if (isExist) {
            throw new HttpException('이미 존재하는 태그입니다.', 400);
        }

        return await this.categoryRepository.save({ name });
    }

    async findAll(): Promise<Category[]> {
        const categorys = await this.categoryRepository.find();
        if (!categorys) {
            throw new HttpException('태그가 존재하지 않습니다.', 404);
        }
        return categorys;
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new HttpException('존재하지 않는 태그입니다.', 404);
        }
        return category;
    }

    async update(id: number, categoryDto: CategoryDto) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new HttpException('존재하지 않는 태그입니다.', 404);
        }

        await this.categoryRepository.merge(category, categoryDto);

        await this.categoryRepository.save(category);
        const newCategory = await this.categoryRepository.findOneBy({
            id,
        });

        if (newCategory.name !== categoryDto.name) {
            throw new HttpException('태그 이름 변경에 실패했습니다.', 400);
        }

        return newCategory;
    }

    async remove(id: number): Promise<string> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new HttpException('존재하지 않는 태그입니다.', 404);
        }

        await this.categoryRepository.delete(category);
        const isExist = await this.categoryRepository.exist({ select: ['id'], where: { id } });
        if (isExist) {
            throw new HttpException('삭제에 실패했습니다.', 500);
        }

        return '삭제되었습니다.';
    }
}
