CREATE TABLE project_images (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    image TEXT NOT NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE
);