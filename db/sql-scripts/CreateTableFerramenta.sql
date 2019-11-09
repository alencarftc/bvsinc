CREATE TABLE `ferramenta` (
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
