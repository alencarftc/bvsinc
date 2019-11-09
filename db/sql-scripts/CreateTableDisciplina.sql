CREATE TABLE `disciplina` (
  `codigo` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  `cur_codigo` smallint(6) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `cur_codigo_fk` (`cur_codigo`),
  CONSTRAINT `cur_codigo_fk` FOREIGN KEY (`cur_codigo`) REFERENCES `curso` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
