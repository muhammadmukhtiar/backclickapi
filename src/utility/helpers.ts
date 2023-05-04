import { Op } from 'sequelize';

export function generateQuery(searchQuery: Record<string, any>): Record<string, any> {
    const where = {};
    Object.entries(searchQuery).forEach(([key, value]) => {
        if (value) {
            if (key === 'companyId') {
                if (!where[Op.and]) {
                    where[Op.and] = [];
                }
                where[Op.and].push({ [key]: value });
            } else {
                if (!where[Op.or]) {
                    where[Op.or] = [];
                }
                where[Op.or].push({ [key]: { [Op.like]: `%${value}%` } });
            }
        }
    });
    const query = { where };
    return query;
}

