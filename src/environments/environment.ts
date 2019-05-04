// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: 'AIzaSyAdDx5ENsy8n1e32EQW__HG6oK-G_6wgTA',
      authDomain: 'wordexpert-1.firebaseapp.com',
      databaseURL: 'https://wordexpert-1.firebaseio.com',
      projectId: 'wordexpert-1',
      storageBucket: 'wordexpert-1.appspot.com',
      messagingSenderId: '55201365314',
      appId: '1:55201365314:web:b8ec34264862d150'
    }
};
