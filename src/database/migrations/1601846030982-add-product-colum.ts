import {MigrationInterface, QueryRunner} from "typeorm";

export class addProductColum1601846030982 implements MigrationInterface {
    name = 'addProductColum1601846030982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "closed"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "unitMeasure" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unitMeasure"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "closed" boolean NOT NULL`);
    }

}
