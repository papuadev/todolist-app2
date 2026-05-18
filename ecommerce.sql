CREATE TABLE tb_users (
    user_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    role VARCHAR(50)
);

INSERT INTO
    tb_users
VALUES (
        'U001',
        'Budi',
        'budi@gmail.com',
        'Customer'
    ),
    (
        'U002',
        'Sinta',
        'sinta@gmail.com',
        'Customer'
    ),
    (
        'U003',
        'Admin1',
        'admin@gmail.com',
        'Admin'
    );

CREATE TABLE tb_categories (
    category_id VARCHAR(10) PRIMARY KEY,
    category_name VARCHAR(100)
);

INSERT INTO
    tb_categories
VALUES ('C001', 'Electronics'),
    ('C002', 'Accessories');

CREATE TABLE tb_products (
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(150),
    category_id VARCHAR(10),
    stock INT,
    price INT,
    FOREIGN KEY (category_id) REFERENCES tb_categories (category_id)
);

INSERT INTO
    tb_products
VALUES (
        'P001',
        'Laptop Asus',
        'C001',
        10,
        10000000
    ),
    (
        'P002',
        'Mouse Logitech',
        'C002',
        50,
        200000
    ),
    (
        'P003',
        'Keyboard Mechanical',
        'C002',
        20,
        500000
    );

CREATE TABLE tb_orders (
    order_id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10),
    order_date DATE,
    total_amount INT,
    FOREIGN KEY (user_id) REFERENCES tb_users (user_id)
);

INSERT INTO
    tb_orders
VALUES (
        'ORD001',
        'U001',
        '2026-05-18',
        10400000
    ),
    (
        'ORD002',
        'U002',
        '2026-05-18',
        500000
    );

CREATE TABLE tb_order_details (
    detail_id VARCHAR(10) PRIMARY KEY,
    order_id VARCHAR(10),
    product_id VARCHAR(10),
    qty INT,
    subtotal INT,
    FOREIGN KEY (order_id) REFERENCES tb_orders (order_id),
    FOREIGN KEY (product_id) REFERENCES tb_products (product_id)
);

INSERT INTO
    tb_order_details
VALUES (
        'D001',
        'ORD001',
        'P001',
        1,
        10000000
    ),
    (
        'D002',
        'ORD001',
        'P002',
        2,
        400000
    ),
    (
        'D003',
        'ORD002',
        'P003',
        1,
        500000
    );

CREATE TABLE tb_payment (
    payment_id VARCHAR(10) PRIMARY KEY,
    order_id VARCHAR(10),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    amount INT,
    FOREIGN KEY (order_id) REFERENCES tb_orders (order_id)
);

INSERT INTO
    tb_payment
VALUES (
        'PAY001',
        'ORD001',
        'Transfer Bank',
        'Paid',
        10400000
    ),
    (
        'PAY002',
        'ORD002',
        'E-Wallet',
        'Pending',
        500000
    );

CREATE TABLE tb_shipping (
    shipping_id VARCHAR(10) PRIMARY KEY,
    order_id VARCHAR(10),
    shipping_address VARCHAR(255),
    tracking_status VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES tb_orders (order_id)
);

INSERT INTO
    tb_shipping
VALUES (
        'SH001',
        'ORD001',
        'Timika',
        'Delivered'
    ),
    (
        'SH002',
        'ORD002',
        'Jayapura',
        'Shipping'
    );

CREATE TABLE tb_charts (
    cart_id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10),
    product_id VARCHAR(10),
    qty INT,
    FOREIGN KEY (user_id) REFERENCES tb_users (user_id),
    FOREIGN KEY (product_id) REFERENCES tb_products (product_id)
);

INSERT INTO tb_charts VALUES ('CART001', 'U001', 'P002', 1);

CREATE TABLE tb_reviews (
    review_id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10),
    product_id VARCHAR(10),
    review TEXT,
    rating INT,
    FOREIGN KEY (user_id) REFERENCES tb_users (user_id),
    FOREIGN KEY (product_id) REFERENCES tb_products (product_id)
);

INSERT INTO tb_reviews VALUES ( 'R001', 'U001', 'P001', 'Bagus', 5 );