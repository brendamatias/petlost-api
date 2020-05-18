import * as Yup from 'yup';

import Address from '../models/Address';

class AddressController {
  async index(req, res) {
    const addresses = await Address.findAll({ where: { user_id: req.userId } });

    return res.json(addresses);
  }

  async show(req, res) {
    const address = await Address.findByPk(req.params.id);

    if (!address) {
      return res.status(404).json({ error: 'Address not found.' });
    }

    return res.json(address);
  }

  async store(req, res) {
    const schema = Yup.object({
      address: Yup.string().required(),
      neighborhood: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required().min(2).max(2),
      zipcode: Yup.string().required().min(9).min(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {
      address,
      neighborhood,
      number,
      complement,
      city,
      state,
      zipcode,
    } = req.body;

    const { id } = await Address.create({
      address,
      neighborhood,
      number,
      complement,
      city,
      state,
      zipcode,
      user_id: req.userId,
    });

    return res.json({
      id,
      address,
      neighborhood,
      number,
      complement,
      city,
      state,
      zipcode,
    });
  }

  async update(req, res) {
    const schema = Yup.object({
      address: Yup.string(),
      neighborhood: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string().min(2).max(2),
      zipcode: Yup.string().min(9).min(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const address = await Address.findByPk(req.params.id);

    if (!address) {
      return res.status(404).json({ error: 'Address not found.' });
    }

    if (address.user_id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized user.' });
    }

    await address.update(req.body);

    return res.json(address);
  }

  async delete(req, res) {
    const address = await Address.findByPk(req.params.id);

    if (!address) {
      return res.status(404).json({ error: 'Address not found.' });
    }

    if (address.user_id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized user.' });
    }

    await address.destroy();

    return res.status(204).send();
  }
}

export default new AddressController();
