
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
	id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  	email VARCHAR(128) UNIQUE,
  	name VARCHAR(256),
  	password VARCHAR(128),
    isadm BOOLEAN,
    createdOn VARCHAR(50),
    updatedOn VARCHAR(50)
);
