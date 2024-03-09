/*
  Warnings:

  - You are about to drop the `DriverUtilizations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DriverUtilizations";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AutomobileUtilizations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "automobileId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AutomobileUtilizations_automobileId_fkey" FOREIGN KEY ("automobileId") REFERENCES "Automobiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AutomobileUtilizations_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Drivers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
