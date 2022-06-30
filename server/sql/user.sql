
create table users 
(
    id serial not null primary key,
    username text not null,
    password text not null,
    active boolean default true
);


create table user_movies 
(
    id serial not null primary key,
    user_id int not null,
    movie_id int not null,
    foreign key (user_id) references users(id)
);
