/**
*	Drop all tables in database
*	!! Alert !! this query will remove all your data
*/

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE if EXISTS 
admin,
apply_visit,
bulletion_board,
dormitory,
equipment,
guest,
housemaster,
housemaster_chat,
maintainer,
non_resident_student,
residentApplication,
resident_student,
room,
student,
student_chat,
users,
violation_record;

SET FOREIGN_KEY_CHECKS = 1;
