import config from '../config/environment';
import Features from 'ember-feature-flags/features';
import { deprecate, isNone } from '@ember/debug';

const MainFeatures = Features.extend({
  init: function () {
    this._super.apply(this, arguments);

    if (this.application && !isNone(this.application.FEATURES)) {
      deprecate('[ember-feature-flags] Setting feature flags via `APP.FEATURES` is deprecated and will be removed.');
      this.setup(this.application.FEATURES);
    } else if (config.featureFlags) {
      this.setup(config.featureFlags);
    }
  },
});

export function initialize(appInstance) {
  const serviceName = config.featureFlagsService || 'features';

  appInstance.register('features:-main', MainFeatures);
  appInstance.inject('route', serviceName, 'features:-main');
  appInstance.inject('controller', serviceName, 'features:-main');
  appInstance.inject('component', serviceName, 'features:-main');
  appInstance.inject('features:-main', 'application', 'application:main');
}

export default {
  initialize,
};
