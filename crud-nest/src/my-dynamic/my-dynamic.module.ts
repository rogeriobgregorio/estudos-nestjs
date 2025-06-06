import { DynamicModule, Module } from '@nestjs/common';

export type MyDynamicModuleConfigs = {
  apiKey: string;
  apiUrl: string;
};

export const MY_DYNAMIC_MODULE_OPTIONS = 'MY_DYNAMIC_MODULE_OPTIONS';

@Module({})
export class MyDynamicModule {
  static register(
    myDynamicModuleConfigs: MyDynamicModuleConfigs,
  ): DynamicModule {
    return {
      module: MyDynamicModule,
      imports: [],
      controllers: [],
      providers: [
        {
          provide: MY_DYNAMIC_MODULE_OPTIONS,
          useValue: myDynamicModuleConfigs,
        },
      ],
      exports: [],
    };
  }
}
