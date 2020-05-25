// Este modelo se creo para manejar la informacion del formulario.
// esto es explicado en la programcion  orientada a objetos
export class HeroeModel {
    id: string;
    nombre: string;
    poder: string;
    vivo: boolean;
    constructor() {
        this.vivo = true;
    }
}
