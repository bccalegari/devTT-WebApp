import { MenuItem } from 'primeng/api';

export interface HeaderItemsService {
  get(role: string): MenuItem[];
}
