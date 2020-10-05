CREATE TABLE lists (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL
);