show databases;

create database cookie_recipe;

use cookie_recipe;

show tables;

--------------------------------------------------------------------------------

CREATE TABLE users (user_id BIGINT(8) NOT NULL AUTO_INCREMENT, 
                    first_name VARCHAR(20) NOT NULL, middle_name VARCHAR(20), last_name VARCHAR(20),suffix VARCHAR(5),dob DATE,
                    user_name VARCHAR(20) NOT NULL,password VARCHAR(255) NOT NULL,email VARCHAR(35) NOT NULL,address1 VARCHAR(50),address2 VARCHAR(50),address3 VARCHAR(50),phone VARCHAR(25),
                    PRIMARY KEY ( user_id ));
                    
-- drop table users;
                    
describe users;

select * from users;

INSERT INTO users (first_name, middle_name, last_name,suffix,dob,user_name,password,email,address1,address2,address3,phone ) 
            VALUES('abc','def','ghi','San', STR_TO_DATE('1-01-2020', '%d-%m-%Y'),'xyz',password('pass'),'abc@xyz','add1','add2','addd3','123456789');
INSERT INTO users (first_name, middle_name, last_name,suffix,dob,user_name,password,email,address1,address2,address3,phone ) 
            VALUES('abc','def','ghi','San', STR_TO_DATE('1-01-2020', '%d-%m-%Y'),'xyz',MD5('pass'),'abc@xyz','add1','add2','addd3','123456789');

-- delete from users; -- where user_id = ;

select * from users;

update users set first_name = 'new fn', last_name = 'new ln',user_name = 'new un',email = 'new email' where user_id = 10;

--------------------------------------------------------------------------------

Create Table recipes ( recipe_id BIGINT(8) NOT NULL AUTO_INCREMENT,user_id BIGINT(8),post_date timestamp, recipe_name VARCHAR(50) not null, recipe_desc text not null,
                    PRIMARY KEY ( recipe_id ), FOREIGN KEY (user_id) REFERENCES users(user_id));
                    
describe recipes;

select * from recipes;
        
insert into recipes (user_id,recipe_name,recipe_desc)
            values('8','tron', 'dfhsdifisdjf sdfishdis fbsjidfsd sdfjhsdifh isdhf');

insert into recipes (user_id,recipe_name,recipe_desc)
            values('8','dfsd','qwewetertru fsd sdfjhsdifh isdhf');


drop table recipes;
--------------------------------------------------------------------------------

create table ratings(rating_id BIGINT(8) NOT NULL AUTO_INCREMENT, user_id BIGINT(8),recipe_id BIGINT(8),rating varchar(20),
                    PRIMARY KEY ( rating_id ), FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id));
  
select * from ratings;

insert into ratings values (1,8,7,"like");      
insert into ratings values (2,9,7,"like");      
insert into ratings values (3,10,7,"dislike");      
-- insert into ratings values (1,8,7,"like");      

select count(rating_id) as rating  from ratings where recipe_id = 7 and rating = 'like';
select count(rating_id)  from ratings where recipe_id = 7 and rating = 'dislike';


--------------------------------------------------------------------------------

create table loginfo(loginfo_id BIGINT(8) NOT NULL AUTO_INCREMENT, user_id BIGINT(8) ,logtime timestamp,
                    PRIMARY KEY ( loginfo_id ), FOREIGN KEY (user_id) REFERENCES users(user_id));
                    
select * from loginfo;

-- delete from loginfo;

Describe Loginfo;

show columns from loginfo;

insert into loginfo (user_id)
            values (8);
            
select * from loginfo where user_id = 8 order by loginfo_id desc;

--------------------------------------------------------------------------------

Create table comments (comment_id BIGINT(8)  NOT NULL AUTO_INCREMENT,user_id BIGINT(8), recipe_id BIGINT(8),comment text,
                        PRIMARY KEY ( comment_id ), FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id));
                        
drop table comments;

                    
-- need tables
    -- recipes -> recipe_id(pk),user_id(fk),post_date, recipe_name, recipe_desc, 
    -- comments -> comment_id(pk),user_id(fk), recipe_id(fk),comment
    -- ratings  ->rating_id(pk), user_id(fk), recipe_id(fk), rating_value
    -- logInfo -> loginfo_id(pk), user_id(fk), timestamp
    
    