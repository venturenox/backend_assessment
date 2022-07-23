const { z } = require('zod');

const TenantSchema = z.object({
	id: z.number(),
	tenantName: z.string(),
	address: z.any(),
	city: z.string(),
	state: z.string(),
	country: z.string(),
	zipCode: z.string(),
	phone: z.string(),
	webUrl: z.string()
});

const TenantPatchSchema = z.object({
	tenantName: z.string().optional(),
	address: z.any().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	country: z.string().optional(),
	zipCode: z.string().optional(),
	phone: z.string().optional(),
	webUrl: z.string().optional(),
});

module.exports = {
	TenantSchema,
	TenantPatchSchema
};