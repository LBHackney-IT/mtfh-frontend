import { Route, Switch } from "react-router-dom";

import { <%= projectNamePascal %>View } from './views/<%= projectName %>-view';

export default function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/<%= projectName %>">
        <<%= projectNamePascal %>View />
      </Route>
    </Switch>
  );
}
