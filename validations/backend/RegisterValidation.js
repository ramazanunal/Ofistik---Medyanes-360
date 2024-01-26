import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'İsim alanı boş bırakılamaz.',
    'string.required': 'İsim alanı boş bırakılamaz.',
    'string.min': 'İsim alanı en az 3 karakter olmalıdır.',
    'string.max': 'İsim alanı en fazla 30 karakter olmalıdır.',
  }),
  surname: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Soyisim alanı boş bırakılamaz.',
    'string.required': 'Soyisim alanı boş bırakılamaz.',
    'string.min': 'Soyisim alanı en az 3 karakter olmalıdır.',
    'string.max': 'Soyisim alanı en fazla 30 karakter olmalıdır.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email alanı boş bırakılamaz.',
    'string.email': 'Geçerli bir email adresi giriniz.',
    'string.required': 'Email alanı boş bırakılamaz.',
  }),
  phone: Joi.string().min(10).max(25).required(),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': 'Şifre alanı boş bırakılamaz.',
    'string.required': 'Şifre alanı boş bırakılamaz.',
    'string.min': 'Şifre alanı en az 6 karakter olmalıdır.',
    'string.max': 'Şifre alanı en fazla 30 karakter olmalıdır.',
  }),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Şifreler eşleşmiyor.',
  }),
});

export default schema;
