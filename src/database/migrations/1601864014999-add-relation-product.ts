import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationProduct1601864014999 implements MigrationInterface {
    name = 'addRelationProduct1601864014999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proposal_product" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "proposal_product" ADD CONSTRAINT "FK_54a433582047a30e0a3694b0639" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proposal_product" DROP CONSTRAINT "FK_54a433582047a30e0a3694b0639"`);
        await queryRunner.query(`ALTER TABLE "proposal_product" DROP COLUMN "productId"`);
    }

}
