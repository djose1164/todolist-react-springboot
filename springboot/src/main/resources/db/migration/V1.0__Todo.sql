create table todo(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    description VARCHAR(300),
    done BOOLEAN
);