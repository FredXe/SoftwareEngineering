use softwareEngineering;

CREATE TABLE IF NOT EXISTS users
(
  user_ID char(8) NOT NULL,
  user_name VARCHAR(30) NOT NULL,
  `role` VARCHAR(30) NOT NULL,
  sex INT NOT NULL,
  `password` char(60) NOT NULL,
  email varchar(50) NOT NULL DEFAULT 'default@example.host',
  eroll_year YEAR NOT NULL,
  phnumber char(10) NOT NULL,
  PRIMARY KEY (user_ID)
);

CREATE TABLE IF NOT EXISTS admin
(
  user_ID char(8) NOT NULL,
  PRIMARY KEY (user_ID),
  FOREIGN KEY (user_ID) REFERENCES users(user_ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS housemaster
(
  user_ID char(8) NOT NULL,
  PRIMARY KEY (user_ID),
  FOREIGN KEY (user_ID) REFERENCES users(user_ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS maintainer
(
  user_ID char(8) NOT NULL,
  PRIMARY KEY (user_ID),
  FOREIGN KEY (user_ID) REFERENCES users(user_ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dormitory
(
  dorm_name CHAR(30) NOT NULL,
  dorm_volume INT UNSIGNED NOT NULL,
  housemaster_ID char(8) NOT NULL,
  PRIMARY KEY (dorm_name),
  FOREIGN KEY (housemaster_ID) REFERENCES housemaster(user_ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS room
(
  r_number INT UNSIGNED NOT NULL AUTO_INCREMENT,
  r_volume INT NOT NULL,
  r_cost INT NOT NULL,
  dorm_name CHAR(30) NOT NULL,
  PRIMARY KEY (r_number, dorm_name),
  FOREIGN KEY (dorm_name) REFERENCES dormitory(dorm_name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS student
(
  user_ID CHAR(8) NOT NULL,
  PRIMARY KEY (user_ID),
  FOREIGN KEY (user_ID) REFERENCES users(user_ID)
);

CREATE TABLE IF NOT EXISTS non_resident_student
(
  user_ID CHAR(8) NOT NULL,
  PRIMARY KEY (user_ID),
  FOREIGN KEY (user_ID) REFERENCES student(user_ID)
);

CREATE TABLE IF NOT EXISTS resident_student
(
  user_ID CHAR(8) NOT NULL,
  r_number INT UNSIGNED NOT NULL,
  dorm_name CHAR(30) NOT NULL,
  PRIMARY KEY (user_ID),
  FOREIGN KEY (user_ID) REFERENCES student(user_ID),
  FOREIGN KEY (r_number, dorm_name) REFERENCES room(r_number, dorm_name)
);

CREATE TABLE IF NOT EXISTS residentApplication
(
  rA_ID INT NOT NULL AUTO_INCREMENT,
  rA_semester DATE NOT NULL,
  dorm_name CHAR(30) NOT NULL,
  rA_approve INT NOT NULL,
  rA_fee INT NOT NULL,
  student_ID CHAR(8) NOT NULL,
  PRIMARY KEY (rA_ID),
  FOREIGN KEY (dorm_name) REFERENCES dormitory(dorm_name) ON DELETE CASCADE,
  FOREIGN KEY (student_ID) REFERENCES student(user_ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bulletion_board
(
  bb_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  bb_title VARCHAR(128) NOT NULL,
  bb_text VARCHAR(2000) NOT NULL,
  release_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  housemaster_ID CHAR(8) NOT NULL,
  PRIMARY KEY (bb_ID),
  FOREIGN KEY (housemaster_ID) REFERENCES housemaster(user_ID)
);

CREATE TABLE IF NOT EXISTS guest
(
  guest_ID char(8) NOT NULL,
  PRIMARY KEY (guest_ID)
);


CREATE TABLE IF NOT EXISTS equipment
(
  e_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  e_type CHAR(30) NOT NULL,
  e_condition INT NOT NULL, /* value if == 1 : 設備狀態良好 , 0 : 設備狀態需要維修*/
  r_number INT UNSIGNED NOT NULL,
  dorm_name CHAR(30) NOT NULL,
  PRIMARY KEY (e_ID),
  FOREIGN KEY (r_number, dorm_name) REFERENCES room(r_number, dorm_name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comment
(
  comment_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  content VARCHAR(256) NOT NULL,
  mes_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  bb_ID INT UNSIGNED NOT NULL,
  user_ID char(8) NOT NULL,
  PRIMARY KEY (comment_ID, bb_ID),
  FOREIGN KEY (bb_ID) REFERENCES bulletion_board(bb_ID) ON DELETE CASCADE,
  FOREIGN KEY (user_ID) REFERENCES users(user_ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS violation_record
(
  vr_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  vr_date DATE NOT NULL DEFAULT (CURRENT_DATE),
  vr_type VARCHAR(30) NOT NULL,
  resident_ID CHAR(8) NOT NULL,
  housemaster_ID CHAR(8) NOT NULL,
  PRIMARY KEY (vr_ID, resident_ID),
  FOREIGN KEY (resident_ID) REFERENCES resident_student(user_ID) ON DELETE CASCADE,
  FOREIGN KEY (housemaster_ID) REFERENCES housemaster(user_ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS apply_visit
(
  guest_ID char(8) NOT NULL,
  dorm_name CHAR(30) NOT NULL,
  visit_date DATE NOT NULL,
  visit_approve INT NOT NULL DEFAULT (0),
  PRIMARY KEY (guest_ID, dorm_name),
  FOREIGN KEY (guest_ID) REFERENCES guest(guest_ID) ON DELETE CASCADE,
  FOREIGN KEY (dorm_name) REFERENCES dormitory(dorm_name) ON DELETE CASCADE
);