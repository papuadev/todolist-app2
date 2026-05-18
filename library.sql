CREATE TABLE tb_members (
    member_id VARCHAR(10) PRIMARY KEY,
    nama_member VARCHAR(100),
    email VARCHAR(100)
);

INSERT INTO
    tb_members
VALUES (
        'M001',
        'Budi',
        'budi@gmail.com'
    ),
    (
        'M002',
        'Sinta',
        'sinta@gmail.com'
    );

CREATE TABLE tb_staffs (
    staff_id VARCHAR(10) PRIMARY KEY,
    staff_name VARCHAR(100),
    schedule_staff VARCHAR(50)
);

INSERT INTO
    tb_staffs
VALUES ('S001', 'Andi', 'Morning'),
    ('S002', 'Rina', 'Evening');

CREATE TABLE tb_branches (
    branch_id VARCHAR(10) PRIMARY KEY,
    branch_name VARCHAR(100),
    address VARCHAR(255)
);

INSERT INTO
    tb_branches
VALUES (
        'B001',
        'Timika Branch',
        'Jl. Yos Sudarso'
    );

CREATE TABLE tb_categories (
    category_id VARCHAR(10) PRIMARY KEY,
    category_name VARCHAR(100)
);

INSERT INTO
    tb_categories
VALUES ('C001', 'Novel'),
    ('C002', 'Manga');

CREATE TABLE tb_books (
    book_id VARCHAR(10) PRIMARY KEY,
    nama_buku VARCHAR(150),
    author VARCHAR(100),
    category_id VARCHAR(10),
    branch_id VARCHAR(10),
    qty INT,
    FOREIGN KEY (category_id) REFERENCES tb_categories (category_id),
    FOREIGN KEY (branch_id) REFERENCES tb_branches (branch_id)
);

INSERT INTO
    tb_books
VALUES (
        'BK001',
        'Harry Potter',
        'J.K Rowling',
        'C001',
        'B001',
        1
    ),
    (
        'BK002',
        'Naruto',
        'Kishimoto',
        'C002',
        'B001',
        1
    ),
    (
        'BK003',
        'Laskar Pelangi',
        'Andrea Hirata',
        'C001',
        'B001',
        1
    );

CREATE TABLE tb_borrow_transactions (
    transaction_id VARCHAR(10) PRIMARY KEY,
    member_id VARCHAR(10),
    staff_id VARCHAR(10),
    tanggal_peminjaman DATE,
    FOREIGN KEY (member_id) REFERENCES tb_members (member_id),
    FOREIGN KEY (staff_id) REFERENCES tb_staffs (staff_id)
);

INSERT INTO
    tb_borrow_transactions
VALUES (
        'TRX001',
        'M001',
        'S001',
        '2026-05-18'
    ),
    (
        'TRX002',
        'M002',
        'S002',
        '2026-05-18'
    );

CREATE TABLE tb_borrow_details (
    detail_id VARCHAR(10) PRIMARY KEY,
    transaction_id VARCHAR(10),
    book_id VARCHAR(10),
    FOREIGN KEY (transaction_id) REFERENCES tb_borrow_transactions (transaction_id),
    FOREIGN KEY (book_id) REFERENCES tb_books (book_id)
);

INSERT INTO
    tb_borrow_details
VALUES ('D001', 'TRX001', 'BK001'),
    ('D002', 'TRX001', 'BK002'),
    ('D003', 'TRX002', 'BK003');