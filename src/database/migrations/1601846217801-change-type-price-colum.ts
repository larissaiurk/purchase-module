import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTypePriceColum1601846217801 implements MigrationInterface {
    name = 'changeTypePriceColum1601846217801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_provider" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product_provider" ADD "price" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_provider" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product_provider" ADD "price" integer NOT NULL`);
    }

}
