import {MigrationInterface, QueryRunner} from "typeorm";

export class choose1601949121537 implements MigrationInterface {
    name = 'choose1601949121537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proposal" ADD "choosed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "closed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "closed" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "choosed"`);
    }

}
