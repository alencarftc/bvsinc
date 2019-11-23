module.exports = class ToolModel {
    constructor(titulo, 
                descFerramenta,
                siteFerramenta,
                clasFerramenta,
                tipoFerramenta,
                objFerramenta, 
                patFerramenta,
                disc_codigo,
                cur_codigo){
        this.titulo = titulo;
        this.objFerramenta = objFerramenta;
        this.descFerramenta = descFerramenta;
        this.siteFerramenta = siteFerramenta;
        this.clasFerramenta = clasFerramenta;
        this.tipoFerramenta = tipoFerramenta;
        this.patFerramenta = patFerramenta;
        this.disc_codigo = disc_codigo;
        this.cur_codigo = cur_codigo;
    }
}