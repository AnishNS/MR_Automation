CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,

    report_month VARCHAR(50),
    report_year VARCHAR(10),

    pdf_path TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (client_id)
    REFERENCES clients(id)
    ON DELETE CASCADE
);

CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,

    report_id INT NOT NULL,

    platform VARCHAR(100),

    raw_file_name VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (report_id)
    REFERENCES reports(id)
    ON DELETE CASCADE
);

CREATE TABLE instagram_analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,

    service_id INT NOT NULL,

    total_posts INT,
    total_views INT,
    total_reach INT,
    total_likes INT,
    total_engagement INT,
    engagement_rate DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
    REFERENCES services(id)
    ON DELETE CASCADE
);

CREATE TABLE seo_analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,

    service_id INT NOT NULL,

    organic_traffic INT,
    impressions INT,
    clicks INT,
    ctr DECIMAL(10,2),
    avg_position DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
    REFERENCES services(id)
    ON DELETE CASCADE
);