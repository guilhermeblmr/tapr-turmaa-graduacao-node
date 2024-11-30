import {Request, Response} from 'express';
import AlunoService from '../../secretaria/services/disciplinaservice';

class AlunoController{
    all(_:Request, res:Response): void{
        AlunoService.all().then((a) => res.json(a))
    }
    post(req:Request, res:Response): void{
        if(req.body == undefined)
            res.status(400).end()
        AlunoService.saveNew(req.body).then((a) => res.json(a))
    }
    update(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == '' || req.body == undefined){
            res.status(400).end()
        }
        AlunoService.update(req.params['id'], req.body).then((a)=>res.json(a)).catch(()=>res.status(404).end())
    }
    delete(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == ''){
            res.status(400).end()
        }
        AlunoService.delete(req.params['id']).then((r)=> res.json(r));

    }

}

export default new AlunoController();