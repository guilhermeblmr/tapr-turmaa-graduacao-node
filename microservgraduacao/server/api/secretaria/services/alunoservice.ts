import { Container, SqlQuerySpec } from "@azure/cosmos"
import cosmosDb from "../../../common/cosmosdb"
import { Aluno } from "../entities/aluno"


class AlunoService{
    private container:Container =
        cosmosDb.container("aluno")

    async all(): Promise<Aluno[]>{
        const {resources: listaAlunos}
            = await this.container.items.readAll<Aluno>().fetchAll()
        return Promise.resolve(listaAlunos)
    }
    async saveNew(aluno:Aluno): Promise<Aluno>{
        aluno.id = ""
        await this.container.items.create(aluno);

        return Promise.resolve(aluno);
    }

    async update(id:string, aluno:Aluno): Promise<Aluno>{
        const queryAluno: SqlQuerySpec ={
            query: "SELECT * FROM aluno a where a.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
        }
        const {resources: listaAlunos} =
            await this.container.items.query(queryAluno).fetchAll()
        const alunoAntigo = listaAlunos[0]
        if(alunoAntigo == undefined){
            return Promise.reject()
        }
        alunoAntigo.nome = aluno.nome
        
        await this.container.items.upsert(alunoAntigo)
        return Promise.resolve(alunoAntigo)
    }
    async delete(id:string): Promise<Aluno>{
        let aluno: Aluno = {}
        const queryAluno: SqlQuerySpec ={
            query: "SELECT * FROM aluno a where a.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
        }
        const {resources: listaAlunos} =
            await this.container.items.query(queryAluno).fetchAll()
        for (const umAluno of listaAlunos){
            aluno = umAluno
            await this.container.item(umAluno).delete()
        }
        return Promise.resolve(aluno)
    }
}


export default new AlunoService();