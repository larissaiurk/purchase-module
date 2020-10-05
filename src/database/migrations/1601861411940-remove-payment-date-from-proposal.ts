import {MigrationInterface, QueryRunner} from "typeorm";

export class removePaymentDateFromProposal1601861411940 implements MigrationInterface {
    name = 'removePaymentDateFromProposal1601861411940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proposal_product" DROP COLUMN "paymentDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proposal_product" ADD "paymentDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
