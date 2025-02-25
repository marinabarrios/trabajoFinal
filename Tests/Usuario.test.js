const Autor = require("../Usuario/Autor");
const Chair = require("../Usuario/Chair");
const Revisor = require("../Usuario/Revisor");
const Usuario = require("../Usuario/Usuario");

describe("Usuarios y sus subclases", () => {
    let autor, autor1, autor2, autor3, revisor, revisor1, chair, chair1;

        beforeEach(() => {
            autor = new Autor('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
            chair = new Chair('Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
            revisor = new Revisor('Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
            autor1 = new Autor('Sofia Perez', 'UBA', 'sofia_perez@gmail.com', '123456');
            revisor1 = new Revisor('Carlos Lopez', 'UTN', 'carlos_lopez@gmail.com', '123456');
            chair1 = new Chair('Laura Díaz', 'UNL', 'laura_diaz@gmail.com', '123456');
            autor2 = new Autor('José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
            autor3 = new Autor('Julian Cotto', 'UBA', 'julian_cotto@gmail.com', '123456');

            usuarios = [autor, autor1, autor2, autor3, revisor, revisor1, chair, chair1];
        });

    test("No se puede instanciar directamente la clase Usuarios", () => {
        expect(() => new Usuario('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456'))
        .toThrow("No se puede instanciar una clase abstracta");
    });

    test("Debe crear correctamente un Autor", () => {
        expect(autor).toBeInstanceOf(Autor);
        expect(autor.nombreUsuario()).toBe('Juan Rodriguez');
        expect(autor._roles).toContain('AUTOR');
    });

    test("Debe crear correctamente un Chair", () => {
        expect(chair).toBeInstanceOf(Chair);
        expect(chair.nombreUsuario()).toBe('Matias Lei');
        expect(chair._roles).toContain("CHAIR");
    });

    test("Debe crear correctamente un Revisor", () => {
        expect(revisor).toBeInstanceOf(Revisor);
        expect(revisor.nombreUsuario()).toBe('Leonardo Rey');
        expect(revisor._roles).toContain("REVISOR");
        expect(revisor._intereses).toEqual([]);
    });

    test("Debe permitir que un autor también sea revisor o chair", () => {
        autor1.agregarRol('REVISOR');
        expect(autor1._roles).toContain('AUTOR');
        expect(autor1._roles).toContain('REVISOR');
    });

    test("No debe permitir que un revisor también sea chair", () => {
        expect(() => revisor1.agregarRol('CHAIR')).toThrow("Un usuario no puede ser CHAIR y REVISOR al mismo tiempo.");
    });

    test("No debe permitir que un chair también sea revisor", () => {
        expect(() => chair1.agregarRol('REVISOR')).toThrow("Un usuario no puede ser CHAIR y REVISOR al mismo tiempo.");
    });

    test("Debe dar de alta 2 autores y verificar que existen", () => {
        const listaAutores = [autor2, autor3];
    
        expect(listaAutores.length).toBe(2);
        expect(listaAutores[0].nombreUsuario()).toBe('José Gonzalez');
        expect(listaAutores[1].nombreUsuario()).toBe('Julian Cotto');
    });

    describe("Usuarios - Listar por Rol", () => {

        test("Debe listar correctamente los usuarios con el rol 'AUTOR'", () => {
            const autores = usuarios.filter(usuario => usuario._roles.includes("AUTOR"));
            console.log("Usuarios con rol AUTOR:", autores.map(a => a.nombreUsuario()));
            expect(autores.length).toBe(4);
        });

        test("Debe listar correctamente los usuarios con el rol 'CHAIR'", () => {
            const chairs = usuarios.filter(usuario => usuario._roles.includes("CHAIR"));            
            expect(chairs.length).toBe(2);
        });

        test("Debe listar correctamente los usuarios con el rol 'REVISOR'", () => {
            const revisores = usuarios.filter(usuario => usuario._roles.includes("REVISOR"));
            expect(revisores.length).toBe(2);
        });

        test("Cambiar el rol de un usuario", () => {
            autor.cambiarRolUsuario("CHAIR");
            expect(autor._roles).toContain("CHAIR");
        });
        
        test("Intentar cambiar el rol de un usuario sin rol asignado", () => {
            revisor._roles = null; // Eliminar todos los roles manualmente
            expect(() => revisor.cambiarRolUsuario("AUTOR")).toThrow("El usuario no tiene un rol asignado.");
        });
    });
});