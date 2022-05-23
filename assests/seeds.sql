INSERT INTO department (name)
VALUES 
('Sales'),
('Engineer'),
('Finance'),
('Legal'),
('Management');


INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 50000, 1),
('Software Engineer', 95000, 2),
('Accountant', 110000, 3),
('Lawyer', 135000, 4),
('Manager', 160000, 5);


INSERT INTO employees (first_name, last_name, id, manager_id, role_id)
VALUES
('Bryson','Kern', 1, NULL, 5),
('Eric','Reyes', 2, NULL, 5),
('Jake','Smith', 3, NULL, 5),
('Cayla','Montry', 4, 2, 1),
('Duke','Tomb', 5, 2, 4),
('Alexa','Marks', 6, 1, 1),
('Katie','Builder', 7, 3, 2),
('Diasey','Holcomb', 8, 1, 3),
('Matt','Schump', 9, 2, 1);