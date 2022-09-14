import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1663147493427 implements MigrationInterface {
    name = 'migration1663147493427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "type" varchar NOT NULL, "recurring_type" varchar NOT NULL, "date" varchar NOT NULL, "end_date" varchar NOT NULL, "amount" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "userId", "type", "recurring_type", "date", "end_date", "amount") SELECT "id", "user_id", "type", "recurring_type", "date", "end_date", "amount" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "type" varchar NOT NULL, "recurring_type" varchar NOT NULL, "date" varchar NOT NULL, "end_date" varchar NOT NULL, "amount" integer NOT NULL, CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "userId", "type", "recurring_type", "date", "end_date", "amount") SELECT "id", "userId", "type", "recurring_type", "date", "end_date", "amount" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "type" varchar NOT NULL, "recurring_type" varchar NOT NULL, "date" varchar NOT NULL, "end_date" varchar NOT NULL, "amount" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "userId", "type", "recurring_type", "date", "end_date", "amount") SELECT "id", "userId", "type", "recurring_type", "date", "end_date", "amount" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "type" varchar NOT NULL, "recurring_type" varchar NOT NULL, "date" varchar NOT NULL, "end_date" varchar NOT NULL, "amount" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "user_id", "type", "recurring_type", "date", "end_date", "amount") SELECT "id", "userId", "type", "recurring_type", "date", "end_date", "amount" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
    }

}
