import * as Handlebars from 'handlebars/runtime';

export function registerHandlebarHelpers(): void {
    Handlebars.registerHelper('equals', function (a: string, b: string, options: Handlebars.HelperOptions): string {
        // @ts-ignore
        return a === b ? options.fn(this) : options.inverse(this);
    });
    Handlebars.registerHelper('notEquals', function (a: string, b: string, options: Handlebars.HelperOptions): string {
        // @ts-ignore
        return a !== b ? options.fn(this) : options.inverse(this);
    });
    Handlebars.registerHelper('hasType', function (a: string, options: Handlebars.HelperOptions): string {
        // @ts-ignore
        return a.startsWith('type ') ? options.fn(this) : options.inverse(this);
    });
    Handlebars.registerHelper('trimType', function (passedString: string) {
        // @ts-ignore
        return new Handlebars.SafeString(passedString.substring(5));
    });
}
