/*
  Warnings:

  - You are about to drop the column `automobileId` on the `Drivers` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Drivers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Drivers" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Drivers";
DROP TABLE "Drivers";
ALTER TABLE "new_Drivers" RENAME TO "Drivers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
