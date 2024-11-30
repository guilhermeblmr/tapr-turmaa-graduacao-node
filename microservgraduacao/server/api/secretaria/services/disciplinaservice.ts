import { Container, SqlQuerySpec } from "@azure/cosmos"
import cosmosDb from "../../../common/cosmosdb"
import { Disciplina } from "../entities/disciplina"


class DisciplinaService{
    private container:Container =
        cosmosDb.container("disciplina")

    async all(): Promise<Disciplina[]>{
        const {resources: listaDisciplinas}
            = await this.container.items.readAll<Disciplina>().fetchAll()
        return Promise.resolve(listaDisciplinas)
    }
    async saveNew(disciplina:Disciplina): Promise<Disciplina>{
        disciplina.id = ""
        await this.container.items.create(disciplina);

        return Promise.resolve(disciplina);
    }

    async update(id:string, disciplina:Disciplina): Promise<Disciplina>{
        const queryDisciplina: SqlQuerySpec ={
            query: "SELECT * FROM disciplina a where a.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
        }
        const {resources: listaDisciplinas} =
            await this.container.items.query(queryDisciplina).fetchAll()
        const disciplinaAntigo = listaDisciplinas[0]
        if(disciplinaAntigo == undefined){
            return Promise.reject()
        }
        disciplinaAntigo.nome = disciplina.nome
        
        await this.container.items.upsert(disciplinaAntigo)
        return Promise.resolve(disciplinaAntigo)
    }
    async delete(id:string): Promise<Disciplina>{
        let disciplina: Disciplina = {}
        const queryDisciplina: SqlQuerySpec ={
            query: "SELECT * FROM disciplina a where a.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
        }
        const {resources: listaDisciplinas} =
            await this.container.items.query(queryDisciplina).fetchAll()
        for (const umDisciplina of listaDisciplinas){
            disciplina = umDisciplina
            await this.container.item(umDisciplina).delete()
        }
        return Promise.resolve(disciplina)
    }
}


export default new DisciplinaService();