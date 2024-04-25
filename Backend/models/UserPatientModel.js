export class UserPatientModel {
    constructor(id, name, email, senha )
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.senha = senha;
    }

    toString() {
        return `Name: ${this.name}, Email: ${this.email}, Specialization: ${this.senha}`;
    }
}

export default router