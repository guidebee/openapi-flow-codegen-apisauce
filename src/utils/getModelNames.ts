import camelCase from 'camelcase';

import { Model } from '../client/interfaces/Model';
import { sort } from './sort';

export function getModelNames(models: Model[]): string[] {
    return models.map(model => camelCase(model.name)).sort(sort);
}
