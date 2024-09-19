import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { get } from 'aws-amplify/api';

function App() {
  async function getItem() {
    try {
      const restOperation = get({ 
        apiName: 'myRestApi',
        path: 'items' 
      });
      const response = await restOperation.response;
      console.log('GET call succeeded: ', response);
    } catch (error: any) {
      console.log('GET call failed: ', JSON.parse(error.response.body));
    }
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <h1>My Smarthome</h1>
          <button onClick={signOut}>Sign out</button>
          <button onClick={getItem}>Publish</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
