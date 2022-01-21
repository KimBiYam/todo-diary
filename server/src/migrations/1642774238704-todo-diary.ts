import { MigrationInterface, QueryRunner } from 'typeorm';

export class todoDiary1642774238704 implements MigrationInterface {
  name = 'todoDiary1642774238704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER DATABASE todo_diary DEFAULT CHARACTER SET='utf8' COLLATE='utf8_general_ci'",
    );
    await queryRunner.query(
      'CREATE TABLE `diary_meta` (`id` bigint NOT NULL AUTO_INCREMENT, `content` varchar(5000) NOT NULL, `diary_id` bigint NULL, UNIQUE INDEX `REL_df831d3fb38b389b49c67be741` (`diary_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `diary` (`id` bigint NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `is_finished` tinyint NOT NULL DEFAULT 0, `user_id` bigint NOT NULL, INDEX `IDX_ea6a2b034e04736dc5a79ef075` (`title`), INDEX `IDX_11d15a1668bfb1a1524c7b1035` (`created_at`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` bigint NOT NULL AUTO_INCREMENT, `username` varchar(100) NULL, `email` varchar(100) NULL, `display_name` varchar(64) NOT NULL, `photo_url` varchar(500) NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `is_certified` tinyint NOT NULL DEFAULT 0, INDEX `IDX_d091f1d36f18bbece2a9eabc6e` (`created_at`), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `social_account` (`id` bigint NOT NULL AUTO_INCREMENT, `social_id` varchar(255) NOT NULL, `provider` varchar(20) NOT NULL, `user_id` bigint NULL, INDEX `IDX_dc89592d6165c79bbc6941be71` (`social_id`), INDEX `IDX_d5488b2d3463b86dd2f3c537c6` (`provider`), UNIQUE INDEX `REL_365d4084b1feb693468d624841` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `diary_meta` ADD CONSTRAINT `FK_df831d3fb38b389b49c67be7411` FOREIGN KEY (`diary_id`) REFERENCES `diary`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `diary` ADD CONSTRAINT `FK_330f20310184a92a90225c36cbe` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `social_account` ADD CONSTRAINT `FK_365d4084b1feb693468d6248411` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `diary_meta` CONVERT TO CHARACTER SET utf8',
    );
    await queryRunner.query(
      'ALTER TABLE `diary` convert to character set utf8',
    );
    await queryRunner.query('ALTER TABLE `user` convert to character set utf8');
    await queryRunner.query(
      'ALTER TABLE `social_account` convert to character set utf8',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `social_account` DROP FOREIGN KEY `FK_365d4084b1feb693468d6248411`',
    );
    await queryRunner.query(
      'ALTER TABLE `diary` DROP FOREIGN KEY `FK_330f20310184a92a90225c36cbe`',
    );
    await queryRunner.query(
      'ALTER TABLE `diary_meta` DROP FOREIGN KEY `FK_df831d3fb38b389b49c67be7411`',
    );
    await queryRunner.query(
      'DROP INDEX `REL_365d4084b1feb693468d624841` ON `social_account`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_d5488b2d3463b86dd2f3c537c6` ON `social_account`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_dc89592d6165c79bbc6941be71` ON `social_account`',
    );
    await queryRunner.query('DROP TABLE `social_account`');
    await queryRunner.query(
      'DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_d091f1d36f18bbece2a9eabc6e` ON `user`',
    );
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query(
      'DROP INDEX `IDX_11d15a1668bfb1a1524c7b1035` ON `diary`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_ea6a2b034e04736dc5a79ef075` ON `diary`',
    );
    await queryRunner.query('DROP TABLE `diary`');
    await queryRunner.query(
      'DROP INDEX `REL_df831d3fb38b389b49c67be741` ON `diary_meta`',
    );
    await queryRunner.query('DROP TABLE `diary_meta`');
  }
}
