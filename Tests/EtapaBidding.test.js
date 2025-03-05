const { sesionP, sesionR, sesionW } = require("../__fixtures__/sesionesFixture");
const { autor, revisor, revisor1 } = require("../__fixtures__/usuariosFixture");
const { articuloPoster, articuloRegular, artPosterCon2AutoresNotif } = require("../__fixtures__/articulosFixture");
const Usuario = require("../Usuario/Usuario");
const _ = require("lodash");

describe('Revisores', () => {

    beforeEach(() => {
        Usuario.usuariosRegistrados = [autor, revisor, revisor1];
    });

    test('Agregar un revisor correctamente', () => {
        sesionP.agregarRevisores('Leonardo Rey');
        
        expect(sesionP._revisores).toHaveLength(1);
        expect(sesionP._revisores[0]._nombreUsuario).toBe('Leonardo Rey');
    });

    test('Error cuando el usuario no está registrado', () => {
        expect(() => sesionP.agregarRevisores('Pedro Zeta'))
            .toThrow('El usuario no está registrado en el sistema');
    });

    test('Error cuando el usuario no tiene el rol de REVISOR', () => {
        expect(() => sesionP.agregarRevisores('Juan Rodriguez'))
            .toThrow('El usuario no tiene el rol de REVISOR');
    });

    test('Error cuando el usuario ya es revisor de la sesión', () => {
        sesionP.agregarRevisores('Carlos Lopez'); // Primera vez, éxito
        expect(() => sesionP.agregarRevisores('Carlos Lopez'))
            .toThrow('Este usuario ya es revisor de esta sesión');
    });
});
describe('Etapa de Bidding', () => {

    let copiaSesion;
    beforeEach(() => {
        Usuario.usuariosRegistrados = [autor, revisor, revisor1];
        
        copiaSesion = _.cloneDeep(require("../__fixtures__/sesionesFixture").sesionR);
    });

    test("Cambiar estado de una sesión de Recepción a Bidding", () => {
        //Verifico que el estado inicial es RECEPCION
        expect(copiaSesion.estadoSesion().setEstado()).toBe("RECEPCION");
        
        //asignarEstado() cambia el estado a BIDDING
        copiaSesion.estadoSesion().asignarEstado();

        //Verifico que ahora el estado es BIDDING
        expect(copiaSesion.estadoSesion().setEstado()).toBe('BIDDING');
    });

    test('Un revisor expresa su interés', () => {
        const articulo = Object.create(articuloRegular);//copia del articulo

        //asignarEstado() cambia el estado a BIDDING
        copiaSesion.estadoSesion().asignarEstado();

        //Verifico que ahora el estado es BIDDING
        expect(copiaSesion.estadoSesion().setEstado()).toBe('BIDDING');

        //Agrego un revisor a la sesion
        copiaSesion.agregarRevisores('Leonardo Rey');

        //El revisor expresa su interés
        copiaSesion.estadoSesion().procesarBidding(revisor, articulo, "INTERESADO")

        const intereses = Array.from(articulo.listInteresRevisores());
        
        //Verifico si el interés quedó registrado
        intereses.forEach(([r, i]) => {
            expect(revisor._nombreUsuario).toBe(revisor._nombreUsuario);
            expect(i).toBe("INTERESADO");  
        });
    });

    test('Varios revisores pueden expresar interés en el mismo artículo', () => {
        const articulo = Object.create(articuloRegular);
    
        //La sesión pasa a estado BIDDING
        copiaSesion.estadoSesion().asignarEstado();
        expect(copiaSesion.estadoSesion().setEstado()).toBe('BIDDING');

        //Agrego un revisor a la sesion
        copiaSesion.agregarRevisores('Leonardo Rey');
        copiaSesion.agregarRevisores('Carlos Lopez');
    
        //Revisores expresan interés
        copiaSesion.estadoSesion().procesarBidding(revisor, articulo, "INTERESADO");
        copiaSesion.estadoSesion().procesarBidding(revisor1, articulo, "QUIZAS");

        //Se verifica que los intereses se registraron correctamente
        expect(articulo.listInteresRevisores().get(revisor)).toBe("INTERESADO");
        expect(articulo.listInteresRevisores().get(revisor1)).toBe("QUIZAS");
    });
    
    test('Un revisor puede cambiar su interés en un artículo', () => {
        const articulo = Object.create(articuloRegular);
    
        //La sesión pasa a estado BIDDING
        copiaSesion.estadoSesion().asignarEstado();
        expect(copiaSesion.estadoSesion().setEstado()).toBe('BIDDING');

        //Agrego un revisor a la sesion
        copiaSesion.agregarRevisores('Leonardo Rey');
    
        //Revisor expresa su interés y lo cambia luego
        copiaSesion.estadoSesion().procesarBidding(revisor, articulo, "INTERESADO");
        copiaSesion.estadoSesion().procesarBidding(revisor, articulo, "NO INTERESADO");

        //Se verifica que el cambio se haya registrado correctamente
        expect(articulo.listInteresRevisores().get(revisor)).toBe("NO INTERESADO");
    });

    test('No se puede procesar los intereses si la sesión no está en Estado Bidding', () => {
        const articulo = Object.create(articuloRegular);
        
        //Cambio el estado a ASIGNACION
        copiaSesion.estadoSesion().asignarEstado();
        expect(copiaSesion.estadoSesion().setEstado()).toBe('BIDDING');
        copiaSesion.estadoSesion().asignarEstado();
        expect(copiaSesion.estadoSesion().setEstado()).toBe('ASIGNACION');

        expect(() => copiaSesion.estadoSesion().procesarBidding(revisor, articulo, 'INTERESADO'))
            .toThrow('En esta estapa no se procesan los intereses');
    });

    test('No se puede agregar un tipo de interés que no sea válido', () => {
        const articulo = Object.create(articuloRegular);

        //Cambio el estado a BIDDING
        copiaSesion.estadoSesion().asignarEstado();
        expect(copiaSesion.estadoSesion().setEstado()).toBe('BIDDING');

        expect(() => copiaSesion.estadoSesion().procesarBidding(revisor, articulo, 'INTERESADISIMO'))
            .toThrow('No se reconoce este tipo de interés');
    });
    
    test('Lanza un error si el revisor no es revisor de la sesión', () => {
        const articulo = Object.create(articuloRegular);

        //Cambio el estado a BIDDING
        sesionW.estadoSesion().asignarEstado();
        expect(sesionW.estadoSesion().setEstado()).toBe('BIDDING');

        expect(() => sesionW.estadoSesion().procesarBidding(revisor, articulo, 'INTERESADO')).
        toThrow('El revisor no es revisor de la sesión donde se presentó el artículo');
    });

});