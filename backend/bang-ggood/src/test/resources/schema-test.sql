-- Drop tables if they exist
DROP TABLE IF EXISTS checklist CASCADE;
DROP TABLE IF EXISTS checklist_option CASCADE;
DROP TABLE IF EXISTS checklist_question CASCADE;
DROP TABLE IF EXISTS checklist_maintenance CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS test_entity CASCADE;
DROP TABLE IF EXISTS custom_checklist_question CASCADE;
DROP TABLE IF EXISTS checklist_like CASCADE;
DROP TABLE IF EXISTS article CASCADE;

-- Create tables
CREATE TABLE room
(
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255),
    address       VARCHAR(255),
    building_name VARCHAR(255),
    station       VARCHAR(255),
    walking_time  INTEGER,
    floor_level   VARCHAR(255),
    floor         INTEGER,
    structure     VARCHAR(255),
    size DOUBLE,
    created_at    TIMESTAMP(6),
    modified_at   TIMESTAMP(6),
    deleted       BOOLEAN
);

CREATE TABLE users
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255),
    email       VARCHAR(255) NOT NULL,
    type        VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP(6),
    modified_at TIMESTAMP(6),
    deleted     BOOLEAN
);

CREATE TABLE checklist
(
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id          BIGINT NOT NULL UNIQUE,
    user_id          BIGINT NOT NULL,
    deposit          INTEGER,
    rent             INTEGER,
    maintenance_fee  INTEGER,
    contract_term    INTEGER,
    occupancy_month  VARCHAR(255),
    occupancy_period VARCHAR(255),
    real_estate      VARCHAR(255),
    memo             VARCHAR(1000),
    summary          VARCHAR(255),
    created_at       TIMESTAMP(6),
    modified_at      TIMESTAMP(6),
    deleted          BOOLEAN,
    FOREIGN KEY (room_id) REFERENCES room (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE checklist_maintenance
(
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    checklist_id     BIGINT,
    maintenance_item VARCHAR(255),
    created_at       TIMESTAMP(6),
    modified_at      TIMESTAMP(6),
    deleted          BOOLEAN,
    FOREIGN KEY (checklist_id) REFERENCES checklist (id)
);

CREATE TABLE checklist_question
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    question     VARCHAR(255) NOT NULL,
    checklist_id BIGINT       NOT NULL,
    answer       VARCHAR(255),
    created_at   TIMESTAMP(6),
    modified_at  TIMESTAMP(6),
    deleted      BOOLEAN,
    FOREIGN KEY (checklist_id) REFERENCES checklist (id)
);

CREATE TABLE checklist_option
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    option_id    INTEGER NOT NULL,
    checklist_id BIGINT  NOT NULL,
    created_at   TIMESTAMP(6),
    modified_at  TIMESTAMP(6),
    deleted      BOOLEAN,
    FOREIGN KEY (checklist_id) REFERENCES checklist (id)
);

CREATE TABLE custom_checklist_question
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT,
    question    VARCHAR(255),
    created_at  TIMESTAMP(6),
    modified_at TIMESTAMP(6),
    deleted     BOOLEAN,
    FOREIGN KEY (user_id) references users (id)
);

CREATE TABLE test_entity
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        varchar(255) not null,
    created_at  TIMESTAMP    not null,
    modified_at TIMESTAMP    not null,
    deleted     BOOLEAN,
    primary key (id)
);

CREATE TABLE checklist_like
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    checklist_id BIGINT,
    created_at   TIMESTAMP(6),
    modified_at  TIMESTAMP(6),
    deleted      BOOLEAN,
    FOREIGN KEY (checklist_id) REFERENCES checklist (id)
);

CREATE TABLE article
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255),
    content     TEXT,
    keyword     VARCHAR(255),
    summary     VARCHAR(255),
    thumbnail   VARCHAR(2500),
    created_at  TIMESTAMP(6),
    modified_at TIMESTAMP(6),
    deleted     BOOLEAN
);
