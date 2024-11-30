import express from 'express';
import controller from './alunocontroller';

export default express
    .Router()
    .get('/', controller.all)
    .post('/', controller.post)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete)