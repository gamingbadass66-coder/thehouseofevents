import Joi from 'joi';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }
    
    next();
  };
};

// Validation schemas
export const userRegistrationSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(20).optional()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required()
});

export const eventSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  short_description: Joi.string().max(500).optional(),
  event_date: Joi.date().iso().required(),
  start_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  end_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  venue: Joi.string().min(3).max(255).required(),
  venue_address: Joi.string().max(1000).optional(),
  price: Joi.number().positive().required(),
  max_capacity: Joi.number().integer().positive().optional(),
  category_id: Joi.number().integer().positive().optional(),
  image_url: Joi.string().uri().optional()
});

export const bookingSchema = Joi.object({
  event_id: Joi.number().integer().positive().required(),
  number_of_tickets: Joi.number().integer().min(1).max(10).required()
});

export const partnershipSchema = Joi.object({
  partner_name: Joi.string().min(2).max(255).required(),
  contact_person: Joi.string().min(2).max(255).optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
  organization: Joi.string().max(255).optional(),
  partnership_type_id: Joi.number().integer().positive().required(),
  proposal: Joi.string().min(20).required()
});

export const subscriberSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(255).optional()
});

export const contactSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().max(255).optional(),
  message: Joi.string().min(10).required()
});
