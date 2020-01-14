export const sepcBaseUrl = 'https://openapi.wazo.community';

export const getModuleSpecPrefix = module => module.coporate ? 'nestbox' : 'wazo-platform';

export const getModuleSpecUrl = module => `${sepcBaseUrl}/${getModuleSpecPrefix(module)}/${module.repository}.yml`;
