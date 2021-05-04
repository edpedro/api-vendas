import handlebars from 'handlebars';
import fs from 'fs';

interface ItemplateVariable {
  [key: string]: string | number;
}

interface IparseMailTemplate {
  file: string;
  variables: ItemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({ file, variables }: IparseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
