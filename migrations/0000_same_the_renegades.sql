CREATE TABLE "password" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "password_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"site" varchar(300) NOT NULL,
	"user" varchar(200) NOT NULL,
	"password" varchar(500) NOT NULL
);
