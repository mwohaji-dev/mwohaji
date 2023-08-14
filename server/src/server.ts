import app from './app';
import {PORT} from './configs/env';

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
