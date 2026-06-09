export type Role = 'member' | 'owner';
type Permission =
    | 'view_overview'
    | 'view_feedbacks'
    | 'send_feedbacks'
    | 'view_team'
    | 'view_settings'
    | 'manage_organization'
    | 'view_help'
    | 'view_billing';

const rolePermissions: Record<Role, Permission[]> = {
    owner: [
        'view_overview',
        'view_feedbacks',
        'send_feedbacks',
        'view_team',
        'view_settings',
        'manage_organization',
        'view_help',
        'view_billing',
    ],
    member: [
        'view_overview',
        'view_feedbacks',
        'send_feedbacks',
        'view_settings',
        'view_help',
    ],
};

export const permissions = (role: Role): Permission[] => {
    return rolePermissions[role] ?? [];
};

export const Can = (role: Role, permission: Permission): boolean => {
    return permissions(role).includes(permission);
};
