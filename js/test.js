let expect = chai.expect;

describe("Restaurant", () => {
    describe("reservarHorario", () => {
        it("Debería eliminarse del array de horarios disponibles, el horario reservado.", () => {
            let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
            restaurant.reservarHorario("13:00");
            expect(restaurant.horarios).to.eql(["15:30", "18:00"]);
            expect(restaurant.horarios.length).to.equal(2);
        });
        it("Debería mantenerse igual el array de horarios disponibles del restaurant cuando se reserva un horario que éste no posee.", () => {
            let restaurant = new Restaurant(20, "Pappelli", "Pizza", "París", ["12:00", "15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]);
            restaurant.reservarHorario("14:00");
            expect(restaurant.horarios).to.eql(["12:00", "15:00", "17:30"]);
            expect(restaurant.horarios.length).to.equal(3);
        });
        it("Debería mantenerse igual el array de horarios disponibles del restaurant cuando no se le pasa ningún parámetro a la función.", () => {
            let restaurant = new Restaurant(21, "Trattoria La Cenetta", "Pizza", "Berlín", ["12:00", "15:00", "17:30"], "../img/pizza4.jpg", [8, 4, 6, 2, 5, 7]);
            restaurant.reservarHorario();
            expect(restaurant.horarios).to.eql(["12:00", "15:00", "17:30"]);
            expect(restaurant.horarios.length).to.equal(3);
        });
    });
    describe("obtenerPuntuacion", () => {
        it("Debería calcular correctamente el promedio de la suma de las calificaciones del restaurant.", () => {
            let restaurant = new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]);
            let fn = restaurant.obtenerPuntuacion();
            expect(fn).to.equal(7.8);
        });
        it("Debería devolver una puntuación igual a 0 si el restaurant no posee ninguna calificación.", () => {
            let restaurant = new Restaurant(23, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", []);
            let fn = restaurant.obtenerPuntuacion();
            expect(fn).to.equal(0);
        });
    });
    describe("calificar", () => {
        it("Debería arrojar un error si la calificación pasada por parámetro NO es un número.", () => {
            let restaurant = new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]);
            let fn = () => restaurant.calificar(NaN);
            expect(fn).to.throw();
        });
        it("No debería arrojar un error si la calificación pasada por parámetro es un número.", () => {
            let restaurant = new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]);
            let fn = () => restaurant.calificar(8);
            expect(fn).to.not.throw();
        });
        it("Debería arrojar un error si la calificación pasada por parámetro es un número menor a 1.", () => {
            let restaurant = new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]);
            let fn = () => restaurant.calificar(0);
            expect(fn).to.throw();
        });
        it("Debería arrojar un error si la calificación pasada por parámetro es un número mayor a 10.", () => {
            let restaurant = (8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]);
            let fn = () => restaurant.calificar(12);
            expect(fn).to.throw();
        });
        it("Debería arrojar un error si la calificación pasada por parámetro no es un número entero.", () => {
            let restaurant = (10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]);
            let fn = () => restaurant.calificar(7.4);
            expect(fn).to.throw();
        });
        it("Debería agregarse al array de calificaciones la calificación pasada por parámetro.", () => {
            let restaurant = new Restaurant(13, "The Counter", "Hamburguesa", "Nueva York", ["17:00", "18:00", "19:30"], "../img/hamburguesa2.jpg", [6, 9, 7, 6, 7, ]);
            restaurant.calificar(10);
            expect(restaurant.calificaciones).to.eql([6, 9, 7, 6, 7, 10]);
        });
    });
});

describe("Listado", () => {
    describe("buscarRestaurante(id)", () => {
        it("Debería arrojar un error si el id pasado por parámetro NO es un número.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
                new Restaurant(23, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
                new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = () => listado.buscarRestaurante(isNaN);
            expect(fn).to.throw();
        });
        it("No debería arrojar un error si el id pasado por parámetro es un número y es mayor a 0.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = () => listado.buscarRestaurante(2);
            expect(fn).to.not.throw();
        });
        it("Debería arrojar un error cuando no se le pasa ningún id por parámetro.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
                new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
                new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = () => listado.buscarRestaurante();
            expect(fn).to.throw();
        });
        it("Debería arrojar un error cuando no existe un restaurant que coincida con el id pasado por parámetro.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
                new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
                new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = () => listado.buscarRestaurante(5);
            expect(fn).to.throw();
        });
        it("Debería devolver el restaurant que corresponda al id pasado por parámetro.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]),
                new Restaurant(11, "Frogburguer", "Hamburguesa", "París", ["12:00", "15:00", "17:30"], "../img/hamburguesa1.jpg", [9, 8, 5, 2, 9]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = listado.buscarRestaurante(3);
            let restaurantBuscadoPorId = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);
            expect(fn).to.eql(restaurantBuscadoPorId);
        });
    });
    describe("obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario)", () => {
        it("No debería devolver ningún restaurant en particular si no se le pasa ninguún filtro por parámetro.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(13, "The Counter", "Hamburguesa", "Nueva York", ["17:00", "18:00", "19:30"], "../img/hamburguesa2.jpg", [6, 9, 7, 6, 7, ]),
                new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7]),
                new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = listado.obtenerRestaurantes();
            expect(fn.length).to.equal(0);
        });
        it("Debería devolver todos los restaurants que coincidan con el rubro elegido.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = listado.obtenerRestaurantes("Asiática", null, null);
            expect(fn.length).to.equal(2);
        });
        it("Debería devolver todos los restaurants que coincidan con la ciudad elegida.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", [4, 9, 10, 9, 4, 6]),
                new Restaurant(17, "Vapiano", "Pasta", "Berlín", ["12:00", "15:00", "17:30"], "../img/pasta4.jpg", [8, 4, 6, 7, 4, 7]),
                new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "../img/pizza1.jpg", [8, 8, 8, 4, 6, 7]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = listado.obtenerRestaurantes(null, "Londres", null);
            expect(fn.length).to.equal(1);
        });
        it("Debería devolver todos los restaurants que coincidan con el horario elegido.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(19, "Les Deux Magots", "Desayuno", "París", ["17:00", "19:00", "22:30"], "../img/desayuno4.jpg", [8, 4, 6, 6, 7]),
                new Restaurant(20, "Pappelli", "Pizza", "París", ["12:00", "15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]),
                new Restaurant(21, "Trattoria La Cenetta", "Pizza", "Berlín", ["12:00", "15:00", "17:30"], "../img/pizza4.jpg", [8, 4, 6, 2, 5, 7]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = listado.obtenerRestaurantes(null, null, "15:00");
            expect(fn.length).to.equal(2);
        });
        it("Debería devolver todos los restaurants que coincidan con los tres parámetros elegidos.", () => {
            let listadoDeRestaurantes = [
                new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
                new Restaurant(23, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
                new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
            ];
            let listado = new Listado(listadoDeRestaurantes);
            let fn = listado.obtenerRestaurantes("Hamburguesa", "Nueva York", "14:30:");
            expect(fn.length).to.equal(0);
        });
    });
});

describe("Reserva", () => {
    describe("constructor", () => {
        it("Debería arrojar un error si el código de descuento pasado por parámetro NO es un string.", () => {
            let reserva = () => new Reserva(new Date(2018, 7, 24, 11), 8, 350, 15);
            expect(reserva).to.throw();
        });
    });
    describe("calcularPrecioBase", () => {
        it("Debería calcular correctamente el precio base de la reserva efectuada.", () => {
            let reserva = new Reserva(new Date(2018, 7, 24, 11), 8, 350, "DES1");
            let reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
            let fn1 = reserva.calcularPrecioBase(reserva);
            let fn2 = reserva2.calcularPrecioBase(reserva2);
            expect(fn1).to.equal(2800);
            expect(fn2).to.equal(300);
        });
    });
    describe("calcularPrecioFinal", () => {
        it("Debería calcular correctamente el precio final de la reserva efectuada.", () => {
            let reserva = new Reserva(new Date(2018, 7, 24, 11), 8, 350, "DES1");
            let reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
            let fn1 = reserva.calcularPrecioFinal(reserva);
            let fn2 = reserva2.calcularPrecioFinal(reserva2);
            expect(fn1).to.equal(2450);
            expect(fn2).to.equal(100);
        });
    });
});