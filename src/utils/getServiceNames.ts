import { Service } from '../client/interfaces/Service';
import { camelize } from './camelCase';
import { sort } from './sort';

export function getServiceNames(services: Service[]): string[] {
    return services.map(service => camelize(service.name)).sort(sort);
}
