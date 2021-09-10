CREATE DATABASE greetings;

CREATE TABLE people (
    people_id SERIAL PRIMARY KEY,
    names TEXT not null,
    conter INT not null,
    english INT not null,
    sesotho INT not null,
    isixhosa INT not null
);

