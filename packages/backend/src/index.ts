import { createBackend } from '@backstage/backend-defaults';
import { graphqlPlugin } from '@frontside/backstage-plugin-graphql-backend';
import { graphqlCatalogExtensionsModule } from './modules/graphqlCatalogExtensions';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-unprocessed'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(import('@backstage/plugin-devtools-backend'));
backend.add(import('@backstage/plugin-entity-feedback-backend'));
backend.add(import('@backstage/plugin-linguist-backend'));
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);
backend.add(import('@backstage/plugin-permission-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));
backend.add(import('@backstage/plugin-search-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));
backend.add(graphqlPlugin());
backend.add(graphqlCatalogExtensionsModule());

backend.start();
