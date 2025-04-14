import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length:40, unique: true })
    uuid: string;

    @Column({ type: 'int', nullable: true })
    ord_in_thread: number;

    @Column({ type: 'text', nullable: true })
    url: string;

    @Column({ type: 'text', nullable: true })
    parent_url: string;

    @Column({ type: 'text', nullable: true })
    author: string;

    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    language: string;

    @Column({ type: 'text', nullable: true })
    sentiment: string;

    @Column({ type: 'text', nullable: true })
    text: string;

    @Column({ type: 'text', nullable: true })
    highlight_text: string;

    @Column({ type: 'text', nullable: true })
    highlight_title: string;

    @Column({ type: 'text', nullable: true })
    highlight_thread_title: string;

    @Column({ type: 'float', nullable: true })
    rating: number;

    @Column({ type: 'json', nullable: true })
    thread: object;

    @Column({ type: 'json', nullable: true })
    social: object;

    @Column({ type: 'json', nullable: true })
    categories: object;

    @Column({ type: 'json', nullable: true })
    topics: object;

    @Column({ type: 'json', nullable: true })
    external_links: object;

    @Column({ type: 'json', nullable: true })
    external_images: object;

    @Column({ type: 'json', nullable: true })
    trust: object;

    @Column({ type: 'json', nullable: true })
    syndication: object;

    @Column({ type: 'boolean', default: false })
    ai_allow: boolean;

    @Column({ type: 'boolean', default: false })
    has_canonical: boolean;

    @Column({ type: 'boolean', default: false })
    webz_reporter: boolean;

    @Column({ type: 'boolean', default: false })
    breaking: boolean;

    @Column({ type: 'timestamp', nullable: true })
    published: Date;

    @Column({ type: 'timestamp', nullable: true })
    crawled: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
