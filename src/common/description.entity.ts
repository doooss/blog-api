import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class DescriptionEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;
}
