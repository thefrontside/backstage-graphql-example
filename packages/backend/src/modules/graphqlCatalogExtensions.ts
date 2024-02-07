import { resolvePackagePath } from '@backstage/backend-common';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { Catalog, createCatalogLoader } from '@frontside/backstage-plugin-graphql-backend-module-catalog';
import {
  graphqlContextExtensionPoint,
  graphqlLoadersExtensionPoint,
  graphqlModulesExtensionPoint,
} from '@frontside/backstage-plugin-graphql-backend-node';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';

import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';

const catalogExtensions = createModule({
  id: 'graphqlCatalogExtensions',
  dirname: resolvePackagePath('backend', 'src/modules'),
  typeDefs: loadFilesSync(
    resolvePackagePath('backend', 'src/modules/catalogExtensions.graphql'),
  ),
});

export const graphqlCatalogExtensionsModule = createBackendModule({
  pluginId: 'graphql',
  moduleId: 'graphqlCatalogExtensions',
  register(env) {
    env.registerInit({
      deps: {
        modules: graphqlModulesExtensionPoint,
        loaders: graphqlLoadersExtensionPoint,
        context: graphqlContextExtensionPoint,
        catalog: catalogServiceRef,
      },
      async init({ modules, loaders, context, catalog }) {
        modules.addModules([Catalog, catalogExtensions]);
        loaders.addLoaders(createCatalogLoader(catalog));
        context.setContext(ctx => ({ ...ctx, catalog }));
      },
    });
  },
});
