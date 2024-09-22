import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { get } from 'aws-amplify/api';
import { downloadData, list } from 'aws-amplify/storage';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { useState } from "react";

const DefaultStorageImageExample = () => {
  return ;
};

function App() {
  const [snapshotLists, setSnapshotLists] = useState<string[]>([])

  const downloadSnapshot = async () => {
    try {
      const result = await downloadData({
        path: "snapshots/snapshot_1726325446.jpg",
      }).result;

      console.log('result', result)
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  const listSnapshots = async () => {
    try {
      const result = await list({
        path: 'snapshots/',
      });

      console.log('result', result)
      setSnapshotLists(result.items.map((item =>  item.path)).slice(1))
    } catch (error) {
      
    }
  }
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
    <Authenticator hideSignUp={true}>
      {({ signOut }) => (
        <main>
          <h1>My Smarthome</h1>
          <button onClick={getItem}>Publish</button>
          <button onClick={downloadSnapshot}>download</button>
          <button onClick={listSnapshots}>list snapshots</button>
          <button onClick={signOut}>Sign out</button>
          {snapshotLists.map(path =><StorageImage alt="snapshot" path={path}/>)}
          
        </main>
      )}
    </Authenticator>
  );
}

export default App;
