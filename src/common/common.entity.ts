import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
