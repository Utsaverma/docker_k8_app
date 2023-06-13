docker run --name utsav-mysql-container -e MYSQL_ROOT_PASSWORD=Utsav@123 -d mysql
docker exec -it utsav-mysql-container bash

CREATE DATABASE DevopsAssignment;

Use DevopsAssignment;

CREATE TABLE APPUSER (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);


INSERT INTO APPUSER (name) VALUES ('Utsav Verma');
INSERT INTO APPUSER (name) VALUES ('Saksham  Gupta');
INSERT INTO APPUSER (name) VALUES ('Gaganjot Singh');
INSERT INTO APPUSER (name) VALUES ('Nikita Mishra');
INSERT INTO APPUSER (name) VALUES ('Somya Jain');
INSERT INTO APPUSER (name) VALUES ('Rakesh Sharma');
INSERT INTO APPUSER (name) VALUES ('Shubham Sharma');
INSERT INTO APPUSER (name) VALUES ('Shubhanshu Singh');
INSERT INTO APPUSER (name) VALUES ('Mohan Yadav');
INSERT INTO APPUSER (name) VALUES ('Surendra Singh');
INSERT INTO APPUSER (name) VALUES ('Disha Dhingra');


commit;


mysqldump -u root -p DevopsAssignment > UtsavMySQL.sql




docker build -t utsav-mysql-container .
docker login
docker tag utsav-mysql-container utsavaishuverma/utsav-mysql-image:1
docker push utsavaishuverma/utsav-mysql-image:1



docker run  --name utsav-mysql-container -e MYSQL_ROOT_PASSWORD=Utsav@123 -p 3306:3306 -d utsavaishuverma/utsav-mysql-image:1

------------------------------


docker build -t utsav-node-app:1 .

docker tag utsav-node-app-container utsavaishuverma/utsav-node-image

docker run -d -p 80:3000 utsav-node-app:1

