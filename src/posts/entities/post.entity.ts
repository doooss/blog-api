import { CommonEntity } from '@common';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({
    name: 'post',
})
export class Post extends CommonEntity {
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 4095,
    })
    content: string;

    /**
     * ~ 8,388,607
     */
    @Column({
        type: 'mediumint',
        default: 0,
        nullable: true,
    })
    viewCount: number;

    /**
     * ~ 32,767
     */
    @Column({
        type: 'smallint',
        default: 0,
        nullable: true,
    })
    likeCount: number;

    @ManyToMany(() => Tag, (tag) => tag.id)
    @JoinTable()
    tags: Tag[];

    @ManyToOne(() => Category, (category) => category.id)
    category: Category;
}
