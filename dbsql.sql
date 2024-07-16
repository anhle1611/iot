/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : PostgreSQL
 Source Server Version : 140010 (140010)
 Source Host           : localhost:5432
 Source Catalog        : iot
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140010 (140010)
 File Encoding         : 65001

 Date: 16/07/2024 23:25:53
*/


-- ----------------------------
-- Sequence structure for McuLogs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."McuLogs_id_seq";
CREATE SEQUENCE "public"."McuLogs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for McuSettings_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."McuSettings_id_seq";
CREATE SEQUENCE "public"."McuSettings_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Mcus_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Mcus_id_seq";
CREATE SEQUENCE "public"."Mcus_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Roles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Roles_id_seq";
CREATE SEQUENCE "public"."Roles_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for RoomLogs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."RoomLogs_id_seq";
CREATE SEQUENCE "public"."RoomLogs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Rooms_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Rooms_id_seq";
CREATE SEQUENCE "public"."Rooms_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Users_id_seq";
CREATE SEQUENCE "public"."Users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for McuLogs
-- ----------------------------
DROP TABLE IF EXISTS "public"."McuLogs";
CREATE TABLE "public"."McuLogs" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "mcuId" int4 NOT NULL,
  "data" json,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamp(6)
)
;

-- ----------------------------
-- Records of McuLogs
-- ----------------------------

-- ----------------------------
-- Table structure for McuSettings
-- ----------------------------
DROP TABLE IF EXISTS "public"."McuSettings";
CREATE TABLE "public"."McuSettings" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "mcuId" int4 NOT NULL,
  "status" int4,
  "configs" json,
  "createdAt" timestamp(6) DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamp(6) NOT NULL
)
;

-- ----------------------------
-- Records of McuSettings
-- ----------------------------

-- ----------------------------
-- Table structure for Mcus
-- ----------------------------
DROP TABLE IF EXISTS "public"."Mcus";
CREATE TABLE "public"."Mcus" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "roomId" int4 NOT NULL,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamp(6),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "status" int4
)
;

-- ----------------------------
-- Records of Mcus
-- ----------------------------

-- ----------------------------
-- Table structure for Roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."Roles";
CREATE TABLE "public"."Roles" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "status" int4,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamp(6),
  "code" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of Roles
-- ----------------------------
INSERT INTO "public"."Roles" OVERRIDING SYSTEM VALUE VALUES (1, 1, '2024-07-15 16:50:39.820497', '2024-07-15 16:50:39.820497', NULL, 'ADMIN');
INSERT INTO "public"."Roles" OVERRIDING SYSTEM VALUE VALUES (2, 1, '2024-07-15 16:50:56.242374', '2024-07-15 16:50:56.242374', NULL, 'USER');

-- ----------------------------
-- Table structure for RoomLogs
-- ----------------------------
DROP TABLE IF EXISTS "public"."RoomLogs";
CREATE TABLE "public"."RoomLogs" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "roomId" int4 NOT NULL,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "message" json,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamp(6)
)
;

-- ----------------------------
-- Records of RoomLogs
-- ----------------------------

-- ----------------------------
-- Table structure for Rooms
-- ----------------------------
DROP TABLE IF EXISTS "public"."Rooms";
CREATE TABLE "public"."Rooms" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamp(6),
  "code" varchar(255) COLLATE "pg_catalog"."default",
  "status" int4
)
;

-- ----------------------------
-- Records of Rooms
-- ----------------------------
INSERT INTO "public"."Rooms" OVERRIDING SYSTEM VALUE VALUES (1, '2024-07-15 16:53:58.178', '2024-07-15 16:53:58.178', NULL, 'ROOM_dbe578eb-4bbf-4725-86f4-ed20724afeaa', 1);

-- ----------------------------
-- Table structure for User_Roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."User_Roles";
CREATE TABLE "public"."User_Roles" (
  "userId" int4 NOT NULL,
  "roleId" int4 NOT NULL,
  "status" int4 NOT NULL DEFAULT 1,
  "createdAt" timestamptz(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamptz(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamptz(6)
)
;

-- ----------------------------
-- Records of User_Roles
-- ----------------------------
INSERT INTO "public"."User_Roles" VALUES (1, 1, 1, '2024-07-15 16:54:12.378741+07', '2024-07-15 16:54:12.378741+07', NULL);
INSERT INTO "public"."User_Roles" VALUES (2, 2, 1, '2024-07-15 16:54:15.780081+07', '2024-07-15 16:54:15.780081+07', NULL);

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS "public"."Users";
CREATE TABLE "public"."Users" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(1000) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "status" int4,
  "roomId" int4,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamp(6)
)
;

-- ----------------------------
-- Records of Users
-- ----------------------------
INSERT INTO "public"."Users" OVERRIDING SYSTEM VALUE VALUES (1, 'admin', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'admin', 1, NULL, '2024-07-15 16:53:03.031259', '2024-07-15 16:53:03.031259', NULL);
INSERT INTO "public"."Users" OVERRIDING SYSTEM VALUE VALUES (3, 'test1111', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', NULL, 1, 1, '2024-07-15 16:56:23.752', '2024-07-15 16:56:23.752', NULL);
INSERT INTO "public"."Users" OVERRIDING SYSTEM VALUE VALUES (4, 'test2222', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', NULL, 1, 1, '2024-07-15 16:56:39.915', '2024-07-15 16:56:39.915', NULL);
INSERT INTO "public"."Users" OVERRIDING SYSTEM VALUE VALUES (5, 'test3333', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', NULL, 1, 1, '2024-07-15 16:56:47.642', '2024-07-15 16:56:47.642', NULL);
INSERT INTO "public"."Users" OVERRIDING SYSTEM VALUE VALUES (2, 'test', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'test', 1, 1, '2024-07-15 16:53:13.312943', '2024-07-15 16:53:13.312943', NULL);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."McuLogs_id_seq"
OWNED BY "public"."McuLogs"."id";
SELECT setval('"public"."McuLogs_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."McuSettings_id_seq"
OWNED BY "public"."McuSettings"."id";
SELECT setval('"public"."McuSettings_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Mcus_id_seq"
OWNED BY "public"."Mcus"."id";
SELECT setval('"public"."Mcus_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Roles_id_seq"
OWNED BY "public"."Roles"."id";
SELECT setval('"public"."Roles_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."RoomLogs_id_seq"
OWNED BY "public"."RoomLogs"."id";
SELECT setval('"public"."RoomLogs_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Rooms_id_seq"
OWNED BY "public"."Rooms"."id";
SELECT setval('"public"."Rooms_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Users_id_seq"
OWNED BY "public"."Users"."id";
SELECT setval('"public"."Users_id_seq"', 5, true);

-- ----------------------------
-- Auto increment value for McuLogs
-- ----------------------------
SELECT setval('"public"."McuLogs_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table McuLogs
-- ----------------------------
ALTER TABLE "public"."McuLogs" ADD CONSTRAINT "McuSettings_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for McuSettings
-- ----------------------------
SELECT setval('"public"."McuSettings_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table McuSettings
-- ----------------------------
ALTER TABLE "public"."McuSettings" ADD CONSTRAINT "Mcus_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for Mcus
-- ----------------------------
SELECT setval('"public"."Mcus_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table Mcus
-- ----------------------------
ALTER TABLE "public"."Mcus" ADD CONSTRAINT "RoomLogs_copy1_pkey1" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for Roles
-- ----------------------------
SELECT setval('"public"."Roles_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table Roles
-- ----------------------------
ALTER TABLE "public"."Roles" ADD CONSTRAINT "Users_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for RoomLogs
-- ----------------------------
SELECT setval('"public"."RoomLogs_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table RoomLogs
-- ----------------------------
ALTER TABLE "public"."RoomLogs" ADD CONSTRAINT "RoomLogs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for Rooms
-- ----------------------------
SELECT setval('"public"."Rooms_id_seq"', 1, true);

-- ----------------------------
-- Primary Key structure for table Rooms
-- ----------------------------
ALTER TABLE "public"."Rooms" ADD CONSTRAINT "RoomLogs_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for Users
-- ----------------------------
SELECT setval('"public"."Users_id_seq"', 5, true);

-- ----------------------------
-- Primary Key structure for table Users
-- ----------------------------
ALTER TABLE "public"."Users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
