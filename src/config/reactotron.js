import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

if (process.env.NODE_ENV === 'developement') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .connect();
  console.tron = tron;
}
