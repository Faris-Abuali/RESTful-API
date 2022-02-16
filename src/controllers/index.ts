import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TodoInstance } from '../models';


class TodoController {

    async create(req: Request, res: Response): Promise<Response> {
        // 4th param: the Controller Function:
        const id = uuidv4();
        try {
            const record = await TodoInstance.create({
                ...req.body,
                id
            });
            return res.json({ record, msg: 'Scuccessfully created todo' });
        }
        catch (e) {
            return res.json({
                msg: 'failed to create',
                status: 500,
                route: '/create'
            })
        }
    }


    async readWithPagination(req: Request, res: Response): Promise<Response> {
        // 4th param: the Controller Function:
        try {
            let limit = (req.query?.limit as number | undefined);
            let offset = (req.query?.offset as number | undefined) || 0;
            limit = parseInt(limit + "");
            offset = parseInt(offset + "");
            const records = await TodoInstance.findAll({
                where: {}, limit, offset
            });

            return res.json(records);
        }
        catch (e) {
            return res.json({
                msg: 'failed to read',
                status: 500,
                route: '/read'
            })
        }
    }

    async readById(req: Request, res: Response): Promise<Response> {
        // 4th param: the Controller Function:
        try {
            const { id } = req.params;
            const record = await TodoInstance.findOne({ where: { id } });
            return res.json(record);
        }
        catch (e) {
            return res.json({
                msg: 'failed to read',
                status: 500,
                route: `/read/:id`
            })
        }
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            // First, check if the record with this id exists:
            const record = await TodoInstance.findOne({ where: { id } });
            if (!record) {
                return res.json({
                    msg: `No record found with such id: ${id}`
                });
            }
            // else, the record is found. So, update its status:
            // Toggle the `completed` attribute (from true to false or vice versa)
            const updatedRecord = await record.update({ completed: !record.getDataValue('completed') })

            return res.json({ record: updatedRecord });
        }
        catch (e) {
            return res.json({
                msg: 'failed to update',
                status: 500,
                route: `/update/:id`
            })
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            // First, check if the record with this id exists:
            const record = await TodoInstance.findOne({ where: { id } });
            if (!record) {
                return res.json({
                    msg: `No record found with such id: ${id}`
                });
            }
            // else, the record is found. So, delete it
            const deletedRecord = await record.destroy()

            return res.json({ record: deletedRecord });
        }
        catch (e) {
            return res.json({
                msg: 'failed to delete',
                status: 500,
                route: `/delete/:id`
            })
        }
    }

} //end class

export default new TodoController();