const ComfyChair = require('./ComfyChair.js');

let empresa;

beforeEach( () => {
    empresa = new ComfyChair();
    
});

test("Se registró al usuario correctamente", () => {    
    empresa.registrarUsuario('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    expect(empresa.listUsuarios()[0]['_nombreUsuario']).toEqual('Juan Rodriguez');  
});

test("Cantidad de usuarios registrados", () => {
    empresa.registrarUsuario('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    empresa.registrarUsuario('José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    empresa.registrarUsuario('Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    const usuarios = empresa.listUsuarios();
    expect(usuarios.length).toBe(3);
});

test("No se puede registrar dos veces el mismo usuario", () => {
    const juan = empresa.registrarUsuario('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    const juanr = empresa.registrarUsuario('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    expect(juan).toEqual(juanr);
})

test("Se crea una conferencia", () => {
    const nuevaConferencia = empresa.crearConferencia('Conferencia Informática', '2024-07-28', '2024-07-31');
    //expect(['Conferencia Informática', '2024-07-28', '2024-07-31']).toEqual(expect.arrayContaining(nuevaConferencia))
    //expect(nuevaConferencia._nombreConferencia).toHaveProperty('_nombreConferencia', 'Conferencia Informática');
    expect(nuevaConferencia._nombreConferencia).toBe('Conferencia Informática');
})