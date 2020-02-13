class Reserva {
    constructor(horario, cantPersonas, precioPorPersona, codigoDescuento) {
        this.horario = horario;
        this.cantPersonas = cantPersonas;
        this.precioPorPersona = precioPorPersona;
        this.codigoDescuento = codigoDescuento;
        if (typeof this.codigoDescuento !== 'string')
            throw new Error();
    }
    calcularPrecioBase() {
        return this.cantPersonas * this.precioPorPersona;
    }
    calcularAdicionales() {
        let precioBase = this.calcularPrecioBase();
        let horarioDeReserva = this.horario.getHours();
        let adicionalPorHorario = 0;
        let diaDeReserva = this.horario.getDay();
        let adicionalPorFinDeSemana = 0;
        if ((horarioDeReserva >= 13 && horarioDeReserva <= 14) || (horarioDeReserva >= 20 && horarioDeReserva <= 21)) {
            adicionalPorHorario = precioBase * 0.05;
        }
        if (diaDeReserva === 5 || diaDeReserva === 6 || diaDeReserva === 0) {
            adicionalPorFinDeSemana = precioBase * 0.1;
        }
        return adicionalPorFinDeSemana += adicionalPorHorario;
    }
    calcularDescuentos() {
        let precioBase = this.calcularPrecioBase();
        let descuentoPorGrupo = 0;
        let descuentoPorCodigo = 0;
        if (this.cantPersonas >= 4 && this.cantPersonas <= 6) {
            descuentoPorGrupo = precioBase * 0.05;
        }
        else if (this.cantPersonas === 7 || this.cantPersonas === 8) {
            descuentoPorGrupo = precioBase * 0.1;
        }
        else if (this.cantPersonas > 8) {
            descuentoPorGrupo = precioBase * 0.15;
        }
        if (this.codigoDescuento === "DES15") {
            descuentoPorCodigo = precioBase * 0.15;
        }
        else if (this.codigoDescuento === "DES200") {
            descuentoPorCodigo = 200;
        }
        else if (this.codigoDescuento === "DES1") {
            descuentoPorCodigo = this.precioPorPersona;
        }
        return descuentoPorGrupo += descuentoPorCodigo;
    }
    calcularPrecioFinal() {
        let precioFinal = this.calcularPrecioBase() + this.calcularAdicionales() - this.calcularDescuentos();
        return precioFinal;
    }
}
