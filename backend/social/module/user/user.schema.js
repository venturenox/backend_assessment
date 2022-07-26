const { z } = require('zod');

const UserSchema = z.object({
	id: z.number(),
	firstName: z.string(),
	lastName: z.string(),
	department: z.string(),
	designation: z.string(),
	tenantId: z.number(),
	imageUrl: z.string(),
	city: z.string(),
	country: z.string(),
	bio: z.string(),
	socialLinks: z.any(),
	employeeId: z.string()
}).strict();

const UserPatchSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	department: z.string().optional(),
	designation: z.string().optional(),
	tenantId: z.number().optional(),
	imageUrl: z.string().optional(),
	city: z.string().optional(),
	country: z.string().optional(),
	bio: z.string().optional(),
	socialLinks: z.any().optional(),
	employeeId: z.string().optional()
}).strict();

module.exports = {
	UserSchema,
	UserPatchSchema
};