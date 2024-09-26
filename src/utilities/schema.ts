import Joi from "joi";

export const joiSchemas = {
    firstName: Joi.string()
        .min(2)                        
        .max(25)                      
        .regex(/^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/)
        .trim()                        
        .required()
        .messages({
            'string.base': 'First name must be a string',
            'string.min': 'First name must be at least 2 characters long',
            'string.max': 'First name must not exceed 25 characters',
            'string.pattern.base': 'First name can only contain letters, spaces, apostrophes, or hyphens',
            'string.empty': 'First name is required and cannot be empty',
            'any.required': 'First name is a required field',
        }),

    lastName: Joi.string()
        .min(2)                        
        .max(25)                      
        .regex(/^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/)
        .trim()                        
        .required()
        .messages({
            'string.base': 'First name must be a string',
            'string.min': 'First name must be at least 2 characters long',
            'string.max': 'First name must not exceed 25 characters',
            'string.pattern.base': 'First name can only contain letters, spaces, apostrophes, or hyphens',
            'string.empty': 'First name is required and cannot be empty',
            'any.required': 'First name is a required field',
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: false })
        .required()
        .messages({
            'string.email': 'Email must be a valid email address with at least 2 domain segments',
            'string.empty': 'Email is required and cannot be empty',
            'any.required': 'Email is a required field',
        }),

    password: Joi.string()
        .min(4)
        .max(30) 
        .pattern(new RegExp('(?=.*[a-z])'))
        .pattern(new RegExp('(?=.*[A-Z])'))
        .pattern(new RegExp('(?=.*\\d)'))
        .pattern(new RegExp('(?=.*[!@#$%^&*])'))
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must not exceed 30 characters',
            'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
            'string.empty': 'Password is required and cannot be empty',
            'any.required': 'Password is a required field',
        }),

    verificationCode: Joi.string()
        .length(6)  // Assuming a 6-character code, modify if different length
        .pattern(/^[0-9]{6}$/)  // Only allows digits, for numeric codes
        .required()
        .messages({
            'string.length': 'Verification code must be exactly 6 characters long',
            'string.pattern.base': 'Verification code must be numeric and contain only digits',
            'string.empty': 'Verification code is required and cannot be empty',
            'any.required': 'Verification code is a required field',
        }),

    confirmPassword: Joi.any()
        .valid(Joi.ref('password'))  // Ensures it matches the password
        .required()
        .messages({
            'any.only': 'Confirm password must match the password',
            'any.required': 'Confirm password is required',
        }),
}