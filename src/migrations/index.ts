import * as migration_20260106_184630 from './20260106_184630';
import * as migration_20260107_045216 from './20260107_045216';

export const migrations = [
  {
    up: migration_20260106_184630.up,
    down: migration_20260106_184630.down,
    name: '20260106_184630',
  },
  {
    up: migration_20260107_045216.up,
    down: migration_20260107_045216.down,
    name: '20260107_045216'
  },
];
