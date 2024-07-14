export enum Role {
  MASTER = 'Master',
}

export const RoleUtils = {
  getRoles(): Role[] {
    return Object.values(Role) as Role[];
  },

  getRole(role: string): Role {
    const roleEnum: Role | undefined = this.getRoles().find(r => r === role);

    if (!roleEnum) {
      throw new Error(`Role '${role}' undefined`);
    }

    return roleEnum;
  },
};
