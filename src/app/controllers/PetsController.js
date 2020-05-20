import * as Yup from 'yup';
import { Op } from 'sequelize';

import Pet from '../models/Pet';
import File from '../models/File';
import Petfile from '../models/Petfile';
import Address from '../models/Address';

class PetsController {
  async index(req, res) {
    const { page = 1, filters = '' } = req.query;

    const pets = await Pet.findAll({
      include: [
        {
          model: Address,
          as: 'address',
          attributes: ['id', 'city', 'state'],
        },
        {
          model: Petfile,
          as: 'files',
          attributes: ['id', 'file_id'],
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
      ],
      where: {
        user_id: { [Op.ne]: null },
        filters: { [Op.like]: `%${filters}%` },
      },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(pets);
  }

  async show(req, res) {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found.' });
    }

    return res.json(pet);
  }

  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      filters: Yup.string().required(),
      address_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { name, filters, address_id } = req.body;

    const addressExists = await Address.findOne({
      where: { id: address_id },
    });

    if (!addressExists) {
      return res.status(400).json({ error: 'Address not found.' });
    }

    const pet = await Pet.create({
      name,
      filters,
      address_id,
      user_id: req.userId,
    });

    return res.json(pet);
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      filters: Yup.string(),
      address_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found.' });
    }

    if (pet.user_id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized user.' });
    }

    if (req.body.address_id) {
      const addressExists = await Address.findOne({
        where: { id: req.body.address_id },
      });

      if (!addressExists) {
        return res.status(400).json({ error: 'Address not found.' });
      }
    }

    await pet.update(req.body);

    return res.json(pet);
  }

  async delete(req, res) {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found.' });
    }

    if (pet.user_id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized user.' });
    }

    await pet.destroy();

    return res.status(204).send();
  }
}

export default new PetsController();
