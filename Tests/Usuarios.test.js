const Autores = require("../Usuarios/Autores");
const Chairs = require("../Usuarios/Chairs");
const Revisores = require("../Usuarios/Revisores");
const Usuarios = require("../Usuarios/Usuarios");

describe("Usuarios y sus subclases", () => {
    test("No se puede instanciar directamente la clase Usuarios", () => {
        expect(() => new Usuarios('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456')).toThrow("No se puede instanciar una clase abstracta");
    });

    test("Debe crear correctamente un Autor", () => {
        const autor = new Autores('José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');

        expect(autor).toBeInstanceOf(Autores);
        expect(autor.nombreUsuario()).toBe('José Gonzalez');
        expect(autor._rol).toContain('AUTOR');
    });

    test("Debe crear correctamente un Chair", () => {
        const chair = new Chairs('Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');

        expect(chair).toBeInstanceOf(Chairs);
        expect(chair.nombreUsuario()).toBe('Matias Lei');
        expect(chair._rol).toContain("CHAIR");
    });

    test("Debe crear correctamente un Revisor", () => {
        const revisor = new Revisores('Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');

        expect(revisor).toBeInstanceOf(Revisores);
        expect(revisor.nombreUsuario()).toBe('Leonardo Rey');
        expect(revisor._rol).toContain("REVISOR");
        expect(revisor._intereses).toEqual([]);
    });

    test("Debe dar de alta 2 autores y verificar que existen", () => {
        const autor1 = new Autores("Ana", "UNNE", "ana@correo.com", "5678");
        const autor2 = new Autores("Pedro", "UNNE", "pedro@correo.com", "abcd");
    
        const listaAutores = [autor1, autor2];
    
        expect(listaAutores.length).toBe(2);
        expect(listaAutores[0].nombreUsuario()).toBe("Ana");
        expect(listaAutores[1].nombreUsuario()).toBe("Pedro");
    });

    describe("Usuarios - Listar por Rol", () => {
        let usuario1, usuario2, usuario3, usuario4, usuarios;

        beforeEach(() => {
            usuario1 = new Autores('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
            usuario2 = new Chairs('José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
            usuario3 = new Revisores('Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
            usuario4 = new Autores('Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');

            usuarios = [usuario1, usuario2, usuario3, usuario4];
        });

        test("Debe listar correctamente los usuarios con el rol 'AUTOR'", () => {
            const autores = Usuarios.listarUsuariosPorRol(usuarios, "AUTOR");
            expect(autores.length).toBe(2);
            expect(autores).toContain(usuario1);
            expect(autores).toContain(usuario4);
        });

        test("Debe listar correctamente los usuarios con el rol 'CHAIR'", () => {
            const chairs = Usuarios.listarUsuariosPorRol(usuarios, "CHAIR");
            expect(chairs.length).toBe(1);
            expect(chairs).toContain(usuario2);
        });

        test("Debe listar correctamente los usuarios con el rol 'REVISOR'", () => {
            const revisores = Usuarios.listarUsuariosPorRol(usuarios, "REVISOR");
            expect(revisores.length).toBe(1);
            expect(revisores).toContain(usuario3);
        });
    });
});