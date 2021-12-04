### React and Redux front-end

based: https://github.com/cornflourblue/react-redux-registration-login-example.git


### Installation
`sudo npm install`

### Update config
modify `src/index.jsx`  

delete following code
```
// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
```

### Connect local API
modify `webpack.config.js`

Change apiUrl to `/api`

```
// global app config object
config: JSON.stringify({
    apiUrl: '/api'
})
```

### Build frontend
`sudo npm run build`
