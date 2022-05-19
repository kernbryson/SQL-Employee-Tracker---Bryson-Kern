INSERT INTO role (title, salary)
VALUES ('Salesperson', 50000),
('Software Engineer', 95000),
('Accountant', 110000),
('Lawyer', 135000);

INSERT INTO department (name)
VALUES 
('Sales'),
('Engineer'),
('Finance'),
('Legal'),
('Manager');
INSERT INTO employees (first_name, last_name, id, manager_id)
VALUES
('Bryson','Kern', 1, NULL),
('Eric','Reyes', 2, NULL),
('Jake','Smith', 3, NULL),
('Cayla','Montry', 4, 2),
('Duke','Tomb', 5, NULL),
('Alexa','Marks', 6, 6),
('Katie','Builder', 7, NULL),
('Diasey','Holcomb', 8, NULL),
('Matt','Schump', 9, 5);

