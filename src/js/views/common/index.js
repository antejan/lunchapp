// Behaviors
import './behaviors';

// Helpers
let helpersRequire = require.context('./helpers', true);
helpersRequire.keys().forEach(helpersRequire);
