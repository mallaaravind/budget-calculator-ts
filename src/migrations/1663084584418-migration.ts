import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1663084584418 implements MigrationInterface {
    name = 'migration1663084584418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dob" varchar NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "dob") SELECT "id", "dob" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dob" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "dob") SELECT "id", "dob" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
