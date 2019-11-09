CREATE DATABASE IF NOT EXISTS solinc;
USE solinc;

CREATE TABLE IF NOT EXISTS `curso` (
  `codigo` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `disciplina` (
  `codigo` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  `cur_codigo` smallint(6) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `cur_codigo_fk` (`cur_codigo`),
  CONSTRAINT `cur_codigo_fk` FOREIGN KEY (`cur_codigo`) REFERENCES `curso` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

CREATE TABLE  IF NOT EXISTS `ferramenta` (
  `codigo` smallint(6) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `objFerramenta` varchar(255) NOT NULL,
  `descFerramenta` varchar(255) NOT NULL,
  `siteFerramenta` varchar(255) NOT NULL,
  `clasFerramenta` varchar(20) NOT NULL,
  `tipoFerramenta` varchar(20) NOT NULL,
  `patFerramenta` varchar(255) NOT NULL,
  `disc_codigo` smallint(6) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `ferramenta_FK` (`disc_codigo`),
  CONSTRAINT `ferramenta_FK` FOREIGN KEY (`disc_codigo`) REFERENCES `disciplina` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

CREATE TABLE  IF NOT EXISTS `usuario` (
  `codigo` smallint(6) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(60) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

