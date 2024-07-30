-- Drop tables if they exist
DROP TABLE IF EXISTS checklist CASCADE;
DROP TABLE IF EXISTS checklist_option CASCADE;
DROP TABLE IF EXISTS checklist_question CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS test_entity CASCADE;

-- Create tables
CREATE TABLE room
(
    id           BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    floor        INTEGER,
    walking_time INTEGER,
    created_at   TIMESTAMP(6),
    modified_at  TIMESTAMP(6),
    address      VARCHAR(255),
    name         VARCHAR(255),
    station      VARCHAR(255)
);

CREATE TABLE users
(
    id          BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP(6),
    modified_at TIMESTAMP(6)
);

CREATE TABLE checklist
(
    id            BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    contract_term INTEGER,
    deposit       INTEGER,
    rent          INTEGER,
    created_at    TIMESTAMP(6),
    modified_at   TIMESTAMP(6),
    room_id       BIGINT NOT NULL UNIQUE,
    user_id       BIGINT NOT NULL,
    real_estate   VARCHAR(255),
    FOREIGN KEY (room_id) REFERENCES room (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE checklist_option
(
    id           BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    option_id    INTEGER NOT NULL,
    checklist_id BIGINT  NOT NULL,
    created_at   TIMESTAMP(6),
    modified_at  TIMESTAMP(6),
    FOREIGN KEY (checklist_id) REFERENCES checklist (id)
);

CREATE TABLE checklist_question
(
    id           BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    question  VARCHAR(255) NOT NULL,
    checklist_id BIGINT  NOT NULL,
    created_at   TIMESTAMP(6),
    modified_at  TIMESTAMP(6),
    grade       VARCHAR(255),
    FOREIGN KEY (checklist_id) REFERENCES checklist (id)
);

CREATE TABLE if not exists category_priority
(
    id  bigint  generated by default as identity,
    category_id INTEGER not null,
    user_id bigint not null,
    created_at TIMESTAMP not null,
    modified_at TIMESTAMP not null,
    primary key (id),
    foreign key (user_id) references users
);


CREATE TABLE test_entity
(
    id bigint  generated by default as identity,
    name varchar(255) not null,
    created_at TIMESTAMP not null,
    modified_at TIMESTAMP not null,
    primary key (id)
);
