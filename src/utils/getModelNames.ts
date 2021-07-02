import { Model } from '../client/interfaces/Model';
import { camelize } from './camelCase';
import { sort } from './sort';

export function getModelNames(models: Model[]): string[] {
    return models.map(model => camelize(model.name)).sort(sort);
}
