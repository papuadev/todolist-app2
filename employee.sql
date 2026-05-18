CREATE TABLE tb_departments (
    department_id VARCHAR(10) PRIMARY KEY,
    department_name VARCHAR(100)
);

INSERT INTO tb_departments VALUES ('D001', 'IT'), ('D002', 'HR');

CREATE TABLE tb_positions (
    position_id VARCHAR(10) PRIMARY KEY,
    position_name VARCHAR(100),
    base_salary INT
);

INSERT INTO
    tb_positions
VALUES (
        'P001',
        'Backend Developer',
        8000000
    ),
    ('P002', 'HR Staff', 6000000);

CREATE TABLE tb_employee (
    employee_id VARCHAR(10) PRIMARY KEY,
    employee_name VARCHAR(100),
    contact VARCHAR(20),
    status VARCHAR(50),
    department_id VARCHAR(10),
    position_id VARCHAR(10),
    FOREIGN KEY (department_id) REFERENCES tb_departments (department_id),
    FOREIGN KEY (position_id) REFERENCES tb_positions (position_id)
);

INSERT INTO
    tb_employee
VALUES (
        'E001',
        'Budi',
        '81234',
        'Active',
        'D001',
        'P001'
    ),
    (
        'E002',
        'Sinta',
        '82345',
        'Active',
        'D002',
        'P002'
    );

CREATE TABLE tb_attendances (
    attendance_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10),
    attendance_date DATE,
    check_in TIME,
    check_out TIME,
    FOREIGN KEY (employee_id) REFERENCES tb_employee (employee_id)
);

INSERT INTO
    tb_attendances
VALUES (
        'A001',
        'E001',
        '2026-05-18',
        '08:00:00',
        '17:00:00'
    ),
    (
        'A002',
        'E002',
        '2026-05-18',
        '08:10:00',
        '17:00:00'
    );

CREATE TABLE tb_leave_requests (
    leave_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10),
    leave_type VARCHAR(100),
    leave_start DATE,
    leave_end DATE,
    leave_status VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES tb_employee (employee_id)
);

INSERT INTO
    tb_leave_requests
VALUES (
        'L001',
        'E001',
        'Annual Leave',
        '2026-05-20',
        '2026-05-22',
        'Approved'
    ),
    (
        'L002',
        'E002',
        'Sick Leave',
        '2026-05-25',
        '2026-05-26',
        'Pending'
    );

CREATE TABLE tb_leave_balances (
    balance_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10),
    total_leave INT,
    used_leave INT,
    remaining_leave INT,
    FOREIGN KEY (employee_id) REFERENCES tb_employee (employee_id)
);

INSERT INTO
    tb_leave_balances
VALUES ('LB001', 'E001', 12, 2, 10),
    ('LB002', 'E002', 12, 4, 8);

CREATE TABLE tb_payrolls (
    payroll_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10),
    payment_period VARCHAR(20),
    bonus INT,
    deduction INT,
    total_salary INT,
    FOREIGN KEY (employee_id) REFERENCES tb_employee (employee_id)
);

INSERT INTO
    tb_payrolls
VALUES (
        'PR001',
        'E001',
        'May-26',
        1000000,
        200000,
        8800000
    ),
    (
        'PR002',
        'E002',
        'May-26',
        500000,
        100000,
        6400000
    );

CREATE TABLE tb_performances (
    review_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10),
    review_date DATE,
    performance_score INT,
    feedback VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES tb_employee (employee_id)
);

INSERT INTO
    tb_performances
VALUES (
        'RV001',
        'E001',
        '2026-05-30',
        90,
        'Good Performance'
    ),
    (
        'RV002',
        'E002',
        '2026-05-30',
        85,
        'Good Teamwork'
    );

CREATE TABLE tb_projects (
    project_id VARCHAR(10) PRIMARY KEY,
    project_name VARCHAR(100)
);

INSERT INTO
    tb_projects
VALUES ('PJ001', 'ERP System'),
    ('PJ002', 'Recruitment App');

CREATE TABLE tb_project_assignments (
    assignment_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10),
    project_id VARCHAR(10),
    project_role VARCHAR(100),
    FOREIGN KEY (employee_id) REFERENCES tb_employee (employee_id),
    FOREIGN KEY (project_id) REFERENCES tb_projects (project_id)
);

INSERT INTO
    tb_project_assignments
VALUES (
        'PA001',
        'E001',
        'PJ001',
        'Backend Developer'
    ),
    (
        'PA002',
        'E002',
        'PJ002',
        'Coordinator'
    );