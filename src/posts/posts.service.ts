import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    async create(createPostDto: CreatePostDto) {
        const { category, tags, ...post } = createPostDto;

        const categoryData = await this.categoryRepository.findOneBy({
            id: category,
        });

        const tagData = await this.tagRepository.findBy({
            id: In(tags),
        });

        const postData = await this.postRepository.save({
            ...post,
            category: categoryData,
            tags: tagData,
        });

        // if (!postData) throw new HttpException('Post not created', 500);

        return postData;
    }

    async findAll() {
        const posts = await this.postRepository.find({ relations: ['category', 'tags'] });
        if (!posts) throw new HttpException('Posts not found', 404);

        return posts;
    }

    async findOne(id: string) {
        const post = await this.postRepository.findOne({ where: { id }, relations: ['category', 'tags'] });
        if (!post) throw new HttpException('Post not found', 404);

        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    async remove(id: string): Promise<string> {
        const post = await this.postRepository.findBy({ id });
        if (!post) throw new HttpException('Post not found', 404);

        await this.postRepository.delete({ id });

        return `${id}Post deleted`;
    }
}
