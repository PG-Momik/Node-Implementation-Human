import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePostsTable1744727665810 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /**
         * TODO 1: I should probably change uuid length to 36 since the uuid i get in response is not hifen-ated.
         * TODO 2: I could normalize categories and topics field. Since the docs mention that they are predetermined.
         */
        await queryRunner.createTable(
            new Table({
                name: 'posts',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'uuid',
                        type: 'varchar',
                        length: '40',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'ord_in_thread',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'url',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'parent_url',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'author',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'title',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'language',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'sentiment',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'text',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'highlight_text',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'highlight_title',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'highlight_thread_title',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'rating',
                        type: 'float',
                        isNullable: true,
                    },
                    {
                        name: 'thread',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'social',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'categories',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'topics',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'external_links',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'external_images',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'trust',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'syndication',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'ai_allow',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'has_canonical',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'webz_reporter',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'breaking',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'published',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'crawled',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'updated',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
    }

}