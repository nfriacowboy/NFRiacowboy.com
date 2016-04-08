'use strict';

angular.module('NFRiaCowboy.version', [
  'NFRiaCowboy.version.interpolate-filter',
  'NFRiaCowboy.version.version-directive'
])

.value('version', '0.1');
