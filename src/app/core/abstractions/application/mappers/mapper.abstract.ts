import { classes } from '@automapper/classes';
import { Mapper as AutoMapper, CamelCaseNamingConvention, createMapper } from '@automapper/core';

export abstract class Mapper<I, O> {
  protected static readonly INTERNAL_MAPPER: AutoMapper = createMapper({
    strategyInitializer: classes(),
    namingConventions: new CamelCaseNamingConvention(),
  });

  public abstract map(input: I): O;
}
