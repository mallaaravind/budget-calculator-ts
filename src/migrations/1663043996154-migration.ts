import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1663043996154 implements MigrationInterface {
    name = 'migration1663043996154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "type" varchar NOT NULL, "recurring_type" varchar NOT NULL, "date" varchar NOT NULL, "end_date" varchar NOT NULL, "amount" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dob" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
