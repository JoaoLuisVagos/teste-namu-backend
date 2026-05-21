CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  program_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  day_of_week ENUM('segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo') NOT NULL,
  duration_minutes INT NOT NULL,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);