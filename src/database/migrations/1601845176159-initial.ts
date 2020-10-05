import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1601845176159 implements MigrationInterface {
    name = 'initial1601845176159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_history" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "orderId" integer, CONSTRAINT "PK_cc71513680d03ecb01b96655b0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proposal_product" ("id" SERIAL NOT NULL, "price" double precision NOT NULL, "quantity" integer NOT NULL, "paymentDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "proposalId" integer, CONSTRAINT "PK_f85e41c9b3cb54b367c22959dab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "closed" boolean NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_provider" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "providerId" integer, "productId" integer, CONSTRAINT "PK_21370c1fdc836875d42b50851de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proposal" ("id" SERIAL NOT NULL, "payment_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delivery_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "quotationId" integer, "providerId" integer, CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quotation" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "orderId" integer, CONSTRAINT "PK_596c572d5858492d10d8cf5383d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "responsible" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_17e34c82bd39c71ea31099833ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "closed" boolean NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "responsibleId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_history" ADD CONSTRAINT "FK_e15b4a73a3e53311433968993cc" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposal_product" ADD CONSTRAINT "FK_0766cb1f70b765489ec3d2290c6" FOREIGN KEY ("proposalId") REFERENCES "proposal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_provider" ADD CONSTRAINT "FK_467449ca0887cf1a96096cd4154" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_provider" ADD CONSTRAINT "FK_79368308fd8bffeeecc026fb7e0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "FK_28ac35bd4b4df5653d8a9b065bd" FOREIGN KEY ("quotationId") REFERENCES "quotation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "FK_7efd4866b04dc138bac361c96f4" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation" ADD CONSTRAINT "FK_f01c561b831d9d1f3e73af7b377" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_0334fde937d4b567d8ad30c13e9" FOREIGN KEY ("responsibleId") REFERENCES "responsible"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_0334fde937d4b567d8ad30c13e9"`);
        await queryRunner.query(`ALTER TABLE "quotation" DROP CONSTRAINT "FK_f01c561b831d9d1f3e73af7b377"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_7efd4866b04dc138bac361c96f4"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_28ac35bd4b4df5653d8a9b065bd"`);
        await queryRunner.query(`ALTER TABLE "product_provider" DROP CONSTRAINT "FK_79368308fd8bffeeecc026fb7e0"`);
        await queryRunner.query(`ALTER TABLE "product_provider" DROP CONSTRAINT "FK_467449ca0887cf1a96096cd4154"`);
        await queryRunner.query(`ALTER TABLE "proposal_product" DROP CONSTRAINT "FK_0766cb1f70b765489ec3d2290c6"`);
        await queryRunner.query(`ALTER TABLE "order_history" DROP CONSTRAINT "FK_e15b4a73a3e53311433968993cc"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "responsible"`);
        await queryRunner.query(`DROP TABLE "quotation"`);
        await queryRunner.query(`DROP TABLE "proposal"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "product_provider"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "proposal_product"`);
        await queryRunner.query(`DROP TABLE "order_history"`);
    }

}
