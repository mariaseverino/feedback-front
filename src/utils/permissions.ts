export type Role = 'Member' | 'Owner' | 'Admin';
type Permission =
    | 'view_navbar'
    | 'view_dashboard'
    | 'view_team'
    | 'view_feedbacks'
    | 'view_billing'
    | 'view_help';

const rolePermissions: Record<Role, Permission[]> = {
    Owner: [
        'view_navbar',
        'view_dashboard',
        'view_team',
        'view_feedbacks',
        'view_billing',
        'view_help',
    ],
    Admin: [
        'view_navbar',
        'view_dashboard',
        'view_team',
        'view_feedbacks',
        'view_help',
        'view_billing',
    ],
    Member: ['view_feedbacks'],
};

export const permissions = (role: Role): Permission[] => {
    return rolePermissions[role] ?? [];
};

export const Can = (role: Role, permission: Permission): boolean => {
    return permissions(role).includes(permission);
};
