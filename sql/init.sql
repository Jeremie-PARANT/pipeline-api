-- Création de la base de données
CREATE DATABASE IF NOT EXISTS pipeline_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE pipeline_db;

-- Création de la table (renommée pour éviter le mot réservé)
CREATE TABLE IF NOT EXISTS users (
  id   INT          NOT NULL AUTO_INCREMENT,
  nom  VARCHAR(100) NOT NULL,
  mail VARCHAR(191) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_mail (mail)
);

-- Insertion de 3 utilisateurs
INSERT INTO users (nom, mail) VALUES
  ('Alice Dupont',  'alice.dupont@example.com'),
  ('Bob Martin',    'bob.martin@example.com'),
  ('Claire Leroy',  'claire.leroy@example.com');