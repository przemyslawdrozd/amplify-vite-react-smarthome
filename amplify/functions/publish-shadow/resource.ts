import { defineFunction } from '@aws-amplify/backend';

export const publishShadow = defineFunction({
  name: 'publish-shadow',
  entry: './handler.ts'
});