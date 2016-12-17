reminder.config(function ($sceDelegateProvider, $locationProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self'
  ]);
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
    rewriteLinks: false
  });
});
